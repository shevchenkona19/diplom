import UserRouter from "./user/index";
import ClusterRouter from "./cluster/index";
import MainRouter from "./main/index";

export default {
	"/user": UserRouter,
	"/work": ClusterRouter,
	"/main": MainRouter,
};
