type namesType = Array<string>;
type eventNamesType = Array<string>;
type importType = Array<boolean>;
type genreType = {
	name: string;
	index: number;
};
type genresType = Array<genreType>;
type typesType = Array<string>;
type placeType = {
	name: string;
	index: number;
};
type placesType = Array<placeType>;
type priceType = Array<string>;
type monthType = {
	name: string;
	index: number;
};
type monthsType = Array<monthType>;

const names: namesType = [
	"Nikita",
	"Sasha",
	"Masha",
	"Petya",
	"Maks",
	"Vova",
	"Daniel",
	"Stan",
	"Bo",
	"So Pank Ho",
	"Valik",
	"Dima",
	"Alex",
	"Martin",
	"Kelt",
	"Dog",
	"Buddy",
	"Steven",
];

const eventNames: eventNamesType = [
	"Yonu",
	"Gran Show",
	"Gista",
	"Dakhabrakha",
	"Music from films",
	"Terrace",
	"Maks Barskih",
	"Kiko",
	"Suicideboys",
	"Polish dudka",
];

//index: 0
const _import: importType = [true, false];

const genres: genresType = [
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
//index: 11
const types: typesType = ["open", "closed"];

const places: placesType = [
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
	{ name: 'НСК "Олімпійський" ', index: 31 },
];

//index: 33
const price: priceType = ["poor", "mid", "rich"];

const month: monthsType = [
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

type eventType = {
	name: string;
	_import: boolean;
	genres: genreType[];
	type: string;
	place: placeType;
	price: string;
	month: monthType;
};

type person = {
	name: string;
	tickets: eventType[];
};

export type dataType = person[];

type normalizedDataType = Array<Array<number>>;

export const generateData = (quantity: number): dataType => {
	const data: dataType = [];
	for (let i = 0; i < quantity; i++) {
		const person: person = {
			name: names[r(0, names.length)],
			tickets: [],
		};
		const tickets = [];
		for (let j = 0; j < r(1, 200); j++) {
			const event: eventType = {
				name: eventNames[r(0, eventNames.length)],
				_import: _import[r(0, _import.length)],
				genres: [],
				type: types[r(0, types.length)],
				place: places[r(0, places.length)],
				price: price[r(0, price.length)],
				month: month[r(0, month.length)],
			};
			const selectedGenres = [];
			for (let k = 0; k < r(1, 3); k++) {
				let genre: genreType;
				do {
					const ind = r(0, genres.length);
					genre = genres[ind];
				} while (
					selectedGenres.length > 0 &&
					selectedGenres.find((val) => val.index === genre.index)
				);
				selectedGenres.push(genre);
			}
			event.genres = selectedGenres;
			tickets.push(event);
		}
		person.tickets = tickets;
		data.push(person);
	}
	return data;
};

type genreDataType = {
	name: string;
	values: number[];
};
type genresDataType = genreDataType[];
type placeDataType = {
	name: string;
	values: number[];
};
type placesDataType = placeDataType[];
type monthDataType = {
	name: string;
	values: number[];
};
type monthsDataType = monthDataType[];

export const normalizeData = (data: dataType): normalizedDataType => {
	const normalizedData: normalizedDataType = [];
	for (let i = 0; i < data.length; i++) {
		//foreach person
		const person = data[i];
		const personData = [];
		const importData = [];
		const genresData: genresDataType = [];
		for (let k = 0; k < genres.length; k++) {
			genresData.push({
				name: genres[k].name,
				values: [],
			});
		}
		const typeData = [];
		const placesData: placesDataType = [];
		for (let k = 0; k < places.length; k++) {
			placesData.push({
				name: places[k].name,
				values: [],
			});
		}
		const priceData = [];
		const monthData: monthsDataType = [];
		for (let k = 0; k < month.length; k++) {
			monthData.push({
				name: month[k].name,
				values: [],
			});
		}
		for (let j = 0; j < person.tickets.length; j++) {
			//foreach ticket
			const event = person.tickets[j];
			importData.push(event._import ? 100 : 0);
			for (let k = 0; k < genresData.length; k++) {
				// if we found genre name in ticket - add 100 for this genre else add 0
				if (
					event.genres.find(
						(eventGenre) => eventGenre.name === genresData[k].name
					)
				) {
					genresData[k].values.push(100);
				} else {
					genresData[k].values.push(0);
				}
			}
			typeData.push(event.type === "open" ? 100 : 0);
			const placeIndex = placesData.findIndex(
				(placeData) => placeData.name === event.place.name
			);
			placesData[placeIndex].values.push(100);
			placesData.forEach((placeData, index) => {
				if (index !== placeIndex) placeData.values.push(0);
			});
			priceData.push(
				event.price === "poor" ? 0 : event.price === "mid" ? 50 : 100
			);
			const monthIndex = monthData.findIndex(
				(monthData) => monthData.name === event.month.name
			);
			monthData[monthIndex].values.push(100);
			monthData.forEach((monthData, index) => {
				if (index !== monthIndex) monthData.values.push(0);
			});
		}
		//import index: 0
		personData.push(findMid(importData));
		//genres indexes: 1-10
		genresData.forEach((genre) => {
			personData.push(findMid(genre.values));
		});
		//type index: 11
		personData.push(findMid(typeData));
		//places indexes: 12 - 32
		placesData.forEach((place) => {
			personData.push(findMid(place.values));
		});
		//price index: 33
		personData.push(findMid(priceData));
		//months index: 34 - 45
		monthData.forEach((month) => {
			personData.push(findMid(month.values));
		});
		normalizedData.push(personData);
	}
	return normalizedData;
};

function findMid(a: number[]): number {
	let sum = 0;
	a.forEach((n) => (sum += n));
	return Math.round(sum / a.length);
}

function r(min: number, max: number): number {
	max = max - 1;
	return Math.round(min + Math.random() * (max - min));
}
