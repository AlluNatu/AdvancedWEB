"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const User_1 = require("./models/User");
router.post('/add', async (req, res) => {
    let name = req.body.name;
    let todos = req.body.todos;
    let newTodo = {
        todo: todos,
        checked: false
    };
    let foundUser = await User_1.Users.findOne({ name: name });
    if (foundUser) {
        foundUser.todos.push(newTodo);
        foundUser.save();
    }
    else {
        let newUser = new User_1.Users({
            name: name,
            todos: newTodo
        });
        await newUser.save();
    }
    console.log("Database populated");
    res.status(200).json({ message: `Todo added successfully for user ${name}.` });
});
router.get('/todos/:id', async (req, res) => {
    let id = req.params.id;
    let foundUser = await User_1.Users.findOne({ name: id });
    let todosList = [];
    if (foundUser) {
        foundUser.todos.forEach(element => {
            let newTodo = {
                todo: element.todo,
                checked: element.checked
            };
            todosList.push(newTodo);
        });
        res.status(200).json({ todos: todosList });
    }
    else {
        res.status(201).json({ message: "User not found" });
    }
});
router.delete('/delete', async (req, res) => {
    let name = req.body.name;
    let foundUser = await User_1.Users.findOne({ name: name });
    if (foundUser) {
        await User_1.Users.deleteOne({ name: name });
        res.status(200).json({ message: "User deleted successfully." });
    }
    else {
        res.status(201).json({ message: "User not found" });
    }
});
router.put("/update", async (req, res) => {
    let name = req.body.name;
    let todoString = req.body.todo;
    let foundUser = await User_1.Users.findOne({ name: name });
    if (!foundUser) {
        res.status(201).json({ message: "User not found" });
    }
    else {
        let i = 0;
        for (i = 0; i < foundUser.todos.length; i++) {
            if (foundUser.todos[i].todo == todoString.trim()) {
                foundUser.todos.splice(i, 1);
                await foundUser.save();
                break;
            }
        }
        res.status(200).json({ message: "Todo deleted successfully." });
    }
});
router.put("/updateTodo", async (req, res) => {
    let name = req.body.name;
    let todoString = req.body.todo;
    let checked = req.body.checked;
    let foundUser = await User_1.Users.findOne({ name: name });
    if (foundUser) {
        foundUser.todos.forEach(element => {
            if (element.todo === todoString.trim()) {
                element.checked = checked;
            }
        });
        await foundUser.save();
    }
    res.status(200).json({ message: "Checkbox works!" });
});
exports.default = router;
