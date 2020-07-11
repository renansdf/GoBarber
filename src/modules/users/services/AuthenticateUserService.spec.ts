import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUsersService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepo, fakeHashProvider);
  });

  it('should be able to authenticate an user', async () => {
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
    await expect(authenticateUser.execute({
      email: 'jonh@doe.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
