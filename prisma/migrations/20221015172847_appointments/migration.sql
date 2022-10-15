/*
  Warnings:

  - A unique constraint covering the columns `[schedule_id]` on the table `psychologists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_id` to the `psychologists` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('ONGOING', 'CANCELED', 'COMPLETED');

-- AlterTable
ALTER TABLE "psychologists" ADD COLUMN     "schedule_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "pacient_id" UUID NOT NULL,
    "created_by" "Role" NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'ONGOING',
    "cancellation-reason" TEXT,
    "price" DOUBLE PRECISION,
    "starts_at" TIMESTAMPTZ NOT NULL,
    "ends_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" UUID NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "from" TIMESTAMPTZ NOT NULL,
    "to" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_schedule_id_key" ON "psychologists"("schedule_id");

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_pacient_id_fkey" FOREIGN KEY ("pacient_id") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
