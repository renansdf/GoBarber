import 'reflect-metadata';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the day availability for provider.', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 14, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 15, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 21,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]));

  });

});
