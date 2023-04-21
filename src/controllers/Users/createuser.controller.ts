import * as EXPRESS from 'express'
import Users from '../../models/users.schema'
import * as Services from '../../services/user.services'
import bcrypt from 'bcrypt'
import date from 'date-and-time'
import GenerateAPIKey from '../../utils/APIKEY'

const createUser : EXPRESS.RequestHandler = async (req, res) =>{
    const API : any = String(process.env.API) 
    const API_FRONT = req.headers.api_key
    console.log(req.headers)
    if (API != API_FRONT) {
        //unauthorized status 
        
        res.status(401).send("You're not allowed to access this route !")

        return
    }
    const Body : any = req.body
    const Username : any = await Services.GetOneBy("username", Body.username)
    const Email : any = await Services.GetOneBy("email",Body.email)
    const Phone : any = await Services.GetOneBy("phone",Body.phone)

    if (Username || Email  || Phone) {
        res.status(400).send("Username , Email or Phone already exists")
        return
    }

    const user = new Users
    user.username = Body.username
    user.fullname = Body.fullname
    user.email = Body.email
    user.phone = Body.phone
    user.bday = Body.bday
    user.photo = Body.photo
    user.bday = Body.bday
    const today : any = date.format(new Date,  'YYYY-MM-DD HH:mm:ss')
    user.createdat = today 

    user.updatedat = today


    user.apikey_call_times = 0
    //user.apikey_expires = date.addDays(new Date(), 1)
    //user.apikey_last_ip = req.ip
    //user.apikey_last_used = new Date()

    user.verified = false
    user.apikey = await GenerateAPIKey()
    const saltRound: number = Number(process.env.SALT)
    user.password = await bcrypt
      .genSalt(saltRound)
      .then((s) => bcrypt.hash(Body.password, s))
    console.log(user)

    await Services.Create(user).then(re=>{
        res.status(200).send("User created")
    }).catch(e=>{
        res.status(500).send("Server error")
        console.log(e)
    })
}

export default createUser