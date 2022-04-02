import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesUsers1645551814733 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Fathers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL
            )
        `);

        await queryRunner
            .manager.createQueryBuilder().insert()
            .into('Fathers').values({ firstName: 'Andrew', lastName: 'Milovich' })
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Fathers
            
        `);
    }
}
