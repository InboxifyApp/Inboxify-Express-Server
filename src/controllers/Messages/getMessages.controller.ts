import * as Services from './../../services/messages.services'
import * as EXPRESS from 'express'
import * as cls from '../../services/cluster.services'
import  JWT  from 'jsonwebtoken'
import * as usr from './../../services/user.services'
const getMessages : EXPRESS.RequestHandler = async ( req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route 1!")
        return
    }
    const token :any = req.headers.authorization
    if (!token) {
        res.status(401).send("You're not allowed to access this route2 !")
        return
    }
    const [b, toke] = token.split(" ")
    const decoded : any = JWT.verify(toke, String(process.env.JWT_SECRET))
    if (!decoded) {
        res.status(401).send("You're not allowed to access this route 3!")
        return
    }
    const clusterId : any = req.body.cluster
    if (!clusterId) {
        res.status(400).send("You must provide a cluster !")
        return
    }

    const user: any= await usr.GetOneBy("id", decoded.id) 
    if (!user) {
        res.status(401).send("You're not allowed to access this route 4!")
        return
    }
    console.log(user)


    const cluster : any = await cls.getClus(user)


    if (cluster.length === 0 || !cluster ) {
        res.status(404).send(`No cluster found with ID : ${clusterId} !`)
        return
    }
    console.log(cluster)
    const messages = await Services.GetAll(cluster)
    if (messages.length > 0) {
        res.status(200).send(messages)
        return
    } 
    res.status(404).send(`No messages found in cluster ID : ${cluster} !`)


}

export default getMessages