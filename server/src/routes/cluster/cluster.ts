import { Request, Response } from "express";
import Controller from "../../controllers/clustering";

async function clusterRoute(req: Request, res: Response) {
	const { data, eps, minPts } = req.body;
	const result = Controller.cluster(data, eps, minPts);

	return res.json(result);
}

async function loadClusterData(req: Request, res: Response) {
	const result = await Controller.getClusterData();

	return res.json({
		...result,
	});
}

export default {
	clusterRoute,
	loadClusterData,
};
