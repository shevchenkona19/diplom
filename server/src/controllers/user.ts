import { User } from "../db/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorCodes from "../utils/ErrorCodes";

type registerUserReturn = {
	success: true;
	token: string;
	userId: number;
};

type loginUserReturn = {
	success: true;
	token: string;
	userId: number;
};

export type returnError = {
	success: false;
	error: ErrorCodes | {};
};
async function registerUser(
	username: string,
	password: string,
	isAdmin: boolean
): Promise<registerUserReturn | returnError> {
	try {
		const salt = await bcrypt.genSalt(2);
		const hash = await bcrypt.hash(password, salt);
		const user = User.build({
			name: username,
			hash,
			role: isAdmin ? 1 : 0,
		});
		await user.save();
		const token = jwt.sign(
			{
				id: user.id,
			},
			salt
		);
		return {
			success: true,
			token,
			userId: user.id,
		};
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
}

async function loginUser(
	name: string,
	password: string
): Promise<loginUserReturn | returnError> {
	try {
		const user = await User.findOne({ where: { name } });
		if (user === null) {
			return {
				success: false,
				error: ErrorCodes.NO_SUCH_USER,
			};
		}
		const match = await bcrypt.compare(password, user.hash);
		if (!match) {
			return {
				success: false,
				error: ErrorCodes.WRONG_PASSWORD,
			};
		}
		const payload = {
			id: user.id,
		};
		const token = jwt.sign(payload, process.env.SALT || "tasmanianDevil");
		return {
			success: true,
			token,
			userId: user.id,
		};
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
}

async function getAll() {
	const all = await User.findAll();
	return all;
}

export default {
	registerUser,
	loginUser,
	getAll,
};
