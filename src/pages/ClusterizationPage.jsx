import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { post, get } from "../utils/api";
import { generateClusterData } from "../utils/clustersData";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
}));

export default () => {
	const classes = useStyles();
	const history = useHistory();

	const [eps, setEps] = useState("");
	const [minPts, setMinPts] = useState("");
	const [sampleData, setSampleData] = useState([]);
	const [data, setClusterData] = useState(null);

	const generateData = async () => {
		const res = await get("/work/clusterData");
		setSampleData(res.data.personArr);
	};

	const fireOptics = async () => {
		const res = await post("/work/cluster", {
			data: sampleData,
			eps,
			minPts,
		});
		setClusterData(res.data);
	};

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				width: "100%",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					flex: 1,
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "flex-start",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "flex-start",
				}}
			>
				<Card style={{ width: 300 }}>
					<CardContent>
						<Typography>
							{eps.length > 0 && minPts.length > 0
								? sampleData.length > 0
									? "Run OPTICS"
									: "Generate sample data"
								: "Please enter Eps and MinPts."}
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								marginTop: 15,
							}}
						>
							<TextField
								value={eps}
								onChange={(e) => setEps(e.target.value)}
								label="Eps"
								style={{ marginBottom: 10 }}
							/>
							<TextField
								value={minPts}
								onChange={(e) => setMinPts(e.target.value)}
								label="MinPts"
							/>
						</div>
					</CardContent>
					<CardActions>
						<Button size="small" onClick={generateData}>
							Generate sample data
						</Button>
						<Button size="small" onClick={fireOptics}>
							Run OPTICS
						</Button>
					</CardActions>
				</Card>
				<div
					style={{
						height: "100%",
						overflow: "scroll",
						width: 305,
						alignItems: "center",
					}}
				>
					<li>
						{sampleData.map((dat) => (
							<ExpansionPanel style={{ width: 300 }}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									{dat.name}
								</ExpansionPanelSummary>
								<ExpansionPanelDetails
									style={{ display: "flex", flexDirection: "column" }}
								>
									Квитки:
									<li>
										{dat.tickets.map((ticket) => (
											<ExpansionPanel>
												<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
													{ticket.name}
												</ExpansionPanelSummary>
												<ExpansionPanelDetails>
													{ticket.description}
													<br />
													Ціна: {ticket.price}
													<br />
													Жанри:{" "}
													{ticket.genres.map((genre) => genre.name + "; ")}
													<br />
													Місце: {ticket.place.name}
													<br />
													Дата: {ticket.date}
												</ExpansionPanelDetails>
											</ExpansionPanel>
										))}
									</li>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))}
					</li>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					width: "100%",
					overflow: "scroll",
					marginLeft: 10,
					marginRight: 10,
				}}
			>
				{data !== null && (
					<li>
						{data.clusters.map((cluster, index) => (
							<ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									Кластер №{index}
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<li>
										{cluster.map((index) => (
											<div>Ім'я: {sampleData[index].name}</div>
										))}
									</li>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))}
					</li>
				)}
			</div>
		</div>
	);
};
