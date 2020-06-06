import { dataType, generateData } from "../alg/sampleData";
import OpticsModule from "../alg/index";
import { User } from "../db/User";
import { Ticket } from "../db/Ticket";
import { Event } from "../db/Event";

function cluster(
	data: dataType,
	eps: number,
	minPts: number
): {
	clusters: Array<Array<number>>;
	reachibilityPlot: { pointId: number; distance: number | undefined }[];
} {
	return OpticsModule(data, eps, minPts);
}

async function getClusterData() {
	const allUsers = await User.findAll({ where: { role: 0 } });
	const personArr = [];
	for (let i = 0; i < allUsers.length; i++) {
		const user = allUsers[i];
		const tickets = await Ticket.findAll({ where: { userId: user.id } });
		const events = [];
		for (let j = 0; j < tickets.length; j++) {
			const ticket = tickets[j];
			const event = await Event.findByPk(ticket.eventId);
			events.push(event);
		}
		personArr.push({
			name: user.name,
			tickets: events,
		});
	}
	return {
		success: true,
		personArr,
	};
}

export default {
	cluster,
	getClusterData,
};

cluster(generateData(500), 100, 10);
