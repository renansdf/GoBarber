import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAlInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAlInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}
