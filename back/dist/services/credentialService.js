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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredentials = exports.createCredentials = void 0;
const Credentials_1 = require("../entities/Credentials");
const data_source_1 = require("../config/data-source");
// let credentials : ICredential = {
//     id : 1,
//     username : 'pepe',
//     password : 'pepe'
// }
let createCredentials = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = data_source_1.AppDataSource.getRepository(Credentials_1.Credentials).create(credentialData);
    yield data_source_1.AppDataSource.getRepository(Credentials_1.Credentials).save(credential); // Guarda las credenciales
    return credential;
});
exports.createCredentials = createCredentials;
let checkCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // const {username, password} = credentials;
    const foundCredential = yield data_source_1.AppDataSource.getRepository(Credentials_1.Credentials).findOne({
        where: { username }
    });
    if ((foundCredential === null || foundCredential === void 0 ? void 0 : foundCredential.password) === password)
        return foundCredential.id;
    else
        return 0;
});
exports.checkCredentials = checkCredentials;
