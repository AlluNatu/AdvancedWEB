"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Books_1 = require("../models/Books");
const router = (0, express_1.Router)();
router.post("/api/book", async (req, res) => {
    try {
        let book = new Books_1.Books({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages
        });
        await book.save();
        console.log("Book uploaded and saved in the database");
        res.status(201).json({ message: "ok" });
    }
    catch (error) {
        console.error(`Error while uploading book: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
