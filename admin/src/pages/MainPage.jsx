import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: 15,
		paddingBottom: 15,
	},
}));

export default () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<Card>
				<CardContent>
					<Typography variant="h4">Кластеризація</Typography>
					<Typography color="textSecondary">
						Тут можна провести кластеризацію користувачів
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={() => history.push("/clusterization")}>
						Перейти
					</Button>
				</CardActions>
			</Card>
			<Card>
				<CardContent>
					<Typography variant="h4">Редагування Івентів</Typography>
					<Typography color="textSecondary">
						Створити та відредагувати івенти
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={() => history.push("/events")}>
						Перейти
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};
