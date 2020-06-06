import { Model, DataTypes } from "sequelize";

export class View extends Model {
	public id!: number;
	public eventId!: number;
	public userId!: number;
}

export const ViewDefinition = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
};
