import * as EXPRESS from 'express'
import * as Services from './../../services/user.services'


const GetAll : EXPRESS.RequestHandler =async  (req, res) =>{
    
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    if (API != API_FRONT) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    const datas : any = await Services.GetAll()
    if (datas.length ) {
        res.status(200).send(datas)
        return
    }
    res.status(404).send("There's 0 users so far ")
}

export default GetAll