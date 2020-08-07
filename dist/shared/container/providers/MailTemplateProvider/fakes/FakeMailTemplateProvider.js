"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailTemplateProvider {
  async parse() {
    return 'Fake Email Template';
  }

}

var _default = FakeMailTemplateProvider;
exports.default = _default;