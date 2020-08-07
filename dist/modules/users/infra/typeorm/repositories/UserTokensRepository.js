"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async findByToken(token) {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    });

    if (!userToken) {
      throw new _AppError.default('Token not found');
    }

    return userToken;
  }

  async generate(user_id) {
    const userToken = this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

}

var _default = UserTokensRepository;
exports.default = _default;