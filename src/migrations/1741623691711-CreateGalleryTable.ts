import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGalleryTable1741623691711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({
                      name: "gallery",
                      columns: [
                        {
                          name: 'id',
                          type: 'int4',
                          isPrimary: true,
                          isGenerated: true,
                          generationStrategy: 'increment',
                        },
                        {
                          name: 'title',
                          type: 'varchar',
                          isNullable: false
                        },
                        {
                          name: 'image_path',
                          type: 'varchar(9999)',
                          isNullable: true
                        },
                        {
                          name: 'description',
                          type: 'varchar',
                          isNullable: true
                        },
                        {
                          name: 'category_id',
                          type: 'int',
                          isNullable: false
                        }
                      ],
                    }),
                    false,
                  );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gallery"`);
    }

}
