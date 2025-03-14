import { MigrationInterface, QueryRunner } from "typeorm";

export class FillUsersTable1739908247881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user" (name, password)  VALUES('admin', 'sesa65.');`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
