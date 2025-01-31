import {Router, Request, Response} from "express"
import fs from 'fs'
import { access, constants } from 'node:fs'
import { readFile, writeFile } from 'fs/promises'
const router: Router = Router()

type TUser = {
    name:string,
    todos:string[]
}

let users: TUser[] = []
const file = 'data.json'

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

router.post('/add', (req:Request, res:Response) => {
    let name:string = req.body.name
    let todos:string = req.body.todos
    let newGuy: TUser = {name: name, todos:[todos]}
    let foundUser = users.find(user => user.name === name)

    if (foundUser) {
        foundUser.todos.push(todos)
    } else {
        users.push(newGuy)
    }

    res.status(200).json({ message: `Todo added successfully for user ${name}.` })
    writerFunction()
})

router.get('/todos/:id', (req:Request, res:Response) => {
    readData()
    let id = req.params.id
    let foundUser = users.find(user => user.name === id)

    if (foundUser) {
        res.status(201).json({todos: foundUser.todos})
    }
    else {
        res.status(200).json({message: "User not found"})
    }
})

router.delete('/delete', (req:Request, res:Response) => {
    let name:string = req.body.name
    
    let foundUser = users.findIndex(user => user.name === name)

    if (foundUser !== -1) {
        users.splice(foundUser, 1)
        res.status(201).json({message: "User deleted successfully."})
    }
    else {
        res.status(200).json({message: "User not found"})
    }
    writerFunction()
})

router.put("/update", (req:Request, res:Response) => {
    let name:string = req.body.name
    let todo:string = req.body.todo
    
    let foundUser = users.find(user => user.name === name)
    
    if (!foundUser) {
        res.status(200).json({message: "User not found"})
    } else {
        let todoIndex = foundUser.todos.indexOf(todo)
        foundUser.todos.splice(todoIndex, 1)
        res.status(201).json({message: "Todo deleted successfully."})
    }
    writerFunction()
})

export default router