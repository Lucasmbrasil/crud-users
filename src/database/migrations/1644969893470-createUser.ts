import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1644969893470 implements MigrationInterface {
    name = 'createUser1644969893470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "telefone" character varying NOT NULL, "cpf" character varying NOT NULL, "cep" character varying NOT NULL, "logradouro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying NOT NULL, CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
