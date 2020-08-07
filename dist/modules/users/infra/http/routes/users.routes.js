"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default);
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default();
const usersRouter = (0, _express.Router)();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.patch('/avatar', upload.single('avatar'), _ensureAuthenticated.default, userAvatarController.update);
var _default = usersRouter;
exports.default = _default;