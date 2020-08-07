"use strict";

require("reflect-metadata");

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepo;
let fakeUserTokensRepo;
let fakeHashProvider;
let resetPassword;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    fakeUserTokensRepo = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepo, fakeUserTokensRepo, fakeHashProvider);
  });
  it('should be able to reset a password using the token and new password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepo.generate(user.id);
    await resetPassword.execute({
      token,
      password: '123123'
    });
    const updatedUser = await fakeUsersRepo.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123123');
  });
  it('Should not be able to reset a password with non existent token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existent',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should not be able to reset a password with non existent user', async () => {
    const {
      token
    } = await fakeUserTokensRepo.generate('non-existent-user');
    await expect(resetPassword.execute({
      token: token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset a password using an expired token', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepo.generate(user.id);
    await expect(resetPassword.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});