import { Router } from "express"
import makeCluster from "../controllers/Clusters/makecluster.controller"

import getClusters from "../controllers/Clusters/getClusters"
import getLimitedClusters from "../controllers/Clusters/get.userCluster"

const clusterRouter = Router()

clusterRouter.post("/", makeCluster)
clusterRouter.get("/", getClusters)
clusterRouter.get("/by", getLimitedClusters)


export default clusterRouter