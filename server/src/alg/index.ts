import { PriorityQueue } from "./priorityQueue";
import { normalizeData, dataType } from "./sampleData";

export interface OPTICSResult {
	clusters: Array<Array<number>>;
	reachibilityPlot: { pointId: number; distance: number | undefined }[];
}

const OpticsModule = (
	data: dataType,
	eps: number,
	minPts: number
): OPTICSResult => {
	const dataset = normalizeData(data);
	let coreDistance = 0;
	let orderedList = [];
	let clusters = [];

	let reachability = new Array(dataset.length);
	let processed = new Array(dataset.length);

	const expandCluster = (clusterId: number, priorityQueue: PriorityQueue) => {
		const queueElements = priorityQueue.items;
		for (let i = 0, l = queueElements.length; i < l; i++) {
			const point = queueElements[i];
			if (processed[point.element] === undefined) {
				const neighbours = regionQuery(point.element);
				processed[point.element] = 1;

				clusters[clusterId].push(point.element);
				orderedList.push(point.element);

				if (distanceToCore(point.element) !== undefined) {
					updateQueue(point.element, neighbours, priorityQueue);
					expandCluster(clusterId, priorityQueue);
				}
			}
		}
	};

	const updateQueue = (
		id: number,
		neighbours: number[],
		priorityQueue: PriorityQueue
	) => {
		coreDistance = distanceToCore(id);
		neighbours.forEach((pointId) => {
			if (processed[pointId] === undefined) {
				const dist = euclideanDistance(dataset[id], dataset[pointId]);
				const newReachableDistance = Math.max(coreDistance, dist);

				if (reachability[pointId] === undefined) {
					reachability[pointId] = newReachableDistance;
					priorityQueue.insert(pointId, newReachableDistance);
				} else {
					if (newReachableDistance < reachability[pointId]) {
						reachability[pointId] = newReachableDistance;
						priorityQueue.removeElement(pointId);
						priorityQueue.insert(pointId, newReachableDistance);
					}
				}
			}
		});
	};

	const distanceToCore = (id: number) => {
		for (let coreDistCand = 0; coreDistCand < eps; coreDistCand++) {
			let neighbours = regionQuery(id, coreDistCand);
			if (neighbours.length > minPts) {
				return coreDistCand;
			}
		}
		return;
	};

	const regionQuery = (pointId: number, epsilon = eps) => {
		const neighbours: number[] = [];
		if (dataset[pointId] === undefined) {
			console.log(pointId);
			console.log(dataset);
		}
		for (let id = 0, l = dataset.length; id < l; id++) {
			if (euclideanDistance(dataset[pointId], dataset[id]) < epsilon) {
				neighbours.push(id);
			}
		}
		return neighbours;
	};

	const euclideanDistance = (p: number[], q: number[]) => {
		let sum = 0;
		let i = Math.min(p.length, q.length);

		while (i--) {
			sum += (p[i] - q[i]) * (p[i] - q[i]);
		}
		const res = Math.sqrt(sum);
		return res;
	};

	for (let id = 0, l = dataset.length; id < l; id++) {
		//if not processed this point before
		if (processed[id] !== 1) {
			processed[id] = 1;
			clusters.push([id]);
			const clusterId = clusters.length - 1;
			orderedList.push(id);
			const priorityQueue = new PriorityQueue();
			const neighbours = regionQuery(id);

			if (distanceToCore(id) !== undefined) {
				updateQueue(id, neighbours, priorityQueue);
				expandCluster(clusterId, priorityQueue);
			}
		}
	}

	const getRP = () => {
		const reachibilityPlot: {
			pointId: number;
			distance: number | undefined;
		}[] = [];

		for (let i = 0, l = orderedList.length; i < l; i++) {
			const pointId = orderedList[i];
			const distance = reachability[pointId];
			reachibilityPlot.push({ pointId, distance: distance ? distance : 0 });
		}

		return reachibilityPlot;
	};

	return {
		clusters,
		reachibilityPlot: getRP(),
	};
};

export default OpticsModule;
