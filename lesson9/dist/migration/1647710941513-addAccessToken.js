"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccessToken1647710941513 = void 0;
class addAccessToken1647710941513 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE Token DROP COLUMN accessToken');
    }
}
exports.addAccessToken1647710941513 = addAccessToken1647710941513;
//# sourceMappingURL=1647710941513-addAccessToken.js.map