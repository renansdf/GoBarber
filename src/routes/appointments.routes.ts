import { Router } from 'express';
import { parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from "../services/CreateAppointmentsService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.all();

  return response.json(allAppointments);
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const appointmentservice = new CreateAppointmentsService(appointmentsRepository);
    const appointment = appointmentservice.execute({provider, date: parsedDate});

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }
});

export default appointmentsRouter;
