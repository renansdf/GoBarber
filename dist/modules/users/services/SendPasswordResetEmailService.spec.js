"use strict";

require("reflect-metadata");

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProviders/fakes/FakeMailProvider"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepo;
let fakeMailProvider;
let fakeUserTokensRepo;
let sendForgotPassword;
describe('SendPasswordResetEmail', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepo = new _FakeUserTokensRepository.default();
    sendForgotPassword = new _SendForgotPasswordEmailService.default(fakeUsersRepo, fakeMailProvider, fakeUserTokensRepo);
  });
  it('should be able to recover the password using and email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');
    await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });
    await sendForgotPassword.execute({
      email: 'jonh@doe.com'
    });
    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover the password from non existing user', async () => {
    await expect(sendForgotPassword.execute({
      email: 'jonh@doe.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to generate a token when recovering the password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepo, 'generate');
    const user = await fakeUsersRepo.create({
      name: 'John Doe',
      email: 'jonh@doe.com',
      password: '123456'
    });
    await sendForgotPassword.execute({
      email: 'jonh@doe.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});