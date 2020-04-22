import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from "../services/CreateAppointmentsService";
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentservice = new CreateAppointmentsService();
    const appointment = await appointmentservice.execute({ provider, date: parsedDate });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message })
  }
});

export default appointmentsRouter;
