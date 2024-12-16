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
exports.loginUser = exports.registerUser = exports.getUserByID = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const credentialService_1 = require("../services/credentialService");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.showUsers)();
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send("Invalid user ID");
    }
    const user = yield (0, userService_1.searchUserById)(parseInt(id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json(user);
});
exports.getUserByID = getUserByID;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser = yield (0, userService_1.createUser)({
            name,
            email,
            birthdate,
            nDni,
            username,
            password,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const isValidated = yield (0, credentialService_1.checkCredentials)(username, password);
        if (isValidated) {
            const result = yield (0, userService_1.searchUserByUsername)(username);
            res.status(200).send({ login: true, user: result });
        }
        else {
            res.status(400).send("Wrong password or user");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.loginUser = loginUser;
