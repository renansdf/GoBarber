"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;

    const monthAvailability = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const availability = await monthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = AppointmentsController;