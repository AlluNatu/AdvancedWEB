import { Request, Response, Router } from 'express'
import { body, Result, ValidationError, validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
//import { validateToken } from '../middleware/validateToken'
import fs from 'fs'
import { access, constants } from 'node:fs'
import { readFile, writeFile } from 'fs/promises'
import { validateToken } from '../middleware/validateToken'


type TUser = {
    email:string,
    password:string
}

let users: TUser[] = []
const file = 'data.json'

async function readData() {
    try {
        const data = await readFile(file, 'utf-8')
        if (data.trim() === "") {
            users = []
        } else {
            users = JSON.parse(data)
        }
    } catch (error) {
        console.error("Error reading file:", error)
    }
}

async function writerFunction() {
    await writeFile(file, JSON.stringify(users))
}

fs.access(file, constants.F_OK, (err) => {
    if (err) {
      console.log(`${file} does not exist creating ${file}`)
      fs.writeFile(file, '', () => {
          console.log(`${file} created successfully.`)
      })
    } else {
      console.log(`${file} exists.`);
      readData()
    }
  })  

const router: Router = Router()

router.post("/api/user/register", 
    body("email").trim().isLength({ min: 1 }).escape(),
    body("password").isLength({ min: 1 }),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors)
            res.status(400).json({errors: errors.array()})
        }
            try {

                const existingUser: TUser | undefined = users.find(user => user.email === req.body.email)
                console.log(existingUser)
                if (existingUser) {
                    res.status(403).json({ username: "username already in use"})
                } else {
                    const salt: string = bcrypt.genSaltSync(10)
                const hash: string = bcrypt.hashSync(req.body.password, salt)
                
                let newUser: TUser = {
                    email: req.body.email,
                    password: hash
                }
    
                users.push(newUser)
    
                await writerFunction()
    
                res.status(200).json({email: newUser.email, password: newUser.password})
    
            } 
        } catch (error: any) {
            console.error(`Error during registeration: ${error}`)
            res.status(500).json({error : "Internal server error"})
        }
    }
)

router.get("/api/user/list", (req: Request, res:Response) => {
    try {

        res.status(200).json(users)
    } catch (error:any) {
        console.log(`Error while fetching users ${error}`);
        
        res.status(500).json({error: "Internal server error"})
    }
})

router.post("/api/user/login",
    body("email").trim().escape(),
    body("password").escape(),
    async (req: Request, res: Response) => {
        try {

            const existingUser: TUser | undefined = users.find(user => user.email === req.body.email)
            if (!existingUser) {
                res.status(401).json({ message: "Login failed"})
            } else { 
                if (bcrypt.compareSync(req.body.password, existingUser.password)){
                    const JwtPayload: JwtPayload = {
                        email: existingUser.email
                    }
                    const token: string = jwt.sign(JwtPayload, process.env.SECRET as string, {expiresIn: "2m"})
                    res.status(200).json({success: true, token})
                } else {
                    res.status(401).json({message: "Login failed"})
                }
            }

        } catch (error: any) {
            console.error(`Error during registeration: ${error}`)
            res.status(500).json({error : "Internal server error"})
        }

})

router.get("/api/private", validateToken, (req:Request, res:Response) => {
    try {
        res.status(200).json({ message: "This is protected secure route!" });
    } catch (error: any) {
        console.log(`Error while fecthing users ${error}`)
        res.status(401).json({error: "Internal Server Error"})
    }
})





export default router