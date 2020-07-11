import 'reflect-metadata';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepo: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepo, fakeStorageProvider);
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar with non existing user', async () => {
    await expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete current avatar when updating to new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg');
  });

});
