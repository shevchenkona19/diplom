import { Association, DataTypes, Model } from "sequelize";
import { Ticket } from "./Ticket";
import { User } from "./User";

export class Event extends Model {
	public id!: number;
	public name!: string;
	public description: string;
	public photoPath!: string;
	public date!: Date;
	public price!: number;
	public _import!: boolean;
	public genres!: { name: string; index: number }[];
	public type!: string;
	public place!: { name: string; index: number };
	public month!: { name: string; index: number };

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public static associations: {
		tickets: Association<Event, Ticket>;
		views: Association<Event, User>;
	};
}

export const EventDefinition = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	photoPath: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	_import: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	genres: {
		type: DataTypes.JSONB,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	place: {
		type: DataTypes.JSONB,
		allowNull: false,
	},
	month: {
		type: DataTypes.JSONB,
		allowNull: false,
	},
};
