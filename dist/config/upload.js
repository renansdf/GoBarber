"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filesPath = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  tmpFolder: filesPath,
  uploadsFolder: _path.default.resolve(filesPath, 'uploads'),
  storage: _multer.default.diskStorage({
    destination: filesPath,

    filename(request, file, callback) {
      const filehash = _crypto.default.randomBytes(10).toString('HEX');

      const filename = `${filehash}-${file.originalname}`;
      return callback(null, filename);
    }

  })
};
exports.default = _default;