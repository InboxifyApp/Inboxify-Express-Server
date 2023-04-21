import * as EXPRESS from 'express'
import * as Services from './../../services/user.services'


const getOne :EXPRESS.RequestHandler = async (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }

    //get the target value and field . 
    const target : any = req.query.target
    const field : any = req.query.field
    console.log(target, field)

    //check if the field is valid
    if ((field !== "username" && field !== "email" && field !== "phone") || !target ) {
        res.status(400).send("Invalid querries")
        return
    }

    const data : any = await Services.GetOneBy(field, target)
    if (data) {
        res.status(200).send(data)
        return
    }
    res.status(404).send("User not found")
    

}


export default getOne