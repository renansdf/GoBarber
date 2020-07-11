import 'reflect-metadata';
import ShowProfileService from './ShowProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepo);
  });

  it('should be able to show a profile.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('jonh@doe.com');
  });

  it('should not be able to show a profile from non existing user.', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user',
    })).rejects.toBeInstanceOf(AppError);
  });

});
