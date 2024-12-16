import { AppDataSource } from "../config/data-source";
import ITurn from "../interfaces/ITurn";
import { searchUserById } from "./userService";
import { Appointment } from "../entities/Appointment";
import AppointmentDto from "../dtos/AppointmentDto";

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

let showAppointments = async (): Promise<Appointment[]> => {
  const appointments = await AppDataSource.getRepository(Appointment).find({
    order: {
      date: "DESC",
      time: "DESC",
    },
    relations: { userId: true },
  });

  return appointments;
};

let getAppointmentById = async (id: number): Promise<Appointment | null> => {
  const turn = await AppDataSource.getRepository(Appointment).findOne({
    where: { id },
    relations: { userId: true },
  });
  return turn;
};

let createAppointment = async (appointmentData: AppointmentDto) => {
  if (
    appointmentData.date === undefined ||
    appointmentData.time === undefined ||
    appointmentData.userId === undefined
  ) {
    throw new Error("Missing parameters");
  }

  if ((await searchUserById(appointmentData.userId.id)) === null) {
    throw new Error("User not found");
  }

  const newAppointment = await AppDataSource.getRepository(Appointment).create(
    appointmentData
  );
  const result = await AppDataSource.getRepository(Appointment).save(
    newAppointment
  );

  return newAppointment;
};

async function deleteAppointment(id: number): Promise<Appointment | undefined> {
  const appointmentRepository = AppDataSource.getRepository(Appointment);
  const appointment = await appointmentRepository.findOneBy({ id });
  if (appointment) {
    appointment.status = "cancelled";
    await appointmentRepository.save(appointment);
    //return appointment
  } else {
    return undefined;
  }
}

async function searchAppointmentsByUserId(id: number): Promise<Appointment[]> {
  const appointments = await AppDataSource.getRepository(Appointment).find({
    where: { userId: { id: id } },
    relations: ["userId"],
  });

  return appointments;
}

export {
  showAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointment,
  searchAppointmentsByUserId,
};
