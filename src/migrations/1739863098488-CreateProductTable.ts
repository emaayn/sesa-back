import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductTable1739863098488 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "product",
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
                  name: 'letter',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'number',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'category_id',
                  type: 'int4',
                  isNullable: false
                },
                {
                  name: 'description',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'product_images',
                  type: 'varchar(9999)',
                  isNullable: true
                },
                {
                  name: 'reference_images',
                  type: 'varchar(9999)',
                  isNullable: true
                },
                {
                  name: 'dimensions',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'per_square_meter',
                  type: 'varchar',
                  isNullable: false
                },
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
