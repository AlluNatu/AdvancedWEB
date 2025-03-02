"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../models/notes");
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inputValidation_1 = require("../validators/inputValidation");
const dotenv_1 = __importDefault(require("dotenv"));
const validateToken_1 = require("../middleware/validateToken");
const columns_1 = require("../models/columns");
const mulder_config_1 = __importDefault(require("./mulder-config"));
const images_1 = require("../models/images");
dotenv_1.default.config();
const router = (0, express_1.Router)();
// Gets data from frontend. Then finds the right user and notes
// Then pushes data to the notes comment array and to database and sends res200 to frontend
router.post('/api/addComment', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        let newComment = {
            text: req.body.comment,
            createdat: new Date()
        };
        if (!user) {
            return res.status(401).json({ message: 'Access denied.' });
        }
        else {
            if (foundUser) {
                const updatedNote = await notes_1.Notes.findByIdAndUpdate(req.body.id, { $push: { comments: newComment } }, { new: true });
                return res.status(200).json({
                    message: 'Note status updated successfully',
                });
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        }
    }
    catch (error) {
        console.error('Error updating Note status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Gets data from frontend. Then finds the right user, column and notess
// Updates the name of found column and then the statuses of all notes  under the given column
// Then pushes data to database and sends res200 to frontend
router.put('/api/changeName', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        if (!user) {
            return res.status(401).json({ message: 'Access denied.' });
        }
        else {
            if (foundUser) {
                await columns_1.Columns.updateOne({ _id: req.body.id, userid: user._id }, { $set: { name: req.body.name } });
                await notes_1.Notes.updateMany({ status: req.body.status, userID: user._id }, { $set: { status: req.body.name } });
                return res.status(200).json({
                    message: 'Note status updated successfully',
                });
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        }
    }
    catch (error) {
        console.error('Error updating Note status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Gets data from frontend. Then finds the right user, old position, oldstatus and all notes.
// Updates the status of the right note and puts it at the last position under the given column
// Then pushes all of the old columns notes up by one position so they are not in the wrong places after update
// Then pushes data to database and sends res200 to frontend
router.put('/api/updateNoteStatus', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        const noteForOldStatus = await notes_1.Notes.findOne({ _id: req.body.id });
        const oldPosition = noteForOldStatus?.position;
        const oldStatus = noteForOldStatus?.status;
        const foundNotes = await notes_1.Notes.find({ userID: user._id, status: req.body.status });
        if (!user) {
            return res.status(401).json({ message: 'Access denied.' });
        }
        else {
            if (foundUser) {
                await notes_1.Notes.updateOne({ _id: req.body.id }, { $set: { status: req.body.status, position: foundNotes.length } });
                const notesWithNewStatus = await notes_1.Notes.find({ status: req.body.status, userID: user._id });
                await notes_1.Notes.updateMany({ status: oldStatus, userID: user._id, position: { $gte: oldPosition } }, { $inc: { position: -1 } });
                return res.status(200).json({
                    message: 'Note status updated successfully',
                    notesCount: notesWithNewStatus.length
                });
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        }
    }
    catch (error) {
        console.error('Error updating Note status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Gets data from frontend.
// Checks if there is account on the same email already
// If yes then status 403 if not then makes hash of password
// Then takes the photo from frontend and gives it a filename and path
// Then pushes data to database and sends res200 to frontend
router.post("/api/register", mulder_config_1.default.single("image"), inputValidation_1.regValitor, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        console.log("Received body:", req.body);
        console.log("Received file:", req.file);
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
                console.log(req.file);
                if (!req.file) {
                    let newUser = new User_1.users({
                        email: req.body.email,
                        password: hash,
                        imageId: null
                    });
                    await newUser.save();
                    res.status(200).json(newUser);
                    console.log(newUser);
                }
                if (req.file) {
                    const imgPath = req.file.path.replace("public/", "");
                    const image = new images_1.images({
                        filename: req.file.filename,
                        path: imgPath
                    });
                    await image.save();
                    let newUser = new User_1.users({
                        email: req.body.email,
                        password: hash,
                        imageId: image._id
                    });
                    await newUser.save();
                }
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
// Gets data from frontend
// Then checks if email is the same
// If not do not continue and sends 401
// If yes then check if hash is good
// If yes then send token to frontend
// If no then error
router.post("/api/login", inputValidation_1.logValidator, async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            let email = req.body.email;
            const foundUser = await User_1.users.findOne({ email: email });
            if (foundUser) {
                if (bcrypt_1.default.compareSync(req.body.password, foundUser.password)) {
                    const JwtPayload = {
                        _id: foundUser._id,
                        isAdmin: foundUser.isAdmin
                    };
                    const token = jsonwebtoken_1.default.sign(JwtPayload, process.env.SECRET, { expiresIn: "30m" });
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
// Data from frontend
// Finds correct user and notes for user
// Then makes new note and pushesh it to database
// Then sends res200 and the new note to frontend
router.post('/api/addNote', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        console.log(req.body.status);
        const foundNotes = await notes_1.Notes.find({ status: req.body.status, userID: user._id });
        //console.log(foundNotes);
        //console.log(foundNotes.length);
        //console.log(foundUser);
        console.log("here come stuff");
        if (!user) {
            res.status(401).json({ message: 'Access denied.' });
            console.log("HERE PROBLEM");
        }
        else {
            if (foundUser) {
                const newNote = new notes_1.Notes({
                    title: req.body.title,
                    content: req.body.content,
                    createdat: Date.now(),
                    userID: user._id,
                    status: req.body.status,
                    position: foundNotes.length
                });
                await newNote.save();
                res.status(200).json({ message: "Topic added", sendNote: newNote });
            }
        }
    }
    catch (error) {
        console.error('Error creating Note:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
// Same as addnote but column
router.post('/api/addColumn', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        console.log(foundUser);
        console.log("here come stuff");
        if (!user) {
            res.status(401).json({ message: 'Access denied.' });
            console.log("HERE PROBLEM");
        }
        else {
            if (foundUser) {
                const newColumn = new columns_1.Columns({
                    name: req.body.name,
                    userid: user._id
                });
                await newColumn.save();
                res.status(200).json({ message: "Column added", sendColumn: newColumn });
            }
        }
    }
    catch (error) {
        console.error('Error creating Note:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
// Gets all notes and columns for user
// Then sends them to frontend
router.get("/api/getNotesandColumns", validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        let columnsList = await columns_1.Columns.find({ userid: user });
        let notesList = await notes_1.Notes.find({ userID: user }).sort({ position: 1 });
        console.log("Offer list length:", columnsList.length);
        res.json({ columnsList, notesList });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
});
// This is called on the header
// It calls for image that is on the user
// If it finds an image for the correct user that is in the database it sends it the correct path where it is saved
router.get("/api/getImage", validateToken_1.validateToken, async (req, res) => {
    try {
        console.log("CALLED");
        const user = req.user;
        if (user) {
            console.log("work");
            const foundUser = await User_1.users.findOne({ _id: user._id });
            if (foundUser) {
                let imageID = foundUser?.imageId;
                if (imageID) {
                    let image = await images_1.images.findOne({ _id: imageID });
                    if (image) {
                        res.status(200).json({ imagePath: `../public/images/${image.filename}` });
                    }
                }
                else {
                    res.status(500).json({ message: "Error" });
                }
            }
            else {
                res.status(500).json({ message: "Error" });
            }
        }
    }
    catch (err) {
        console.log("CALLED");
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
});
// Gets all notes
router.get("/api/getNotes", validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        let notesList = await notes_1.Notes.find({ userID: user }).sort({ position: 1 });
        console.log("Offer list length:", notesList.length);
        res.json(notesList);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
});
// Deletes note
// Gets id of note to delete and then deletes
// Sends message if deletet or if error
router.delete('/api/noteDelete', async (req, res) => {
    try {
        console.log(req.body.id);
        let existingTopic = await notes_1.Notes.deleteOne({ _id: req.body.id });
        res.status(200).json({ message: "Topic deleted successfully." });
    }
    catch (error) {
        res.status(200).json({ message: "Error deleting topic" });
    }
});
// Same as noteDelete but columns
router.delete('/api/deleteColumn', validateToken_1.validateToken, async (req, res) => {
    try {
        console.log(req.body.id);
        const user = req.user;
        let existingNotes = await notes_1.Notes.deleteMany({ status: req.body.status, userID: user._id });
        let existingTopic = await columns_1.Columns.deleteOne({ _id: req.body.id });
        res.status(200).json({ message: "Column and notes deleted successfully." });
    }
    catch (error) {
        res.status(200).json({ message: "Error deleting topic" });
    }
});
// This updates the id of note that is pressed also the new position and old position
// Then finds the note to switch place by its position and status and the one that is pressed by its id
// Sets the positions of each other to each other so they switch places
// Saves data to database
router.put('/api/updateNotePositionUp', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        //console.log(foundUser);
        console.log("here come stuff");
        if (!user) {
            res.status(401).json({ message: 'Access denied.' });
            console.log("HERE PROBLEM");
        }
        else {
            if (foundUser) {
                let noteUp = await notes_1.Notes.updateOne({ status: req.body.updatedItems[0].status, position: req.body.position }, { $set: { position: req.body.positionLast } });
                let existingNote = await notes_1.Notes.updateOne({ _id: req.body.id }, { $set: { position: req.body.position } });
            }
        }
    }
    catch (error) {
        console.error('Error creating Note:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
// Same as the one on top of this but in frontend stuff is the otherway around
router.put('/api/updateNotePositionDown', validateToken_1.validateToken, async (req, res) => {
    try {
        const user = req.user;
        const foundUser = await User_1.users.findOne({ _id: user._id });
        //console.log(foundUser);
        console.log("here come stuff");
        if (!user) {
            res.status(401).json({ message: 'Access denied.' });
            console.log("HERE PROBLEM");
        }
        else {
            if (foundUser) {
                let noteUp = await notes_1.Notes.updateOne({ status: req.body.updatedItems[0].status, position: req.body.position }, { $set: { position: req.body.positionLast } });
                let existingNote = await notes_1.Notes.updateOne({ _id: req.body.id }, { $set: { position: req.body.position } });
            }
        }
    }
    catch (error) {
        console.error('Error creating Note:', error);
        res.status(400).json({ error: 'Internal server error' });
    }
});
// This is only for cypress tests
// This clears the whole database all the way
router.post("/api/clearDatabase", async (req, res) => {
    try {
        await User_1.users.deleteMany({});
        await columns_1.Columns.deleteMany({});
        await notes_1.Notes.deleteMany({});
        res.status(200).json({ success: true, message: "Database cleared!" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to clear database" });
    }
});
exports.default = router;
