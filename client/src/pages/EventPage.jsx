import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { post } from "../utils/api";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
	container: {
		display: "flex",
		width: "100%",
		height: "100vh",
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		backgroundColor: "white",
		boxShadow: "0px 0px 46px -21px rgba(0,0,0,0.48)",
		borderRadius: 8,
		overflow: "hidden",
		width: "95%",
		maxWidth: 600,
		height: "90%",
		display: "flex",
		flexDirection: "column",
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 40,
		cursor: "pointer",
		textShadow: "1px 0px 8px rgba(0, 0, 0, 0.3)",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			color: "black",
			textShadow: "1px 0px 8px rgba(255, 255, 255, 0.1)",
		},
	},
	top: {
		flex: 8,
	},
	bottom: {
		height: 150,
		background: "linear-gradient(to right, #6a11cb, #2575fc)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

export default () => {
	const event = useSelector((state) => state.app.selectedEvent);
	const userId = useSelector((state) => state.auth.userId);
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		post("/main/trackView", { eventId: event.id, userId });
	}, []);

	const buy = () => {
		post("/main/buyTicket", { eventId: event.id, userId }).then((res) => {
			if (res.data.success) {
				alert("Куплено!");
			} else {
				alert("Помилка!");
			}
		});
	};

	return (
		<div className={classes.container}>
			<div className={classes.card}>
				<div
					style={{
						position: "absolute",
						backgroundColor: "rgba(255,255,255,0.5)",
						color: "rgba(0,0,0,0.5)",
						zIndex: 2000,
						cursor: "pointer",
						padding: 2,
					}}
					onClick={() => {
						history.goBack();
					}}
				>
					ПОВЕРНУТИСЯ
				</div>
				<div className={classes.top}>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								width: "100%",
								height: 250,
								overflow: "hidden",
							}}
						>
							<img
								src={event.photoPath}
								style={{
									width: "100%",
									height: "auto",
									marginTop: -50,
									filter: "blur(2px)",
								}}
							/>
						</div>
						<h1 style={{ fontSize: 30, marginLeft: 30, marginTop: 30 }}>
							{event.name}
							<h3 style={{ fontWeight: "normal", color: "gray", fontSize: 18 }}>
								{event.date} - {event.place.name}
							</h3>
						</h1>
						<div style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
							{event.description}
						</div>
					</div>
				</div>
				<div className={classes.bottom}>
					<h1 className={classes.text} onClick={buy}>
						Купити! - {event.price} ₴
					</h1>
				</div>
			</div>
		</div>
	);
};
