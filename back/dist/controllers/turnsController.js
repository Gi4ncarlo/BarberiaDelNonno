"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelTurn = exports.registerTurn = exports.getAppointmentById = exports.getAllAppointment = void 0;
const getAllAppointment = (req, res) => {
    res.send("All Appointments");
};
exports.getAllAppointment = getAllAppointment;
const getAppointmentById = (req, res) => {
    res.send("appointment by ID");
};
exports.getAppointmentById = getAppointmentById;
const registerTurn = (req, res) => {
    res.send("register Appointment");
};
exports.registerTurn = registerTurn;
const cancelTurn = (req, res) => {
    res.send("cancel Appointment");
};
exports.cancelTurn = cancelTurn;
