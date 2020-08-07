import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAlInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAlInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {

  private appointmentRepository: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointmentRepository.find(
      appointment => isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        );
      });

    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id &&
          getDate(appointment.date) === day &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        );
      });

    return appointments;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, user_id, date });

    this.appointmentRepository.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;
