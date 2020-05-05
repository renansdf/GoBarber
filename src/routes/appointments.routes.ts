import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from "../services/CreateAppointmentsService";
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentservice = new CreateAppointmentsService();
  const appointment = await appointmentservice.execute({ provider_id, date: parsedDate });

  return response.json(appointment);
});

export default appointmentsRouter;
