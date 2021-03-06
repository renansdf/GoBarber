import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsService from "@modules/appointments/services/CreateAppointmentsService";

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const appointmentservice = container.resolve(CreateAppointmentsService);
    const appointment = await appointmentservice.execute({ provider_id, user_id, date: date });

    return response.json(appointment);
  }
}
