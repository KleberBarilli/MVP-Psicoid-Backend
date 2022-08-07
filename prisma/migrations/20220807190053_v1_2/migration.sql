/*
  Warnings:

  - You are about to drop the column `psychologistId` on the `companys` table. All the data in the column will be lost.
  - The `company_id` column on the `psychologists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "companys" DROP CONSTRAINT "companys_psychologistId_fkey";

-- AlterTable
ALTER TABLE "companys" DROP COLUMN "psychologistId";

-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "company_id",
ADD COLUMN     "company_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_company_id_key" ON "psychologists"("company_id");

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
