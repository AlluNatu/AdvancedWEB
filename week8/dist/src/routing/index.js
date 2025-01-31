"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Topic_1 = require("../models/Topic");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputValidation_1 = require("../validators/inputValidation");
const validateToken_1 = require("../middleware/validateToken");
const router = (0, express_1.Router)();
router.post("/api/user/register", inputValidation_1.regValitor, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            let email = req.body.email;
            let foundUser = await User_1.users.findOne({ email: email });
            console.log(foundUser);
            if (foundUser) {
                res.status(403).json({ email: "Email already in use" });
            }
            else {
                const salt = bcrypt_1.default.genSaltSync(10);
                const hash = bcrypt_1.default.hashSync(req.body.password, salt);
                let newUser = new User_1.users({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    isAdmin: req.body.isAdmin
                });
                await newUser.save();
                res.status(200).json(newUser);
            }
        }
        catch (error) {
            console.error(`Error during registeration: ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
    }
});
router.post("/api/user/login", inputValidation_1.logValidator, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            let email = req.body.email;
            const foundUser = await User_1.users.findOne({ email: email });
            if (foundUser) {
                if (bcrypt_1.default.compareSync(req.body.password, foundUser.password)) {
                    const JwtPayload = {
                        _id: foundUser._id,
                        username: foundUser.username,
                        isAdmin: foundUser.isAdmin
                    };
                    const token = jsonwebtoken_1.default.sign(JwtPayload, process.env.SECRET, { expiresIn: "10m" });
                    res.status(200).json({ success: true, token });
                }
                else {
                    res.status(401).json({ message: "Login failed" });
                }
            }
            else {
                res.status(401).json({ message: "Login failed" });
            }
        }
        catch (error) {
            console.error(`Error during registeration: ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
    }
});
router.get("/api/topics", async (req, res) => {
    try {
        let topicList = await Topic_1.topics.find();
        console.log("Offer list length:", topicList.length);
        res.json(topicList);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
});
router.post('/api/topic', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        console.log(foundUser);
        if (!user) {
            res.status(401).json({ message: 'Access denied.' });
            console.log("HERE PROBLEM");
        }
        else {
            if (foundUser) {
                const newTopic = new Topic_1.topics({
                    title: req.body.title,
                    content: req.body.content,
                    username: foundUser.username,
                    createdAt: new Date()
                });
                await newTopic.save();
                res.status(200).json({ message: "Topic added" });
            }
        }
    }
    catch (error) {
        console.error('Error creating topic:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
router.delete('/api/topic/:id', validateToken_1.adminValidateToken, async (req, res) => {
    try {
        let existingTopic = await Topic_1.topics.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Topic deleted successfully." });
    }
    catch (error) {
        res.status(200).json({ message: "Error deleting topic" });
    }
});
exports.default = router;
