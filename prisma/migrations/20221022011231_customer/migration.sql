/*
  Warnings:

  - The values [PACIENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `pacient_id` on the `appointments` table. All the data in the column will be lost.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pacient_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `pacient_id` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `pacient_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `_PacientToPsychologist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guests_pacients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pacients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('BACK_OFFICE', 'CUSTOMER', 'PSYCHOLOGIST');
ALTER TABLE "credentials" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "appointments" ALTER COLUMN "created_by" TYPE "Role_new" USING ("created_by"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_PacientToPsychologist" DROP CONSTRAINT "_PacientToPsychologist_A_fkey";

-- DropForeignKey
ALTER TABLE "_PacientToPsychologist" DROP CONSTRAINT "_PacientToPsychologist_B_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pacient_id_fkey";

-- DropForeignKey
ALTER TABLE "guests_pacients" DROP CONSTRAINT "guests_pacients_contactId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_pacient_id_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_pacient_id_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pacient_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "pacient_id",
ADD COLUMN     "customer_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "pacient_id",
ADD COLUMN     "customer_id" UUID NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("review_id", "customer_id");

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "pacient_id",
ADD COLUMN     "customer_id" UUID;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "pacient_id",
ADD COLUMN     "customer_id" UUID NOT NULL;

-- DropTable
DROP TABLE "_PacientToPsychologist";

-- DropTable
DROP TABLE "guests_pacients";

-- DropTable
DROP TABLE "pacients";

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "credential_id" UUID,
    "profile_id" UUID,
    "guest_id" UUID,
    "selected_psychologist_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" UUID NOT NULL,
    "contactId" UUID,
    "name" TEXT NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToPsychologist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_credential_id_key" ON "customers"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_profile_id_key" ON "customers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_guest_id_key" ON "customers"("guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToPsychologist_AB_unique" ON "_CustomerToPsychologist"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToPsychologist_B_index" ON "_CustomerToPsychologist"("B");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPsychologist" ADD CONSTRAINT "_CustomerToPsychologist_A_fkey" FOREIGN KEY ("A") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPsychologist" ADD CONSTRAINT "_CustomerToPsychologist_B_fkey" FOREIGN KEY ("B") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
