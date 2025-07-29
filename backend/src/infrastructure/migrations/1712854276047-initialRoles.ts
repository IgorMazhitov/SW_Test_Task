import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialRoles1712854276047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert Admin role
    await queryRunner.query(
      `INSERT INTO role (name, created_at) VALUES ('Admin', now())`,
    );

    // Insert User role
    await queryRunner.query(
      `INSERT INTO role (name, created_at) VALUES ('User', now())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback the insertion of Admin role
    await queryRunner.query(`DELETE FROM role WHERE name = 'Admin'`);

    // Rollback the insertion of User role
    await queryRunner.query(`DELETE FROM role WHERE name = 'User'`);
  }
}
