import { NextFunction, Request, Response } from "express";
import UserController from "../../controllers/user";

async function registerUserRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const result = await UserController.registerUser(
		req.body.username,
		req.body.password,
		req.body.isAdmin
	);
	if (result.success) {
		res.cookie("auth", result.token);
		return res.json({
			...result,
		});
	} else {
		next({
			...result,
		});
	}
}

async function loginUserRoute(req: Request, res: Response, next: NextFunction) {
	const result = await UserController.loginUser(
		req.body.username,
		req.body.password
	);
	if (result.success) {
		res.cookie("auth", result.token);
		return res.json({
			...result,
		});
	} else {
		next({
			...result,
		});
	}
}

async function test(req: Request, res: Response, next: NextFunction) {
	console.log("req");
	const result = await UserController.getAll();
	return res.json({ ...result });
}

export default {
	registerUserRoute,
	loginUserRoute,
	test,
};
