import { Event } from "../db/Event";
import { Ticket } from "../db/Ticket";
import { View } from "../db/Views";

async function getEvents() {
	const events = await Event.findAll();

	return {
		success: true,
		events,
	};
}

type EventPart = { name: string; index: number };

export interface IEvent {
	name: string;
	description: string;
	date: Date;
	photoPath: string;
	price: number;
	_import: boolean;
	genres: EventPart[];
	type: string;
	place: EventPart;
	month: EventPart;
}

async function createEvent(eventInfo: IEvent) {
	try {
		await Event.create(eventInfo);
		return { success: true };
	} catch (e) {
		console.error(e);
		return { success: false };
	}
}

async function buyTicket(eventId: number, userId: number) {
	try {
		const event = await Event.findByPk(eventId);
		await Ticket.create({
			price: event.price,
			eventId,
			userId,
		});
		return { success: true };
	} catch (e) {
		console.error(e);
		return { success: false };
	}
}

async function trackView(eventId: number, userId: number) {
	try {
		await View.create({
			eventId,
			userId,
		});
		return {
			success: true,
		};
	} catch (e) {
		console.error(e);
		return { success: false };
	}
}

export default {
	getEvents,
	createEvent,
	buyTicket,
	trackView,
};
