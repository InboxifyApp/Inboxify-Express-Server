import * as Services from './../../services/messages.services'
import * as EXPRESS from 'express'
import * as cls from '../../services/cluster.services'
import  JWT  from 'jsonwebtoken'

const getMessages : EXPRESS.RequestHandler = async ( req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const token = req.headers.authorization
    if (!token) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const decoded : any = JWT.verify(token, String(process.env.JWT_SECRET))
    if (!decoded) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const clusterId : any = req.body.cluster
    if (!clusterId) {
        res.status(400).send("You must provide a cluster !")
        return
    }
    const cluster : any = await cls.getClus(clusterId)


    if (!cluster) {
        res.status(404).send(`No cluster found with ID : ${clusterId} !`)
        return
    }

    const messages = await Services.GetAll(cluster)
    if (messages.length > 0) {
        res.status(200).send(messages)
        return
    } 
    res.status(404).send(`No messages found in cluster ID : ${cluster} !`)


}

export default getMessages