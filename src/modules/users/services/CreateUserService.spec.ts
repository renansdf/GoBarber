import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with duplicated email', async () => {

    const fakeUsersRepo = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(fakeUsersRepo, fakeHashProvider);

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
