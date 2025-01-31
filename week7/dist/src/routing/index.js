"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { validateToken } from '../middleware/validateToken'
const fs_1 = __importDefault(require("fs"));
const node_fs_1 = require("node:fs");
const promises_1 = require("fs/promises");
const validateToken_1 = require("../middleware/validateToken");
let users = [];
const file = 'data.json';
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
const router = (0, express_1.Router)();
router.post("/api/user/register", (0, express_validator_1.body)("email").trim().isLength({ min: 1 }).escape(), (0, express_validator_1.body)("password").isLength({ min: 1 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const existingUser = users.find(user => user.email === req.body.email);
        console.log(existingUser);
        if (existingUser) {
            res.status(403).json({ username: "username already in use" });
        }
        else {
            const salt = bcrypt_1.default.genSaltSync(10);
            const hash = bcrypt_1.default.hashSync(req.body.password, salt);
            let newUser = {
                email: req.body.email,
                password: hash
            };
            users.push(newUser);
            await writerFunction();
            res.status(200).json({ email: newUser.email, password: newUser.password });
        }
    }
    catch (error) {
        console.error(`Error during registeration: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/api/user/list", (req, res) => {
    try {
        res.status(200).json(users);
    }
    catch (error) {
        console.log(`Error while fetching users ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/api/user/login", (0, express_validator_1.body)("email").trim().escape(), (0, express_validator_1.body)("password").escape(), async (req, res) => {
    try {
        const existingUser = users.find(user => user.email === req.body.email);
        if (!existingUser) {
            res.status(401).json({ message: "Login failed" });
        }
        else {
            if (bcrypt_1.default.compareSync(req.body.password, existingUser.password)) {
                const JwtPayload = {
                    email: existingUser.email
                };
                const token = jsonwebtoken_1.default.sign(JwtPayload, process.env.SECRET, { expiresIn: "2m" });
                res.status(200).json({ success: true, token });
            }
            else {
                res.status(401).json({ message: "Login failed" });
            }
        }
    }
    catch (error) {
        console.error(`Error during registeration: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/api/private", validateToken_1.validateToken, (req, res) => {
    try {
        res.status(200).json({ message: "This is protected secure route!" });
    }
    catch (error) {
        console.log(`Error while fecthing users ${error}`);
        res.status(401).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
