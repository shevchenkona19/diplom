import Sequelize from "sequelize/types/lib/sequelize";
import { User, UserDefinition } from "./User";
import { Event, EventDefinition } from "./Event";
import { Ticket, TicketDefinition } from "./Ticket";
import { View, ViewDefinition } from "./Views";

export default (sequelize: Sequelize) => {
	User.init(UserDefinition, {
		tableName: "users",
		sequelize,
	});
	Event.init(EventDefinition, {
		tableName: "events",
		sequelize,
	});
	Ticket.init(TicketDefinition, {
		tableName: "tickets",
		sequelize,
	});
	View.init(ViewDefinition, {
		tableName: "views",
		sequelize,
	});

	User.hasMany(Ticket, {
		sourceKey: "id",
		foreignKey: "userId",
		as: "tickets",
	});
	Event.hasMany(Ticket, { foreignKey: "eventId", as: "tickets" });
	Ticket.belongsTo(User, { targetKey: "id" });
	Ticket.belongsTo(Event, { targetKey: "id" });

	return sequelize;
};
