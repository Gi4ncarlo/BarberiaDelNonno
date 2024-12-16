/*
GET
/users ==> obtener todos los users
/users/:id ==> obtener un user por id

POST
/users/register ==> crear un user
*/ 

import { Router } from 'express';

import { getAllUsers, getUserByID, registerUser, loginUser } from '../controllers/usersController';

const userRouter : Router = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserByID);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

export default userRouter;