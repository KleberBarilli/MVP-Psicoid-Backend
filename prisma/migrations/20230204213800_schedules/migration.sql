/*
  Warnings:

  - You are about to drop the column `created_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `ends_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `starts_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column ` inactivated_at` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `therapeutic_approaches` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `therapeutic_approaches` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `views` table. All the data in the column will be lost.
  - You are about to drop the `_PsychologistToTherapeuticApproache` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patient_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" DROP CONSTRAINT "_PsychologistToTherapeuticApproache_A_fkey";

-- DropForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" DROP CONSTRAINT "_PsychologistToTherapeuticApproache_B_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_customer_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "customer_id",
DROP COLUMN "ends_at",
DROP COLUMN "starts_at",
ADD COLUMN     "patient_id" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "closed_appointments" ADD COLUMN     "additional_comments" TEXT,
ALTER COLUMN "cancel_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "closed_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN " inactivated_at",
ADD COLUMN     "inactivated_at" TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "last_login_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "guests" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "invites" ALTER COLUMN "accepted_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "liked_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "offices" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "psychologists" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "therapeutic_approaches" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "views" DROP COLUMN "isRead",
ADD COLUMN     "read_at" TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "_PsychologistToTherapeuticApproache";

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PsychologistToTherapeuticApproaches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "schedules_appointment_id_starts_at_ends_at_idx" ON "schedules"("appointment_id", "starts_at", "ends_at");

-- CreateIndex
CREATE UNIQUE INDEX "_PsychologistToTherapeuticApproaches_AB_unique" ON "_PsychologistToTherapeuticApproaches"("A", "B");

-- CreateIndex
CREATE INDEX "_PsychologistToTherapeuticApproaches_B_index" ON "_PsychologistToTherapeuticApproaches"("B");

-- CreateIndex
CREATE INDEX "appointments_psychologist_id_patient_id_status_idx" ON "appointments"("psychologist_id", "patient_id", "status");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproaches" ADD CONSTRAINT "_PsychologistToTherapeuticApproaches_A_fkey" FOREIGN KEY ("A") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproaches" ADD CONSTRAINT "_PsychologistToTherapeuticApproaches_B_fkey" FOREIGN KEY ("B") REFERENCES "therapeutic_approaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
