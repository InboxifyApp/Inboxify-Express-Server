import * as  EXPRESS from 'express'
import * as Services from './../../services/cluster.services'
import date from 'date-and-time'
import Cluster from '../../models/Cluster.entity'
import JWT from 'jsonwebtoken'
const makeCluster : EXPRESS.RequestHandler = async(req, res)=>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    

    const datas : any = req.body
    if (!datas) {
        res.status(400).send("Missing some datas ! ")
    }

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
    const owner : any = decoded.id

    const now : any = date.format(new Date,'YYYY-MM-DD HH:mm:ss')
    const cluster = new Cluster
    cluster.color = datas.color
    cluster.created_at = now 
    cluster.updated_at = now 
    cluster.description = datas.description 
    cluster.domain = datas.domain
    cluster.owner = owner
    cluster.name = datas.name

    Services.saveCluster(cluster).then(resp=>{
        res.status(200).send("Cluster is created successfully ! ")
    }).catch(e =>{
        console.log(e)
        res.status(500).send("Internal Error ! please contact me ! ")
    })

} 


export default makeCluster