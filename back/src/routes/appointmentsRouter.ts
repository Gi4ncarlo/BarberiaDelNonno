/*
GET
/turns ==> obtener todos los turns
/turns/:id ==> obtener un turn por id

POST
/turns/schedule ==> crear un turno

PUT
/turns/cancel ==> cancelar un turno
*/ 

import { Router } from 'express';

import { getAllAppointment, searchAppointmentById, registerAppointment, cancelAppointment , getAppointmentsByUserId} from '../controllers/appointmentController';

const appointmentsRouter : Router = Router();

appointmentsRouter.get("/", getAllAppointment);

appointmentsRouter.get("/:id", searchAppointmentById);

appointmentsRouter.get("/userAppointments/:id", getAppointmentsByUserId)

appointmentsRouter.post("/schedule", registerAppointment);

appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;