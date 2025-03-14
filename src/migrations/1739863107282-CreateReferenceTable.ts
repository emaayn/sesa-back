import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReferenceTable1739863107282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "reference",
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
                  name: 'description',
                  type: 'varchar',
                  isNullable: true
                },
                {
                  name: 'images',
                  type: 'varchar(9999)',
                  isNullable: true
                },
                {
                  name: 'date',
                  type: 'date',
                  isNullable: false
                }
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reference"`);
    }

}
