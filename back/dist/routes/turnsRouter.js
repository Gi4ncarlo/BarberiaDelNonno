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
const turnsController_1 = require("../controllers/turnsController");
const turnRouter = (0, express_1.Router)();
turnRouter.get("/", turnsController_1.getAllAppointment);
turnRouter.get("/appointment", turnsController_1.getAppointmentById);
turnRouter.post("/schedule", turnsController_1.registerTurn);
turnRouter.put("/cancel", turnsController_1.cancelTurn);
exports.default = turnRouter;
