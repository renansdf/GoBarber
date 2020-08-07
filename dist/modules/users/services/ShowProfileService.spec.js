"use strict";

require("reflect-metadata");

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepo;
let showProfile;
describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepo);
  });
  it('should be able to show a profile.', async () => {
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('jonh@doe.com');
  });
  it('should not be able to show a profile from non existing user.', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});