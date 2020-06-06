import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EventsPage from "./pages/EventsPage";
import { setLogin } from "./redux/auth/index";
import ClusterizationPage from "./pages/ClusterizationPage";

const afterLoginRoutes = ["/dashboard", "/clusterization", "/events"];

function App() {
	const isLogin = useSelector((state) => state.auth.isLogin);
	const token = useSelector((state) => state.auth.token);
	const error = useSelector((state) =>
		state.auth.isError ? state.auth.errorMsg : null
	);

	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (error !== null) {
			alert(error);
		}
	}, [error]);

	useEffect(() => {
		const currentRoute = location.pathname;
		if (!isLogin) {
			if (currentRoute !== "/login" && currentRoute !== "/register") {
				history.push("/login");
			}
		} else if (token.length > 0) {
			if (!afterLoginRoutes.includes(currentRoute)) history.push("/dashboard");
		} else {
			dispatch(setLogin({ token: "", isLogin: false }));
		}
	}, [isLogin, location.pathname, history, token.length, dispatch]);

	return (
		<Switch>
			{isLogin ? (
				<>
					<Route path="/dashboard">
						<MainPage />
					</Route>
					<Route path="/clusterization">
						<ClusterizationPage />
					</Route>
					<Route path="/events">
						<EventsPage />
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
