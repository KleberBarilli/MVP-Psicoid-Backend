/*
  Warnings:

  - Made the column `office_id` on table `psychologists` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "psychologists" DROP CONSTRAINT "psychologists_office_id_fkey";

-- AlterTable
ALTER TABLE "psychologists" ALTER COLUMN "office_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "offices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
