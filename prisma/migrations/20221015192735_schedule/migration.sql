/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `psychologists` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "psychologists" DROP CONSTRAINT "psychologists_schedule_id_fkey";

-- DropIndex
DROP INDEX "psychologists_schedule_id_key";

-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "schedule_id";

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
