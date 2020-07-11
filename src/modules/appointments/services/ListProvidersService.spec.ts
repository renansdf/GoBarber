import 'reflect-metadata';
import ListProvidersService from './ListProvidersService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepo);
  });

  it('should be able to list all providers.', async () => {
    const user1 = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const user2 = await fakeUsersRepo.create({
      name: 'John tre',
      email: 'jonh@tre.com',
      password: '123456'
    });

    const loggedUser = await fakeUsersRepo.create({
      name: 'John qua',
      email: 'jonh@qua.com',
      password: '123456'
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([
      user1,
      user2
    ]);
  });

});
