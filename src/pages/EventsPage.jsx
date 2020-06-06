import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import { post } from "../utils/api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const genres = [
	{ name: "Shanson", index: 1 },
	{ name: "jazz", index: 2 },
	{ name: "music 20 centieury", index: 3 },
	{ name: "electro", index: 4 },
	{ name: "rock", index: 5 },
	{ name: "hip-hop", index: 6 },
	{ name: "pop", index: 7 },
	{ name: "classics", index: 8 },
	{ name: "ethnic music", index: 9 },
	{ name: "ballet", index: 10 },
];

const places = [
	{ name: "Premier Hotel", index: 12 },
	{ name: "Філармонія України", index: 13 },
	{ name: "Будинок офіцерів", index: 14 },
	{ name: "Український будинок", index: 15 },
	{ name: "Національний будинок камерної музики", index: 16 },
	{ name: "Будинок художника", index: 17 },
	{ name: "Будинок архітектора", index: 18 },
	{ name: "Будинок звукозапису НРКУ", index: 19 },
	{ name: "Freedom Hall", index: 20 },
	{ name: "Bel Etage", index: 21 },
	{ name: "Тераса Д12", index: 22 },
	{ name: "ЦКМ КПІ", index: 23 },
	{ name: "Національна Опера України", index: 24 },
	{ name: "Міжнародний Центр Культури ", index: 25 },
	{ name: "Hillsong CH", index: 26 },
	{ name: "Палац Україна", index: 27 },
	{ name: "КВЦ Парковий", index: 28 },
	{ name: "МВЦ", index: 29 },
	{ name: "Палац спорту", index: 30 },
	{ name: 'НСК "Олімпійський"', index: 31 },
];

const monthes = [
	{ name: "jan", index: 34 },
	{ name: "feb", index: 35 },
	{ name: "mar", index: 36 },
	{ name: "apr", index: 37 },
	{ name: "may", index: 38 },
	{ name: "jun", index: 39 },
	{ name: "jul", index: 40 },
	{ name: "aug", index: 41 },
	{ name: "sept", index: 42 },
	{ name: "oct", index: 43 },
	{ name: "nov", index: 44 },
	{ name: "dec", index: 45 },
];

export default () => {
	const [createEventModal, setCreateEventModal] = useState(false);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [photo, setPhoto] = useState("");
	const [date, setDate] = useState(undefined);
	const [isImport, setIsImport] = useState(false);
	const [genre, setGenres] = useState([]);
	const [type, setType] = useState("open");
	const [place, setPlace] = useState("");
	const [month, setMonth] = useState("");

	const submitEvent = () => {
		const event = {
			name,
			description,
			photoPath: photo,
			price,
			_import: isImport,
			genres: genre,
			date,
			type,
			place,
			month,
		};
		post("/main/event", { event }).then((res) => console.log(res));
	};

	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100vh",
				padding: "10px 10px 10px 10px",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button
				variant="outlined"
				onClick={() => {
					setCreateEventModal(true);
				}}
			>
				Створити івент
			</Button>
			<Modal open={createEventModal} onClose={() => setCreateEventModal(false)}>
				<div
					style={{
						width: "35%",
						height: "80%",
						overflow: "scroll",
						paddingTop: 5,
						paddingRight: 10,
						paddingLeft: 10,
						paddingBottom: 20,
						background: "white",
						margin: "auto",
						marginTop: 50,
						borderRadius: 5,
					}}
				>
					<h2 style={{ marginBottom: 20 }}>Створити івент</h2>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Назва"
						value={name}
						onChange={({ target: { value } }) => setName(value)}
					/>
					<TextField
						variant="outlined"
						fullWidth
						multiline
						rows={5}
						label="Опис"
						value={description}
						onChange={({ target: { value } }) => setDescription(value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Ціна квитків"
						value={price}
						onChange={({ target: { value } }) => setPrice(value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Фото"
						value={photo}
						onChange={({ target: { value } }) => setPhoto(value)}
					/>
					<TextField
						id="date"
						label="Дата проведення концерту"
						type="date"
						margin="normal"
						fullWidth
						value={date}
						onChange={(e) => setDate(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isImport}
								onChange={() => setIsImport(!isImport)}
								name="checkedB"
								color="primary"
							/>
						}
						style={{ width: "100%", marginTop: 20 }}
						label="Це імпортний концерт?"
					/>
					<FormControl
						variant="outlined"
						style={{ width: "100%", marginTop: 20 }}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Жанри
						</InputLabel>
						<Select
							value={genre}
							multiple
							onChange={(event) => {
								setGenres(event.target.value);
							}}
							label="Жанри"
							input={<Input id="select-multiple-chip" />}
							renderValue={(selected) => (
								<div style={{ display: "flex", flexWrap: "wrap" }}>
									{selected.map((value) => (
										<Chip
											key={value.index}
											label={value.name}
											style={{ margin: 2 }}
										/>
									))}
								</div>
							)}
							MenuProps={MenuProps}
						>
							{genres.map((genre) => {
								return (
									<MenuItem key={genre.index} value={genre}>
										{genre.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl
						variant="outlined"
						style={{ width: "100%", marginTop: 20 }}
					>
						<InputLabel id="type-label">Тип концерту</InputLabel>
						<Select
							labelId="type-label"
							id="type-select"
							value={type}
							onChange={(e) => setType(e.target.value)}
							label="Тип концерту"
						>
							<MenuItem value={"open"}>Відкритий</MenuItem>
							<MenuItem value={"closed"}>Закритий</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						variant="outlined"
						style={{ width: "100%", marginTop: 20 }}
					>
						<InputLabel id="place-label">Місце проведення концерту</InputLabel>
						<Select
							labelId="place-label"
							id="place-select"
							value={place}
							onChange={(e) => setPlace(e.target.value)}
							label="Місце проведення концерту"
						>
							{places.map((place) => {
								return (
									<MenuItem key={place.index} value={place}>
										{place.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl
						variant="outlined"
						style={{ width: "100%", marginTop: 20 }}
					>
						<InputLabel id="month-label">Місяць проведення концерту</InputLabel>
						<Select
							labelId="month-label"
							id="month-select"
							value={month}
							onChange={(e) => setMonth(e.target.value)}
							label="Місяць проведення концерту"
						>
							{monthes.map((month) => {
								return (
									<MenuItem key={month.index} value={month}>
										{month.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						style={{ marginTop: 40 }}
						onClick={() => {
							submitEvent();
						}}
					>
						Створити
					</Button>
				</div>
			</Modal>
		</div>
	);
};
