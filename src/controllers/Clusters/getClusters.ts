import * as Services from './../../services/cluster.services'
import * as EXPRESS from 'express'
import * as userServ from './../../services/user.services'
import JWT from 'jsonwebtoken'

const getClusters : EXPRESS.RequestHandler = async (req, res) =>{
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
    const owner : any = await userServ.GetOneBy("id" , decoded.id)
    console.log(owner)
    Services.getClus(owner).then((data : any) =>{
        if (data.length) {
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

export default getClusters