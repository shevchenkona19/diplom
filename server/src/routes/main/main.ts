import { Request, Response } from "express";
import Controller from "../../controllers/main";

async function getEvents(_: Request, res: Response) {
	const result = await Controller.getEvents();

	return res.json({
		...result,
	});
}

async function addEvent(req: Request, res: Response) {
	const event = req.body.event;
	const result = await Controller.createEvent(event);
	return res.json({
		success: result.success,
	});
}

async function buyTicket(req: Request, res: Response) {
	const result = await Controller.buyTicket(req.body.eventId, req.body.userId);

	return res.json({
		success: result.success,
	});
}

async function trackView(req: Request, res: Response) {
	const result = await Controller.trackView(req.body.eventId, req.body.userId);
	return res.json({
		success: result.success,
	});
}

export default {
	getEvents,
	addEvent,
	buyTicket,
	trackView,
};
