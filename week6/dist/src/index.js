"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("./models/Offer");
const Image_1 = require("./models/Image");
const mulder_config_1 = __importDefault(require("./mulder-config"));
const router = (0, express_1.Router)();
router.post("/upload", mulder_config_1.default.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            let offer = new Offer_1.offers({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                imageId: null
            });
            await offer.save();
        }
        else {
            const imgPath = req.file.path.replace("public/", "");
            const image = new Image_1.images({
                filename: req.file.filename,
                path: imgPath
            });
            await image.save();
            let offer = new Offer_1.offers({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                imageId: image._id
            });
            await offer.save();
        }
        console.log("File uploaded and saved in the database");
        res.status(201).json({ message: "File uploaded and saved in the database" });
        return;
    }
    catch (error) {
        console.error(`Error while uploading file: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
router.get("/offers", async (req, res, next) => {
    let returnOffers = [];
    try {
        let offerList = await Offer_1.offers.find();
        console.log("Offer list length:", offerList.length);
        const imageList = await Image_1.images.find();
        for (let offerModule of offerList) {
            const imageFound = await Image_1.images.findById(offerModule.imageId);
            let newOffer = {
                title: offerModule.title,
                description: offerModule.description,
                price: offerModule.price,
                imagePath: imageFound ? imageFound.path : null
            };
            offerModule.save();
            returnOffers.push(newOffer);
        }
        console.log(returnOffers);
        res.json(returnOffers);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
exports.default = router;
