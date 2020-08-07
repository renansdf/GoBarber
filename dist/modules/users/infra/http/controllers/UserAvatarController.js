"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async update(request, response) {
    const updateAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;