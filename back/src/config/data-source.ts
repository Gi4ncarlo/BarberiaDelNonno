import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgresql://barberia_4n2h_user:5Vu8XYflNiihPCfqnBfHfvC68YqUhorF@dpg-ctg61kl6l47c73d898a0-a.oregon-postgres.render.com/barberia_4n2h",  // URL completa de Render
    synchronize: true,
    logging: false,
    entities: [User, Credentials, Appointment],
    subscribers: [],
    migrations: [],
    ssl: { rejectUnauthorized: false },
});
