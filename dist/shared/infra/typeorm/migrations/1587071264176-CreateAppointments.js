"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1587071264176 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'provider',
        type: 'varchar'
      }, {
        name: 'date',
        type: 'timestamp with time zone'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'Now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'Now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateAppointments1587071264176;