import 'reflect-metadata';
import UpdateProfileService from './UpdateProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepo, fakeHashProvider);
  });

  it('should be able to update user name, email and password.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com'
    });

    expect(user.name).toBe('John Trê');
    expect(user.email).toBe('john@tre.com');
  });

  it('should not be able to update a profile of non existent user.', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'John Trê',
      email: 'john@tre.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to email of another user.', async () => {
    await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    const user = await fakeUsersRepo.create({
      name: 'teste',
      email: 'tes@te.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jonh@doe.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      old_password: '123456',
      password: '123123',
    });

    expect(user.password).toBe('123123');
  });

  it('should not be able to update password without old one.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without correct old password.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@tre.com',
      old_password: 'incorrect-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
