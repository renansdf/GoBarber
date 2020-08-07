"use strict";

var _tsyringe = require("tsyringe");

var _BCryptProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BCryptProvider.default);