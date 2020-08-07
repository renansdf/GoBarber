"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Notification = _interopRequireDefault(require("../../infra/typeorm/schemas/Notification"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeNotificationsRepository {
  constructor() {
    this.notificationsRepository = [];
  }

  async create({
    recipient_id,
    content
  }) {
    const notification = new _Notification.default();
    Object.assign(notification, {
      id: new _mongodb.ObjectID(),
      recipient_id,
      content
    });
    this.notificationsRepository.push(notification);
    return notification;
  }

}

var _default = FakeNotificationsRepository;
exports.default = _default;