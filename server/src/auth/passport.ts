import { JwtFromRequestFunction, VerifiedCallback } from "passport-jwt";
import { PassportStatic } from "passport";
const passportJWT = require("passport-jwt");
import { User } from "../db/User";

export interface JwtOptions {
	jwtFromRequest: JwtFromRequestFunction;
	secretOrKey?: string | null;
}

export interface JwtPayload {
	id: number;
}

export default (passport: PassportStatic) => {
	const ExtractJwt = passportJWT.ExtractJwt;
	const JwtStrategy = passportJWT.Strategy;

	const jwtOptions: JwtOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
		secretOrKey: process.env.SECRETORKEY || "tasmanianDevil",
	};

	const strategy = new JwtStrategy(
		jwtOptions,
		async (jwt_payload: JwtPayload, next: VerifiedCallback) => {
			const user = await User.findByPk(jwt_payload.id);
			if (user) {
				next(null, user);
			} else {
				next(null, false);
			}
		}
	);
	passport.use(strategy);
};
