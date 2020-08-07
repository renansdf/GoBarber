"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _CreateAppointmentsService = _interopRequireDefault(require("./CreateAppointmentsService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeAppointmentRepo;
let createAppointment;
let notificationsRepository;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepo = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    notificationsRepository = new _FakeNotificationsRepository.default();
    createAppointment = new _CreateAppointmentsService.default(fakeAppointmentRepo, notificationsRepository, fakeCacheProvider);
  });
  it('should be able to create an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user',
      date: new Date(2020, 4, 11, 12)
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not be able to create two appointments with the same date and time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 4, 11, 12);
    await createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: appointmentDate
    });
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: appointmentDate
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 10, 11)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with oneself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'user-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 11, 12)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 11, 7)
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 11, 18)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});