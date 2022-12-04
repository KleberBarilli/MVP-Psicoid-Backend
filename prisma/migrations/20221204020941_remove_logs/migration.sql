/*
  Warnings:

  - You are about to drop the column `cancellation-reason` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_psychologist_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "cancellation-reason",
ADD COLUMN     "cancellation_reason" TEXT;

-- DropTable
DROP TABLE "logs";
