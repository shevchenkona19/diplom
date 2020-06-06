import {Association, DataTypes, Model} from "sequelize";
import {User} from "./User";
import {Event} from "./Event";

export class Ticket extends Model {
    public id!: number;
    public price!: number;
    public eventId!: number;
    public userId!: number;

    public static associations: {
        users: Association<Ticket, User>,
        events: Association<Ticket, Event>
    }
}

export const TicketDefinition = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
};
