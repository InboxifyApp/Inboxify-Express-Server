import Messages from "../models/messages.entity"


//get all messages
const GetAll = async(clus: any) =>{
    return await Messages.findBy({

            clusters : clus
        
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




export  {
    GetAll,
    createMsg,
    deleteMsg,
    getMsg,


}