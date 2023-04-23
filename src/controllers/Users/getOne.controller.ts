import * as EXPRESS from 'express'
import * as Services from './../../services/user.services'
import JWT from 'jsonwebtoken'

const getOne :EXPRESS.RequestHandler = async (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }

    //get the target value and field . 
    const toke : any = req.query.token

    //check if the field is valid
    if (!toke ) {
        res.status(400).send("Invalid querries")
        return
    }
    const [beerer, token] = toke.split(" ")
    if (!beerer || !token) {
        res.status(400).send("Invalid querries")
        return
    }
    if (beerer != "Bearer") {
        res.status(400).send("Invalid querries")
        return
    }
    //check if the token is valid
    const decoded : any = JWT.verify(token, String(process.env.JWT_SECRET))
    if (!decoded) {
        res.status(400).send("Invalid token")
        return
    }
    //check if the user exists






    const data : any = await Services.GetOneBy("id", decoded)
    if (data) {
        res.status(200).send(data)
        return
    }
    res.status(404).send("User not found")
    

}


export default getOne