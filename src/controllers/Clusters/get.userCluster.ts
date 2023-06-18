import * as Services from './../../services/cluster.services'
import * as EXPRESS from 'express'
import * as userServ from './../../services/user.services'
import JWT from 'jsonwebtoken'

const getLimitedClusters : EXPRESS.RequestHandler = async (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    
    const id : any = req.query.id 
    Services.getLimited(id).then((data : any) =>{
        if (data) {
            res.status(200).send(data)
            return
        }
        res.status(404).send("There's 0 clusters so far ")
    }
    ).catch((err : any) =>{
        console.log(err)
        res.status(500).send("Internal server error")
    })

}

export default getLimitedClusters