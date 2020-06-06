const names = [
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

const eventNames = [
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
const _import = [true, false];

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
//index: 11
const types = ["open", "closed"];

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
	{ name: 'НСК "Олімпійський" ', index: 31 },
];

//index: 33
const price = ["poor", "mid", "rich"];

const month = [
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

export const generateClusterData = (quantity) => {
	const data = [];
	for (let i = 0; i < quantity; i++) {
		const person = {
			name: names[r(0, names.length)],
			tickets: [],
		};
		const tickets = [];
		for (let j = 0; j < r(1, 200); j++) {
			const event = {
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
				let genre;
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

function r(min, max) {
	max = max - 1;
	return Math.round(min + Math.random() * (max - min));
}
