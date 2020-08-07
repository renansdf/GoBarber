"use strict";

require("reflect-metadata");

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeUsersRepo;
let listProviders;
describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepo = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepo, fakeCacheProvider);
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
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});