import 'reflect-metadata';
import SendPasswordResetEmailService from './SendPasswordResetEmailService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProviders/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

describe('SendPasswordResetEmail', () => {
  it('should be able to recover the password using and email', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const passwordResetService = new SendPasswordResetEmailService(fakeUsersRepo, fakeMailProvider);

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await passwordResetService.execute({ email: 'jonh@doe.com' });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from non existing user', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const passwordResetService = new SendPasswordResetEmailService(fakeUsersRepo, fakeMailProvider);

    await expect(passwordResetService.execute({ email: 'jonh@doe.com' })).rejects.toBeInstanceOf(AppError);
  });

});
