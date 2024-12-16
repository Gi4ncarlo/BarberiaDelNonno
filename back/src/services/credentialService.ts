import  ICredential  from '../interfaces/ICredential';
import { Credentials } from '../entities/Credentials'
import { AppDataSource } from '../config/data-source';
import CredentialDto from '../dtos/CredentialDto';


// let credentials : ICredential = {
//     id : 1,
//     username : 'pepe',
//     password : 'pepe'
// }

let createCredentials = async (credentialData: CredentialDto): Promise<Credentials> => {
    const credential = AppDataSource.getRepository(Credentials).create(credentialData);
    await AppDataSource.getRepository(Credentials).save(credential); // Guarda las credenciales
    return credential;
}


let checkCredentials = async (username : string, password : string) : Promise<number> =>{

   // const {username, password} = credentials;
    
    const foundCredential : Credentials | null = await AppDataSource.getRepository(Credentials).findOne({
        where : { username }
    })
    if(foundCredential?.password === password) return foundCredential.id
        else return 0;

}

export { createCredentials, checkCredentials }