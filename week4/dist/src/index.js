"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const node_fs_1 = require("node:fs");
const promises_1 = require("fs/promises");
const router = (0, express_1.Router)();
let users = [];
const file = 'data.json';
fs_1.default.access(file, node_fs_1.constants.F_OK, (err) => {
    if (err) {
        console.log(`${file} does not exist creating ${file}`);
        fs_1.default.writeFile(file, '', () => {
            console.log(`${file} created successfully.`);
        });
    }
    else {
        console.log(`${file} exists.`);
        readData();
    }
});
async function readData() {
    try {
        const data = await (0, promises_1.readFile)(file, 'utf-8');
        if (data.trim() === "") {
            users = [];
        }
        else {
            users = JSON.parse(data);
        }
    }
    catch (error) {
        console.error("Error reading file:", error);
    }
}
async function writerFunction() {
    await (0, promises_1.writeFile)(file, JSON.stringify(users));
}
router.post('/add', (req, res) => {
    let name = req.body.name;
    let todos = req.body.todos;
    let newGuy = { name: name, todos: [todos] };
    let foundUser = users.find(user => user.name === name);
    if (foundUser) {
        foundUser.todos.push(todos);
    }
    else {
        users.push(newGuy);
    }
    res.status(200).json({ message: `Todo added successfully for user ${name}.` });
    writerFunction();
});
router.get('/todos/:id', (req, res) => {
    readData();
    let id = req.params.id;
    let foundUser = users.find(user => user.name === id);
    if (foundUser) {
        res.status(201).json({ todos: foundUser.todos });
    }
    else {
        res.status(200).json({ message: "User not found" });
    }
});
router.delete('/delete', (req, res) => {
    let name = req.body.name;
    let foundUser = users.findIndex(user => user.name === name);
    if (foundUser !== -1) {
        users.splice(foundUser, 1);
        res.status(201).json({ message: "User deleted successfully." });
    }
    else {
        res.status(200).json({ message: "User not found" });
    }
    writerFunction();
});
router.put("/update", (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    let foundUser = users.find(user => user.name === name);
    if (!foundUser) {
        res.status(200).json({ message: "User not found" });
    }
    else {
        let todoIndex = foundUser.todos.indexOf(todo);
        foundUser.todos.splice(todoIndex, 1);
        res.status(201).json({ message: "Todo deleted successfully." });
    }
    writerFunction();
});
exports.default = router;
