import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-ctg61kl6l47c73d898a0-a",
    port: 5432,
    username: "barberia_4n2h_user",
    password: "5Vu8XYflNiihPCfqnBfHfvC68YqUhorF",
    database: "barberia_4n2h",
   // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Credentials, Appointment],
    subscribers: [],
    migrations: [],
})