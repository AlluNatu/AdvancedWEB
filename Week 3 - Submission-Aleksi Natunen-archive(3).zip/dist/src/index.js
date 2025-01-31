"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [];
router.post('/users', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    console.log(req.body);
    let newGuy = { name: name, email: email };
    users.push(newGuy);
    res.status(200).json({ message: 'User successfully added' });
});
router.get('/hello', (req, res) => {
    res.json({ msg: 'Hello world!' });
});
router.get('/echo/:id/', (req, res) => {
    let id = req.params.id;
    res.json({ id });
});
router.post('/sum', (req, res) => {
    let numbers = req.body.numbers;
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }
    res.json({ sum });
});
router.get('/users', (req, res) => {
    res.status(201).json({ users });
});
exports.default = router;
