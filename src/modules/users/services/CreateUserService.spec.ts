import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUsersService;

describe('CreateUser', () => {

  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);
  });

  it('should be able to create an user', async () => {
    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with duplicated email', async () => {
    await createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await expect(createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
});
