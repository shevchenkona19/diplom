import { User as _User } from "./src/db/User";

declare global {
	namespace Express {
		export interface Request {
			User: _User;
		}
	}
}
