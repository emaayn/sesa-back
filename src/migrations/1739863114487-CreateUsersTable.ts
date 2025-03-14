import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1739863114487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "user",
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'password',
                  type: 'varchar',
                  isNullable: false
                }
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
