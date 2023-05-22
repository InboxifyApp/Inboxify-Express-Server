import * as Services from '../../services/messages.services'
import * as EXPRESS from 'express'
import Messages from '../../models/messages.entity'
import * as cls from '../../services/cluster.services'
import * as Format from 'date-and-time'
import * as usr from './../../services/user.services'
const saveMSG :EXPRESS.RequestHandler = async (req, res) =>{



    
    const apikey : any = req.headers.apikey 
    if (!apikey) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }

    const user : any = await usr.GetOneBy("apikey" ,apikey )
    if (!user) {
        res.status(401).send("You're not allowed to access this route !")
        return
    }

    //get the cluster id 
    const clusterId : any = req.body.cluster

    if (!clusterId) {
        res.status(400).send("You must provide a cluster !")
        return
    }

    const cluster  :any = cls.getClus(clusterId)
    if (!cluster) {
        res.status(404).send(`No cluster found with ID : ${clusterId} !`)
        return
    }


    const message = new Messages
    message.clusters = clusterId
    message.message = req.body.message 
    message.email = req.body.email 
    message.phone = req.body.phone
    message.fullname = req.body.fullname
    message.subject = req.body.subject
    const now : any = Format.format(new Date, 'YYYY-MM-DD HH:mm:ss')
    message.created_at = now
    message.updated_at = now

    Services.createMsg(message).then(resp =>{
        res.status(200).send("Message saved")
    }).catch(e=>{
        console.log(e)
        res.status(500).send("Server error")
    })




}

export default saveMSG