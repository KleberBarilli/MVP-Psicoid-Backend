/*
  Warnings:

  - You are about to drop the column `company_id` on the `psychologists` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "psychologists_company_id_key";

-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "company_id";
