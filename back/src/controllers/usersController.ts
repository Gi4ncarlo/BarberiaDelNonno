import { Request, Response } from "express";
import { createUser, searchUserById, showUsers, searchUserByUsername } from "../services/userService";
import { checkCredentials } from "../services/credentialService";
import { User } from "../entities/User";
import UserDto from "../dtos/UserDto";


export const getAllUsers = async (req: Request, res: Response) => {
  const users: User[] = await showUsers();
  res.status(200).json(users);
};

export const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return res.status(400).send("Invalid user ID");
  }

  const user: User | null = await searchUserById(parseInt(id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, username, password } = req.body;

  try {
    const newUser: User = await createUser({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const isValidated = await checkCredentials(username, password);

    if (isValidated) {
      const result = await searchUserByUsername(username);
      res.status(200).send({ login: true, user: result });
    } else {
      res.status(400).send("Wrong password or user");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
