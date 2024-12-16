"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserByUsername = exports.createUser = exports.searchUserById = exports.showUsers = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const credentialService_1 = require("./credentialService");
const Credentials_1 = require("../entities/Credentials");
const sendEmailRegister_1 = __importDefault(require("../helpers/sendEmailRegister"));
// let users : IUser[] = [
//     {    id : 1,
//     name : 'pepe',
//     email : 'pepe@gmail.com',
//     birthdate : new Date(),
//     nDni : 45564652,
//     credentialsId : 1},
//     {    id : 2,
//     name : 'juan',
//     email : 'juan@gmail.com',
//     birthdate : new Date(),
//     nDni : 66662552,
//     credentialsId : 2}
// ];
let showUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.AppDataSource.getRepository(User_1.User).find();
    return users;
});
exports.showUsers = showUsers;
let searchUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
        where: { id },
        relations: { appointment: true }
    });
    return user;
});
exports.searchUserById = searchUserById;
let searchUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield data_source_1.AppDataSource.getRepository(Credentials_1.Credentials).findOne({
        where: { username },
        relations: { user: true }
    });
    const user = result === null || result === void 0 ? void 0 : result.user;
    return user;
});
exports.searchUserByUsername = searchUserByUsername;
let createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = userData;
    // Crear nuevas credenciales
    const newCredentials = yield (0, credentialService_1.createCredentials)({ username, password });
    // Crear un nuevo usuario con las credenciales asociadas
    const newUser = data_source_1.AppDataSource.getRepository(User_1.User).create({
        name,
        email,
        birthdate,
        nDni,
        credentials: newCredentials
    });
    //LLAMO AL SERVICIO DE BREVO 
    yield (0, sendEmailRegister_1.default)(email, name, username, password);
    yield data_source_1.AppDataSource.getRepository(User_1.User).save(newUser);
    return newUser;
});
exports.createUser = createUser;
