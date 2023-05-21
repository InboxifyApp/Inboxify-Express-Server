import { Router } from "express"
import makeCluster from "../controllers/Clusters/makecluster.controller"

import getClusters from "../controllers/Clusters/getClusters"


const clusterRouter = Router()

clusterRouter.post("/", makeCluster)
clusterRouter.get("/", getClusters)


export default clusterRouter