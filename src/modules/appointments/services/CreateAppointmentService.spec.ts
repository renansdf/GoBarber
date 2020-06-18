import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentsService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {

    const fakeAppointmentRepo = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepo);

    const appointment = await createAppointment.execute({
      provider_id: '123412341',
      date: new Date()
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123412341');

  });

  it('should not be able to create two appointments with the same date and time', async () => {
    const fakeAppointmentRepo = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepo);

    const appointmentDate = new Date();

    await createAppointment.execute({
      provider_id: '123412341',
      date: appointmentDate
    });

    await expect(createAppointment.execute({
      provider_id: '123412341',
      date: appointmentDate
    })).rejects.toBeInstanceOf(AppError);
  });
});
