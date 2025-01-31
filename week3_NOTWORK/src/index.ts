import {Router} from "express"

const router: Router = Router()

type TUser = {
    name:string,
    email:string
}

let users:TUser[] = []

router.post('/users', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const newGuy: TUser = {name, email}
    users.push(newGuy)

    res.json({ message: 'User successfully added' });
})

router.get('/hello', (req, res) => {
    res.json({msg: 'Hello world!'})
  })

  router.get('/echo/:id/', (req, res) => {
    let id = req.params.id;
    res.json({ id })
  })

  router.post('/sum', (req, res) => {
    let numbers  = req.body.numbers
    let sum:number = 0
    for (let i = 0; i < numbers.length; i++){
        sum = sum + numbers[i]
    }
    res.json({ sum })
  })

  router.get('/users', (req, res) => {
    res.status(201).json({ users });
});

export default router