import * as EXPRESS  from 'express'
import * as Services from './../../services/user.services'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const Login : EXPRESS.RequestHandler= async  (req,res) =>{
    console.log("hello".indexOf("e"))
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    console.log(req.headers)
    if (API != API_FRONT) {
        //unauthorized status 
        
        res.status(401).send("You're not allowed to access this route !")

        return
    }
    const body : any = req.body 
    if (!body.username || !body.password) {
        res.status(400).send({
            error : "Invalid Request"
        })
    }
    const identifier = body.username.indexOf("@") !== -1 ? "email" : "username"
    const user : any = await Services.GetOneBy(identifier , body.username)

    if (!user) {
        res.status(401).send("Invalid username or password")
        return 
    }

    const pass : any = await Services.getPass(user.id)

    if (!pass) {
        res.status(401).send("Invalid username or password")
        return
    }
    const isMatch = await bcrypt.compare(body.password , pass.password)
    if (!isMatch) {
        res.status(401).send("Invalid username or password")
        return 
    }
    console.log("User datas ! : " , user)
    const token = JWT.sign({
        id : user.id
    } , process.env.JWT_SECRET as string , {
        expiresIn : "10h"
    })

    res.status(200).send({
        token : token
    })

    



}


export default Login