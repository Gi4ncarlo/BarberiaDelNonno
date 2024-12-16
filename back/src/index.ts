// interface User {
//     id: number;
//     name: string;
// }


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

import server from './server';

import "reflect-metadata"

import { AppDataSource } from './config/data-source';

import {PORT} from './config/envs';

AppDataSource.initialize().then(() => {
    server.listen(PORT, () => {
        console.log(`server on port ${PORT}`)
    })
}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})


