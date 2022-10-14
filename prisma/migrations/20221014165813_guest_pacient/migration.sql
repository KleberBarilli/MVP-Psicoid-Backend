/*
  Warnings:

  - You are about to drop the column `psychologistId` on the `guests_pacients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guest_id]` on the table `pacients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "guests_pacients" DROP CONSTRAINT "guests_pacients_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_profile_id_fkey";

-- AlterTable
ALTER TABLE "guests_pacients" DROP COLUMN "psychologistId";

-- AlterTable
ALTER TABLE "pacients" ADD COLUMN     "guest_id" UUID,
ALTER COLUMN "credential_id" DROP NOT NULL,
ALTER COLUMN "profile_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pacients_guest_id_key" ON "pacients"("guest_id");

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests_pacients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
