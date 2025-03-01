import {Router, Request, Response} from "express"
import {IBook, Books} from "../models/Books"

const router: Router = Router()


router.post("/api/book", async (req: Request, res: Response)=> {
    try {
        let book:IBook = new Books ({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages
        })    
        await book.save()

        console.log("Book uploaded and saved in the database")
        res.status(201).json({ message: "ok" })
        
    } catch (error: any) {
        console.error(`Error while uploading book: ${error}`)
        res.status(500).json({ message: 'Internal server error' })
        
    }
})


export default router

