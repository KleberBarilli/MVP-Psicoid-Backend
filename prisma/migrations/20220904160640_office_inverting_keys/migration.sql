/*
  Warnings:

  - You are about to drop the column `psychologist_id` on the `offices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[office_id]` on the table `psychologists` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "offices" DROP CONSTRAINT "offices_psychologist_id_fkey";

-- DropIndex
DROP INDEX "offices_psychologist_id_key";

-- AlterTable
ALTER TABLE "offices" DROP COLUMN "psychologist_id";

-- AlterTable
ALTER TABLE "psychologists" ADD COLUMN     "office_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_office_id_key" ON "psychologists"("office_id");

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
