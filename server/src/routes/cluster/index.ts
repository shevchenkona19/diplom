import express from "express";
const router = express.Router();
import ClusterRouter from "./cluster";

router.post("/cluster", ClusterRouter.clusterRoute);
router.get("/clusterData", ClusterRouter.loadClusterData);

export default router;
