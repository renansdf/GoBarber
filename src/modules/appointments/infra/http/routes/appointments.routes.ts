import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsService from "@modules/appointments/services/CreateAppointmentsService";
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const allAppointments = await appointmentsRepository.find();

//   return response.json(allAppointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository;
  const appointmentservice = new CreateAppointmentsService(appointmentsRepository);
  const appointment = await appointmentservice.execute({ provider_id, date: parsedDate });

  return response.json(appointment);
});

export default appointmentsRouter;
