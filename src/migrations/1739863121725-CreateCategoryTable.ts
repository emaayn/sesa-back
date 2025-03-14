import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1739863121725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "category",
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name_tr',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'name_en',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'description_tr',
                  type: 'varchar',
                  isNullable: true
                },
                {
                  name: 'description_en',
                  type: 'varchar',
                  isNullable: true
                },
                {
                  name: 'vertical_image',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'horizontal_image',
                  type: 'varchar',
                  isNullable: false
                },
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
