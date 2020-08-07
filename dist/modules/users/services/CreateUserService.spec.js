"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUsersService = _interopRequireDefault(require("./CreateUsersService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeUsersRepo;
let fakeHashProvider;
let createUsersService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUsersService = new _CreateUsersService.default(fakeUsersRepo, fakeHashProvider, fakeCacheProvider);
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
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});