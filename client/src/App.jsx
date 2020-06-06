import React, { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";
import EventPage from "./pages/EventPage";
import Home from "../src/pages/Home";
import "../src/App.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../src/redux/auth/index";

const afterLoginRoutes = ["/home", "/settings", "/event"];

function App() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const isLogin = useSelector((state) => state.auth.isLogin);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		const currentRoute = location.pathname;
		if (!isLogin) {
			if (currentRoute !== "/login" && currentRoute !== "/register") {
				history.push("/login");
			}
		} else if (token.length > 0) {
			if (!afterLoginRoutes.includes(currentRoute)) history.push("/home");
		} else {
			dispatch(setLogin({ token: "", isLogin: false }));
		}
	}, [location.pathname, isLogin, token]);

	return (
		<Switch>
			{isLogin ? (
				<>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/event">
						<EventPage />
					</Route>
				</>
			) : (
				<>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/register">
						<RegisterPage />
					</Route>
				</>
			)}
		</Switch>
	);
}

export default App;
