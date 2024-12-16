"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credentials_1 = require("../entities/Credentials");
const Appointment_1 = require("../entities/Appointment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Host8080",
    database: "barberdatabase",
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Credentials_1.Credentials, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
});
