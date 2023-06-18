import Clusters from './../models/Cluster.entity'


//get one cluster 

const getClus = async (owner: any) => {
    const clusters = await Clusters.findBy({
            owner: owner
    })
    return clusters
  }
//save cluster 
const saveCluster = async (cluster : any) =>{
    await Clusters.save(cluster)
}

//delete cluster 
const deleteCluster = async (id : any) =>{
    await Clusters.delete(id)
}

//one cluster 
const getCluster = async (id : any) =>{
    return await Clusters.findOne({
        where:{
            id : id 
        }
    })
}

const getLimited = async (id : any) =>{
    return await Clusters.findOne({
        select:["id", "name", "color"],

        where:{
            id : id 
        }
    })
}
export {
    getClus,
    saveCluster,
    deleteCluster,
    getCluster,
    getLimited
}