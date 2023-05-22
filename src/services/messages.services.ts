import Messages from "../models/messages.entity"


//get all messages
const getAll = async(cluster: any) =>{
    return Messages.find({
        where : {
            clusters : cluster
        }
    })
}

const createMsg = async (message : any ) =>{
    await Messages.save(message)
}

const deleteMsg = async (id : number) =>{
    await Messages.delete(id)
}

const getMsg = async (id : number) =>{
    return await Messages.findOne({
        where : {
            id : id 
        }
    })
}




export default {
    getAll,
    createMsg,
    deleteMsg,
    getMsg,
    

}