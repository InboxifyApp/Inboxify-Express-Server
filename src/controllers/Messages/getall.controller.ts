import * as ClusterServ from './../../services/cluster.services'
import { RequestHandler } from 'express'
import JWT from 'jsonwebtoken'

const GetAllMsg:RequestHandler = async (req, res) =>{
    




    //get the user id 
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    //suppoosing im gettting a token
    const key : any = req.headers.authorization
    if (!key || key.split(" ").length != 2) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const [bearer, token] = key.split(" ")
    const decoded : any = JWT.verify(token, String(process.env.JWT_SECRET))
    if (!decoded) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    //id is in decoded.id
    
    //get all clusters 
    const cluters : any = ClusterServ.getClus(decoded.id)
    console.log(cluters)
}


export default GetAllMsg