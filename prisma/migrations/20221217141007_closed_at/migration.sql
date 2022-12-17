/*
  Warnings:

  - You are about to drop the column `cancellation_reason` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `closed_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `closed_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `closed_appointments` table. All the data in the column will be lost.
  - You are about to drop the column `psychologist_id` on the `closed_appointments` table. All the data in the column will be lost.
  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "closed_appointments" DROP CONSTRAINT "closed_appointments_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "closed_appointments" DROP CONSTRAINT "closed_appointments_psychologist_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_psychologist_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "cancellation_reason";

-- AlterTable
ALTER TABLE "closed_appointments" DROP COLUMN "completed_at",
DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "psychologist_id",
ADD COLUMN     "cancel_at" TIMESTAMPTZ,
ADD COLUMN     "cancellation_reason" TEXT,
ADD COLUMN     "closed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "schedules";
