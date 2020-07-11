import 'reflect-metadata';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProviders/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepo: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepo: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordEmailService;

describe('SendPasswordResetEmail', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepo = new FakeUserTokensRepository();
    sendForgotPassword = new SendForgotPasswordEmailService(fakeUsersRepo, fakeMailProvider, fakeUserTokensRepo);
  });

  it('should be able to recover the password using and email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await sendForgotPassword.execute({ email: 'jonh@doe.com' });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from non existing user', async () => {
    await expect(sendForgotPassword.execute({ email: 'jonh@doe.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a token when recovering the password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepo, 'generate');

    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await sendForgotPassword.execute({ email: 'jonh@doe.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

});
