import {Router } from 'express'
import saveMSG from '../controllers/Messages/saveMessage.controller'
import getMessages from '../controllers/Messages/getMessages.controller'
import GetAllMsg from '../controllers/Messages/getall.controller'
const msgRouter = Router()
msgRouter.post("/", saveMSG)
msgRouter.get("/", getMessages)
msgRouter.get("/all" , GetAllMsg)

export default msgRouter