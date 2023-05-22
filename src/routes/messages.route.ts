import {Router } from 'express'
import saveMSG from '../controllers/Messages/saveMessage.controller'
import getMessages from '../controllers/Messages/getMessages.controller'

const msgRouter = Router()
msgRouter.post("/", saveMSG)
msgRouter.get("/", getMessages)


export default msgRouter