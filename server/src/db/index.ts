import associations from "./associations";

const Sequelize = require('sequelize');

const database = process.env.DB_NAME || 'diplom';
const username = process.env.DB_USERNAME || 'nikitashevchenko';
const password = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
});

export default () => associations(sequelize);











