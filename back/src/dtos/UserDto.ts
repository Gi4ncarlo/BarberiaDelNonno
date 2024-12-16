import { Credentials } from "../entities/Credentials"

interface User {
    name : string,
    email : string,
    birthdate : Date,
    nDni : number,
    username : string,
    password : string,
    //credentialsId: Credentials;
}

export default User