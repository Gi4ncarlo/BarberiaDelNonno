import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Credentials {
    @PrimaryGeneratedColumn()
    id : number

    @Column(
        {
            length : 50,
        }
    )
    username : string

    @Column(
        {
            length : 50,
        }
    )
    password : string

    @OneToOne(() => User , (user) => user.credentials)
    user : User
 
}