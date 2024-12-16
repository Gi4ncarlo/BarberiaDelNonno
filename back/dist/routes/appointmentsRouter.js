"use strict";
/*
GET
/turns ==> obtener todos los turns
/turns/:id ==> obtener un turn por id

POST
/turns/schedule ==> crear un turno

PUT
/turns/cancel ==> cancelar un turno
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", appointmentController_1.getAllAppointment);
appointmentsRouter.get("/:id", appointmentController_1.searchAppointmentById);
appointmentsRouter.get("/userAppointments/:id", appointmentController_1.getAppointmentsByUserId);
appointmentsRouter.post("/schedule", appointmentController_1.registerAppointment);
appointmentsRouter.put("/cancel/:id", appointmentController_1.cancelAppointment);
exports.default = appointmentsRouter;
