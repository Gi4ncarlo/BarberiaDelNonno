import express from 'express';
import router from "./routes/indexRouter";
import morgan from 'morgan';
import cors from "cors";

const server = express();

server.use(morgan("dev"));

server.use(express.json());

const allowedOrigins = ['https://barberia-del-nonno-dyis.vercel.app'];

server.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Si usas cookies o headers personalizados
}));

server.use(router);

export default server;