import {Router, Request, Response} from "express"
const router: Router = Router()
import { Users, IUser, ITodo } from './models/User'

router.post('/add', async (req:Request, res:Response) => {
    let name:string = req.body.name
    let todos:string = req.body.todos

    let newTodo: ITodo = {
        todo: todos,
        checked: false
    }

    let foundUser = await Users.findOne({name: name})

    
    if (foundUser) {
        foundUser.todos.push(newTodo)
        foundUser.save()
    } else {
        let newUser: IUser = new Users({
            name:name,
            todos:newTodo
        })   
        await newUser.save() 
    }
    
    
    console.log("Database populated");
    

    res.status(200).json({ message: `Todo added successfully for user ${name}.` })
})

router.get('/todos/:id', async (req:Request, res:Response) => {
    let id: string = req.params.id
    let foundUser = await Users.findOne({name: id})

    interface todoCheck {
        todo:String,
        checked:boolean
    }

    let todosList: todoCheck[] = []
    if (foundUser) {
        foundUser.todos.forEach(element => {

            let newTodo: todoCheck = {
                todo: element.todo,
                checked: element.checked
            }

            todosList.push(newTodo)
        });
        res.status(200).json({todos: todosList})
    }
    else {
        res.status(201).json({message: "User not found"})
    }
})

router.delete('/delete', async (req:Request, res:Response) => {
    let name:string = req.body.name
    let foundUser = await Users.findOne({ name: name })

    if (foundUser) {
        await Users.deleteOne({name:name})
        res.status(200).json({message: "User deleted successfully."})
    }
    else {
        res.status(201).json({message: "User not found"})
    }
})

router.put("/update", async (req:Request, res:Response) => {
    let name:string = req.body.name
    let todoString:string = req.body.todo
    
    let foundUser = await Users.findOne({ name: name })
    
    if (!foundUser) {
        res.status(201).json({message: "User not found"})
    } else {
        let i:number = 0
        for (i=0; i < foundUser.todos.length; i++){
            if (foundUser.todos[i].todo == todoString.trim()){
                foundUser.todos.splice(i, 1)
                await foundUser.save()
                break
            }
        }
        
        
        res.status(200).json({message: "Todo deleted successfully."})
    }
})

router.put("/updateTodo", async (req:Request, res:Response) => {
    let name:string = req.body.name
    let todoString:string = req.body.todo
    let checked:boolean = req.body.checked
    

    let foundUser = await Users.findOne({ name: name })
    if (foundUser) {
        foundUser.todos.forEach(element => {
            
            if (element.todo === todoString.trim()){
                
                element.checked = checked
            }
        });
        await foundUser.save()
        
    }
    
    res.status(200).json({message: "Checkbox works!"})
})

export default router