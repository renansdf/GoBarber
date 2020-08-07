"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordsRouter = (0, _express.Router)();
const resetPasswordController = new _ResetPasswordController.default();
const forgotPasswordController = new _ForgotPasswordController.default();
passwordsRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
}), resetPasswordController.create);
passwordsRouter.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required()
  }
}), forgotPasswordController.create);
var _default = passwordsRouter;
exports.default = _default;