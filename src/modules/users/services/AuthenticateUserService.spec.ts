import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {

  it('should be able to authenticate an user', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepo, fakeHashProvider);

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const auth = await authenticateUser.execute({
      email: 'jonh@doe.com',
      password: '123456'
    })

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepo, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'jonh@doe.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepo, fakeHashProvider);

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await expect(authenticateUser.execute({
      email: 'jonh@doe.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });

});
