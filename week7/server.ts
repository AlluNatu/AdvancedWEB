import express, {Express} from "express"
import path from "path"
import morgan from "morgan"
import router from "./src/routing/index"
import dotenv from "dotenv"


dotenv.config()

const app: Express = express()
const port:number = parseInt(process.env.PORT as string) || 3000

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use("/", router)
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})