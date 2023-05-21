import Clusters from './../models/Cluster.entity'


//get one cluster 

const getClusters = async (owner: any ) =>{
    
    return await Clusters.find({
        where : {
            owner : owner
        }
    })
}

//save cluster 
const saveCluster = async (cluster : any) =>{
    await Clusters.save(cluster)
}

//delete cluster 
const deleteCluster = async (id : number) =>{
    await Clusters.delete(id)
}

//one cluster 
const getCluster = async (id : number) =>{
    return await Clusters.findOne({
        where:{
            id : id 
        }
    })
}

export {
    getClusters,
    saveCluster,
    deleteCluster,
    getCluster
}