import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { selectEvent } from "../redux/app";
import { get } from "../utils/api";
import { setLogin } from "../redux/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "100vh",
		flexDirection: "column",
		paddingLeft: "20%",
		paddingRight: "20%",
	},
	userContainer: {
		flex: 2,
		position: "relative",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	concertContainer: {
		flex: 8,
	},
	userPic: (loaded) => ({
		height: loaded ? 80 : 0,
		width: loaded ? 80 : 0,
		opacity: loaded ? 1 : 0,
		transition: "all 0.2s ease-in-out",
		"border-radius": "50%",
		"&:hover": {
			"-webkit-box-shadow":
				"5px 5px 26px 5px rgba(164,161,255,0.5), 5px 0px 26px 5px rgba(255,26,56,0.5), -3px 4px 26px 17px rgba(41,255,234,0.65)",
			"box-shadow":
				"5px 5px 26px 5px rgba(164,161,255,0.5), 5px 0px 26px 5px rgba(255,26,56,0.5), -3px 4px 26px 17px rgba(41,255,234,0.65)",
		},
	}),
	greetings: {
		fontWeight: 800,
		fontSize: 50,
		background: "linear-gradient(to right, #000, #434343)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
	},
	eventContainer: {
		minHeight: 150,
		width: "80%",
		margin: "auto",
		transition: "all 0.3s ease-in-out",
		display: "flex",
		position: "relative",
		overflow: "hidden",
		flexDirection: "row",
		borderRadius: 10,
		"box-shadow": "0px 0px 20px 1px rgba(0,0,0, 0.1)",
	},
	eventImage: {
		height: "auto",
		"max-width": "20%",
	},
}));

export default () => {
	const [loaded, setLoaded] = useState(false);
	const classes = useStyles(loaded);
	const history = useHistory();
	const dispatch = useDispatch();
	const [menuVisible, setMenuVisible] = useState(false);

	const [events, setEvents] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 1500);
		get("/main/events").then((res) => {
			setEvents(res.data.events);
		});
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.userContainer}>
				<h2 className={classes.greetings}>Ласкаво просимо!</h2>
				<img
					className={classes.userPic}
					src={
						"https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/e/9/0/8/e908cd7ccb63d9c9d5666117c1189b33.jpg"
					}
					onClick={() => {
						setMenuVisible(!menuVisible);
					}}
				/>
				<div
					style={{
						backgroundColor: "white",
						width: 200,
						height: 100,
						position: "absolute",
						top: 120,
						borderRadius: 20,
						boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.5)",
						right: 0,
						zIndex: 900,
						display: menuVisible ? "flex" : "none",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						variant={"contained"}
						onClick={() => {
							dispatch(setLogin({ token: "", isLogin: false }));
						}}
					>
						Вийти
					</Button>
				</div>
			</div>
			<div className={classes.concertContainer}>
				<li>
					{events.map((event) => {
						return (
							<div
								key={event.id}
								className={classes.eventContainer}
								style={{
									background: `linear-gradient(to right, #fdfbfb, #ebedee`,
									marginBottom: 45,
								}}
								onClick={() => {
									dispatch(selectEvent(event));
									history.push("/event");
								}}
							>
								<img className={classes.eventImage} src={event.photoPath} />
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										marginLeft: 20,
									}}
								>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<h3
											style={{
												fontSize: 20,
												fontWeight: 700,
												background: "linear-gradient(to right, #000, #434343)",
												"-webkit-background-clip": "text",
												"-webkit-text-fill-color": "transparent",
											}}
										>
											{event.name}
										</h3>
										<h5 style={{ right: 10, top: 0, position: "absolute" }}>
											{event.price} ₴
										</h5>
									</div>
									<div
										style={{
											maxHeight: 80,
											overflow: "scroll",
											marginBottom: 10,
											marginRight: 20,
										}}
									>
										{event.description}
									</div>
									<text style={{ marginBottom: 2 }}>
										{event.date} - {event.place.name}
									</text>
								</div>
							</div>
						);
					})}
				</li>
			</div>
		</div>
	);
};
