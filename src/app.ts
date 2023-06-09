import express from "express"
import "dotenv/config"
import { json } from "body-parser"
import appDataSource from "./utils/POSTGRES"
import UserRoute from "./routes/user.route"
import clusterRouter from "./routes/cluster.route"
import msgRouter from "./routes/messages.route"
const cors = require("cors")

const app = express()

app.use(json())
app.use(cors())
const PORT: any = process.env.PORT || 3000
app
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`)

    appDataSource
      .initialize()
      .then((res: any) => {
        console.log("Connected to the database ! ")
        app.use("/me", UserRoute)
        app.use("/cluster" , clusterRouter)
        app.use("/message" , msgRouter)
        //middlewares 
      })
      .catch((e: any) => {
        console.log(e)
      })
  })
  .on("error", (e:any) => {
    console.log("There's an error ! " ,e )
  })
