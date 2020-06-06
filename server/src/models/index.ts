import { User } from "../db/User";
import { Event } from "../db/Event";

export default {
	getUserModel: () => User,
	getEventModel: () => Event,
};
