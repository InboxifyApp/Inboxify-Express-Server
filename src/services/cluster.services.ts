import Clusters from './../models/Cluster.entity'


//get one cluster 

const getClus = async (owner: any) => {
    const clusters = await Clusters.find({
      where: {
        owner: owner,
      },
    })
    return clusters;
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
    getClus,
    saveCluster,
    deleteCluster,
    getCluster
}