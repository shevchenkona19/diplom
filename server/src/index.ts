import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db/index";
import passport from "passport";
import Auth from "./auth/passport";
import AppRouter from "./routes";
import errorHandler from "./utils/errorHandler";

const sequelize = db();
const app = express();
const corsOpts = {
	credentials: true,
};

Auth(passport);
app.use(
	cors({
		corsOpts,
	})
);
app.options("/*", cors(corsOpts));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());

export { passport };

for (const route in AppRouter) {
	if ((AppRouter as Object).hasOwnProperty(route)) {
		app.use("/api" + route, AppRouter[route]);
	}
}

app.use(errorHandler);

const PORT = 3000;
const server = app.listen(PORT, async () => {
	console.log(
		"  App is running at http://localhost:%d in %s mode",
		PORT,
		app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
	// await sequelize.sync({ force: false });
});

export default server;
