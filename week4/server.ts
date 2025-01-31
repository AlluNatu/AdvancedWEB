import express, {Express} from "express"
import path from "path"
import router from "./src/index"

const app: Express = express()
const port:number = 3000

app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())
app.use("/", router)

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})