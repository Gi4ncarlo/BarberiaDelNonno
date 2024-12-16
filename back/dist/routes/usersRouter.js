"use strict";
/*
GET
/users ==> obtener todos los users
/users/:id ==> obtener un user por id

POST
/users/register ==> crear un user
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const userRouter = (0, express_1.Router)();
userRouter.get("/", usersController_1.getAllUsers);
userRouter.get("/:id", usersController_1.getUserByID);
userRouter.post("/register", usersController_1.registerUser);
userRouter.post("/login", usersController_1.loginUser);
exports.default = userRouter;
