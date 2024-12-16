import { Request, Response } from "express"
import { createAppointment, getAppointmentById, showAppointments, deleteAppointment, searchAppointmentsByUserId } from "../services/appointmentService"
import { Appointment } from "../entities/Appointment"

export const getAllAppointment = async (req : Request, res : Response) => {

    const turns : Appointment[] = await showAppointments();

    if(turns){
        res.status(200).json(turns)
    }else{
        res.status(404).send("Turns not found")
    }
    
}

export const searchAppointmentById = async (req : Request, res : Response) => {

    const id = parseInt(req.params.id);

    if(isNaN(id)){
        res.status(400).send("Invalid ID")
    }

    const turn : Appointment | null = await getAppointmentById(id)

    if(turn){
        res.status(200).json(turn);
    }else{
        res.status(404).send("Turn not found")
    }

}

export const getAppointmentsByUserId = async (req : Request, res : Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const appointments: Appointment[] = await searchAppointmentsByUserId(id);

        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ message: "No se encontraron turnos para este usuario" });
        }
    } catch (error) {
        console.error('Error al buscar turnos:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const registerAppointment = async (req : Request, res : Response) => {

    const { date, time, userId } = req.body;

    console.log("date", date ) ;
    console.log("time", time );
    console.log("userId", userId );
    

    try{
       const newTurn : Appointment = await createAppointment({ date, time, userId, status : "active"});
        res.status(201).json(newTurn)

    }catch(error){
        console.log(error)
        res.status(400).send("Error creating turn")
    }

}

export const cancelAppointment = (req : Request, res : Response) => {

    const id = parseInt(req.params.id);

    try {
        if( deleteAppointment(id) !== undefined){

            res.status(200).send("Turn cancelled");
        }else{
            res.status(404).send("Turn doesnt found")
        }
      

    } catch (error) {
        
        res.status(400).send(error)
    }
   
}