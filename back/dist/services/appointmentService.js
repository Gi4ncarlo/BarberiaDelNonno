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
exports.createAppointment = exports.getAppointmentById = exports.showAppointments = void 0;
exports.deleteAppointment = deleteAppointment;
exports.searchAppointmentsByUserId = searchAppointmentsByUserId;
const data_source_1 = require("../config/data-source");
const userService_1 = require("./userService");
const Appointment_1 = require("../entities/Appointment");
// let appointments: ITurn[] = [
//   {
//     id: 1,
//     date: new Date(),
//     time: "10:00",
//     userId: 1,
//     status: "pending",
//   },
//   {
//     id: 2,
//     date: new Date(),
//     time: "11:00",
//     userId: 2,
//     status: "pending",
//   },
// ];
let showAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).find({
        order: {
            date: "DESC",
            time: "DESC",
        },
        relations: { userId: true },
    });
    return appointments;
});
exports.showAppointments = showAppointments;
let getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const turn = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).findOne({
        where: { id },
        relations: { userId: true },
    });
    return turn;
});
exports.getAppointmentById = getAppointmentById;
let createAppointment = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    if (appointmentData.date === undefined ||
        appointmentData.time === undefined ||
        appointmentData.userId === undefined) {
        throw new Error("Missing parameters");
    }
    if ((yield (0, userService_1.searchUserById)(appointmentData.userId.id)) === null) {
        throw new Error("User not found");
    }
    const newAppointment = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).create(appointmentData);
    const result = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).save(newAppointment);
    return newAppointment;
});
exports.createAppointment = createAppointment;
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentRepository = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
        const appointment = yield appointmentRepository.findOneBy({ id });
        if (appointment) {
            appointment.status = "cancelled";
            yield appointmentRepository.save(appointment);
            //return appointment
        }
        else {
            return undefined;
        }
    });
}
function searchAppointmentsByUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointments = yield data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).find({
            where: { userId: { id: id } },
            relations: ["userId"],
        });
        return appointments;
    });
}
