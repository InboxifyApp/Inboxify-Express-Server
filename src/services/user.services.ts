import Users from "../models/users.schema"
const targetFields : any = [
    'username',
    'fullname',
    'email',
    'phone',
    'bday',
    'photo',
    'apikey',
    'apikey_expires',
    'apikey_last_used',
    'apikey_last_ip',
    'apikey_call_times', 
    'id'
]



const GetAll = async () =>{
    return await Users.find({
        select:targetFields
    })

} 

const GetOne = async (id : number) =>{

    return await Users.findOne({
        select:targetFields,
        where : {
            id : id 
        }
    
    })

}

const Create = async (datas : any) =>{

    await Users.save(datas)
}

const Update = async (id : number , datas : any) =>{
    await Users.update(id , datas)
}

const getPass = async (id : any) =>{
    return await Users.findOne({
        select:['password'],
        where : {
            id : id
        }
    })
}
//get by phone or email or username 
const GetOneBy = async (field : any , value : any) =>{

    return await Users.findOne({
        select:targetFields, 
        where : {
            [field] : value
        }
        
    })
}

const Delete = async (id : number) =>{
    await Users.delete(id)
}
export {
    GetAll,
    GetOne,
    Create,
    Update,
    Delete,
    GetOneBy,
    getPass

}