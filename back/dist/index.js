"use strict";
// interface User {
//     id: number;
//     name: string;
// }
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const user: User = {
//     id: 1,
//     name: 'John'
// }
// console.log(user)
// //----------------------------
// const sumar = (a: number, b: number) :number => a + b;
// console.log(sumar(1, 2))
// //-------------------------------
// interface AdminUser extends User {
//     isAdmin: boolean
// }
// const admin: AdminUser = {
//     id: 1,
//     name: 'John',
//     isAdmin: true
// }
// console.log("ADMIN",admin);
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
data_source_1.AppDataSource.initialize().then(() => {
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`server on port ${envs_1.PORT}`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
