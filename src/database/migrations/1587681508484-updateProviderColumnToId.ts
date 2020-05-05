import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class updateProviderColumnToId1587681508484 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn('appointments', new TableColumn({
      type: 'uuid',
      name: 'provider_id',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }));
  }


}
