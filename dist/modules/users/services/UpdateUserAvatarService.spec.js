"use strict";

require("reflect-metadata");

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProviders/fakes/FakeStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepo;
let fakeStorageProvider;
let updateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatarService = new _UpdateUserAvatarService.default(fakeUsersRepo, fakeStorageProvider);
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
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to delete current avatar when updating to new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
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
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});