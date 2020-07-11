import 'reflect-metadata';
import ResetPasswordService from './ResetPasswordService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let fakeUserTokensRepo: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeUserTokensRepo = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(fakeUsersRepo, fakeUserTokensRepo, fakeHashProvider);
  });

  it('should be able to reset a password using the token and new password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepo.generate(user.id);

    await resetPassword.execute({ token, password: '123123' });

    const updatedUser = await fakeUsersRepo.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('Should not be able to reset a password with non existent token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existent',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset a password with non existent user', async () => {
    const { token } = await fakeUserTokensRepo.generate('non-existent-user');

    await expect(resetPassword.execute({
      token: token,
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset a password using an expired token', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date;
      return customDate.setHours(customDate.getHours() + 3);
    });

    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepo.generate(user.id);

    await expect(
      resetPassword.execute({ token, password: '123123' })
    ).rejects.toBeInstanceOf(AppError);

  });

});
