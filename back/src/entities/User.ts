import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Credentials } from "./Credentials"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    email: string;

    @Column()
    birthdate: Date;

    @Column("integer")
    nDni: number;

    @OneToOne(() => Credentials, (credentials) => credentials.user, { cascade: true })
    @JoinColumn({ name: "credentialsId" }) // Especificar el nombre de la columna aquí
    credentials: Credentials;

    @OneToMany(() => Appointment, (appointment) => appointment.userId)
    appointment: Appointment[];
}

