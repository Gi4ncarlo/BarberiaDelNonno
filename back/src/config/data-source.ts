import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Host8080",
    database: "barberdatabase",
   // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Credentials, Appointment],
    subscribers: [],
    migrations: [],
})