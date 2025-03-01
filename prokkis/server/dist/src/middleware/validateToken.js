"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidateToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token not found.", error: true });
    }
    else {
        // console.log("HERE");
        try {
            const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            req.user = verified;
            // console.log(verified);
            // console.log("Verified user:", verified)
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ message: "Access denied, missing token", error: true });
        }
    }
};
exports.validateToken = validateToken;
const adminValidateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token not found." });
    }
    else {
        try {
            const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            if (verified.isAdmin == false) {
                res.status(403).json({ message: "Access denied." });
            }
            else {
                req.user = verified;
                next();
            }
        }
        catch (error) {
            res.status(401).json({ message: "Missing token" });
        }
    }
};
exports.adminValidateToken = adminValidateToken;
