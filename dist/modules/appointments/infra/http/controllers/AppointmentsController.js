"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentsService = _interopRequireDefault(require("../../../services/CreateAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_id,
      date
    } = request.body;

    const appointmentservice = _tsyringe.container.resolve(_CreateAppointmentsService.default);

    const appointment = await appointmentservice.execute({
      provider_id,
      user_id,
      date: date
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsController;