"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.registerAppointment = exports.getAppointmentsByUserId = exports.searchAppointmentById = exports.getAllAppointment = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turns = yield (0, appointmentService_1.showAppointments)();
    if (turns) {
        res.status(200).json(turns);
    }
    else {
        res.status(404).send("Turns not found");
    }
});
exports.getAllAppointment = getAllAppointment;
const searchAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send("Invalid ID");
    }
    const turn = yield (0, appointmentService_1.getAppointmentById)(id);
    if (turn) {
        res.status(200).json(turn);
    }
    else {
        res.status(404).send("Turn not found");
    }
});
exports.searchAppointmentById = searchAppointmentById;
const getAppointmentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }
    try {
        const appointments = yield (0, appointmentService_1.searchAppointmentsByUserId)(id);
        if (appointments.length > 0) {
            res.status(200).json(appointments);
        }
        else {
            res.status(404).json({ message: "No se encontraron turnos para este usuario" });
        }
    }
    catch (error) {
        console.error('Error al buscar turnos:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const registerAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    console.log("date", date);
    console.log("time", time);
    console.log("userId", userId);
    try {
        const newTurn = yield (0, appointmentService_1.createAppointment)({ date, time, userId, status: "active" });
        res.status(201).json(newTurn);
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Error creating turn");
    }
});
exports.registerAppointment = registerAppointment;
const cancelAppointment = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if ((0, appointmentService_1.deleteAppointment)(id) !== undefined) {
            res.status(200).send("Turn cancelled");
        }
        else {
            res.status(404).send("Turn doesnt found");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.cancelAppointment = cancelAppointment;
