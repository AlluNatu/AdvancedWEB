import {Router, Request, Response} from "express"

const router: Router = Router()

type TUser = {
    name:string,
    email:string
}

let users:TUser[] = []

router.post('/users', (req:Request, res:Response) => {
    let name:string = req.body.name
    let email:string = req.body.email
    console.log(req.body)

    let newGuy: TUser = {name: name, email: email}
    users.push(newGuy)

    res.status(200).json({ message: 'User successfully added' })
})

router.get('/hello', (req:Request, res:Response) => {
    res.json({msg: 'Hello world!'})
  })

  router.get('/echo/:id/', (req:Request, res:Response) => {
    let id = req.params.id;
    res.json({ id })
  })

  router.post('/sum', (req:Request, res:Response) => {
    let numbers  = req.body.numbers
    let sum:number = 0
    for (let i = 0; i < numbers.length; i++){
        sum = sum + numbers[i]
    }
    res.json({ sum })
  })

  router.get('/users', (req:Request, res:Response) => {
    res.status(201).json({users});
});

export default router
