"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credentials_1 = require("../entities/Credentials");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "dpg-ctg61kl6l47c73d898a0-a",
    port: 5432,
    username: "barberia_4n2h_user",
    password: "5Vu8XYflNiihPCfqnBfHfvC68YqUhorF",
    database: "barberia_4n2h",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Credentials_1.Credentials, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
});
