import 'reflect-metadata';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppoitments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to list the appointments in a day from provider.', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 14, 0, 0)
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 15, 0, 0)
    });


    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 21,
    });

    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]));

  });

});
