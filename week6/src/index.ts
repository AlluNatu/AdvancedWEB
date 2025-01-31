import {Router, Request, Response} from "express"
import { compile } from "morgan"
import {offers, IOffer} from "./models/Offer"
import {images, IImage} from "./models/Image"
import upload from "./mulder-config"

const router: Router = Router()

interface OfferInterface {
    title: string,
    description: string,
    price: number,
    imagePath: string | null
}

router.post("/upload", upload.single("image"), async (req: Request, res: Response)=> {
        try {
            if (!req.file) {
                let offer:IOffer = new offers ({
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    imageId: null
                })
                await offer.save()
            } else {
                const imgPath: string = req.file.path.replace("public/", "")

                const image: IImage = new images({
                    filename: req.file.filename,
                    path: imgPath
                })
                await image.save()

                let offer:IOffer = new offers ({
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    imageId: image._id
                })
                await offer.save()
            }
            console.log("File uploaded and saved in the database")
            res.status(201).json({ message: "File uploaded and saved in the database" })
            return
        } catch (error: any) {
            console.error(`Error while uploading file: ${error}`)
            res.status(500).json({ message: 'Internal server error' })
            return
        }
    })

    router.get("/offers",  async (req: Request, res: Response, next) => {

        let returnOffers: OfferInterface[] = []
        try {
            let offerList: IOffer[] = await offers.find()
            console.log("Offer list length:", offerList.length)
            const imageList: IImage[] | null = await images.find()
            for (let offerModule of offerList) {
                const imageFound: IImage | null = await images.findById(offerModule.imageId)
                let newOffer: OfferInterface = {
                    title: offerModule.title,
                    description: offerModule.description,
                    price: offerModule.price,
                    imagePath: imageFound ? imageFound.path : null
                }
                offerModule.save()
                returnOffers.push(newOffer)
            }
            console.log(returnOffers);
            
            res.json(returnOffers)
          } catch (err) {
            console.error(err)
            res.status(500).send('Server error')
          }
    })

export default router