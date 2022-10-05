/*
  Warnings:

  - You are about to drop the column `types` on the `psychologists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "types";

-- DropEnum
DROP TYPE "PsychologistType";
