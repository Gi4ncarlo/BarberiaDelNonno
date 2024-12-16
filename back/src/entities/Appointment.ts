import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Appointment {
@PrimaryGeneratedColumn()    
id : number

@Column()
date : Date

@Column(   {
    length : 100,
})
time : string

@ManyToOne(() => User , (user) => user.appointment)
@JoinColumn({ name: "userId" })
userId : User

@Column(   {
    length : 50,
})
status : string
}