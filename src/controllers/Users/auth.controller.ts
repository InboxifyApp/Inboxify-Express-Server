import * as EXPRESS from 'express'
import JWT from 'jsonwebtoken'


const Auth :EXPRESS.RequestHandler= (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    console.log(req.headers)
    if (API != API_FRONT) {
        
        res.status(401).send("You're not allowed to access this route !")

        return
    }

    const autho : any = req.headers.authorization
    const [beerer, token] = autho.split(" ")
    if (!beerer || !token) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }
    if (beerer != "Bearer") {
        res.status(400).send("Invalid querries")
        return
    }

    
    
    JWT.verify(token, String(process.env.JWT_SECRET), (err:any, decoded:any)=>{

        if (err) {
            res.status(401).send("You're not allowed to access this route !")
            return
        }

        res.status(200).send("You're allowed to access this route !")
    })
}

export default Auth