"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptProvider {
  async generateHash(payload) {
    return (0, _bcryptjs.hash)(payload, 8);
  }

  async compareHash(payload, hashed) {
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

var _default = BCryptProvider;
exports.default = _default;