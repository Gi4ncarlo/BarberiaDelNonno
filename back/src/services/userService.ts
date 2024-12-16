import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import IUser from '../interfaces/IUser';
import UserDto from '../dtos/UserDto';
import { createCredentials } from './credentialService';
import CredendialDto from '../dtos/CredentialDto';
import { Credentials } from '../entities/Credentials';

import sendEmailRegister from '../helpers/sendEmailRegister';


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


let showUsers = async () : Promise <User[]> => {
    const users = await AppDataSource.getRepository(User).find();
 
    return users;
}

let searchUserById = async(id : number) :Promise <User | null>=> {
const user = await AppDataSource.getRepository(User).findOne({
    where : {id},
    relations : {appointment : true}
});
    return user;
}

let searchUserByUsername = async(username : string) :Promise <User | undefined> => {

    const result = await AppDataSource.getRepository(Credentials).findOne({
        where : {username},
        relations : {user : true}
    })

    const user = result?.user

    return user;

}

let createUser = async (userData: UserDto): Promise<User> => {
    const { name, email, birthdate, nDni, username, password } = userData;

    // Crear nuevas credenciales
    const newCredentials: Credentials = await createCredentials({ username, password });

    // Crear un nuevo usuario con las credenciales asociadas
    const newUser: User = AppDataSource.getRepository(User).create({
        name,
        email,
        birthdate,
        nDni,
        credentials: newCredentials 
    });

    
    //LLAMO AL SERVICIO DE BREVO 
    await sendEmailRegister(email, name, username, password)
    
    
    await AppDataSource.getRepository(User).save(newUser);
    return newUser;
}

export {showUsers, searchUserById, createUser, searchUserByUsername}