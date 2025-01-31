import {Router, Request, Response} from "express"
import { compile } from "morgan"
import {users, IUser} from "../models/User"
import {topics, ITopic} from "../models/Topic"
import { body, Result, ValidationError, validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { regValitor, logValidator } from "../validators/inputValidation"
import fs from 'fs'
import { access, constants } from 'node:fs'
import { readFile, writeFile } from 'fs/promises'
import { validateToken, adminValidateToken } from '../middleware/validateToken'
import { emit } from "node:process"
import { log } from "node:console"

const router: Router = Router()

router.post("/api/user/register", regValitor,
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if (errors.isEmpty()) {
            try {
                let email:string = req.body.email
                let foundUser = await users.findOne({ email: email })
                console.log(foundUser);
                
                if (foundUser) {
                    res.status(403).json({email: "Email already in use"})
                } else {
                    const salt: string = bcrypt.genSaltSync(10)
                    const hash: string = bcrypt.hashSync(req.body.password, salt)

                    let newUser:IUser = new users ({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                        isAdmin: req.body.isAdmin
                    })
                    await newUser.save()
                    res.status(200).json(newUser)
                }
                
        } catch (error: any) {
            console.error(`Error during registeration: ${error}`)
            res.status(500).json({error : "Internal server error"})
        }
        } else {
            console.log(errors)
            res.status(400).json({errors: errors.array()})
        }
    }
)

router.post("/api/user/login", logValidator,
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if (errors.isEmpty()) {
        try {
            let email:string = req.body.email
            const foundUser = await users.findOne({ email: email })
            
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    const JwtPayload: JwtPayload = {
                        _id: foundUser._id,
                        username: foundUser.username,
                        isAdmin: foundUser.isAdmin
                    }
                    const token: string = jwt.sign(JwtPayload, process.env.SECRET as string, {expiresIn: "10m"})
                    res.status(200).json({success: true, token})
                } else {
                    res.status(401).json({message: "Login failed"})
                }
            } else { 
                res.status(401).json({ message: "Login failed"})
            }

        } catch (error: any) {
            console.error(`Error during registeration: ${error}`)
            res.status(500).json({error : "Internal server error"})
        }
        } else {
            console.log(errors)
            res.status(400).json({errors: errors.array()})
        }

})


router.get("/api/topics",  async (req: Request, res: Response) => {
        try {
            let topicList: ITopic[] = await topics.find()
            console.log("Offer list length:", topicList.length)
            
            res.json(topicList)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: "Error"})
          }
})

router.post('/api/topic', validateToken, async (req:any, res:any) => {
    try {
        const user = req.user
        const foundUser = await users.findOne({ _id: user._id })
        console.log(foundUser);
        

        if (!user) {
            res.status(401).json({ message: 'Access denied.' })
            console.log("HERE PROBLEM");
            
        } else { 
            if (foundUser){
                const newTopic: ITopic = new topics({
                    title: req.body.title,
                    content: req.body.content,
                    username: foundUser.username,
                    createdAt: new Date()
                })
                await newTopic.save()
                res.status(200).json({message: "Topic added"})
                }

        }
        
    } catch (error) {
        console.error('Error creating topic:', error)
        res.status(400).json({ error: 'Internal server error' })
    }
})

router.delete('/api/topic/:id', adminValidateToken, async (req:Request, res:Response) => {
    try {
        let existingTopic = await topics.deleteOne({_id: req.params.id})
        res.status(200).json({ message: "Topic deleted successfully." })
    } catch (error){
        res.status(200).json({ message: "Error deleting topic" })

    }
})

export default router