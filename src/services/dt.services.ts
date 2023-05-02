import DeadTokens from "../models/deadTokens.schema"


const KillToken = async (datas : any) =>{
    await DeadTokens.save(datas)  
}   

const GetAll = async () =>{
    const data : any = await DeadTokens.find()
    return data
}




export default KillToken