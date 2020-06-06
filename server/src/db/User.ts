import { Model, DataTypes, Association } from "sequelize";
import { Ticket } from "./Ticket";
import { Event } from "./Event";

export class User extends Model {
	public id!: number;
	public name!: string;

	public hash!: string;

	public role!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public findById: (id: number) => User;

	public static associations: {
		tickets: Association<User, Ticket>;
		views: Association<User, Event>;
	};
}

export const UserDefinition = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
	hash: {
		type: new DataTypes.STRING(),
		allowNull: false,
	},
	role: {
		type: new DataTypes.SMALLINT(),
		allowNull: false,
	},
};
