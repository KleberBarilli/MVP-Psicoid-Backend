/*
  Warnings:

  - You are about to drop the column `individual_identity_id` on the `pacients` table. All the data in the column will be lost.
  - You are about to drop the column `individual_identity_id` on the `psychologists` table. All the data in the column will be lost.
  - You are about to drop the `GuestPacient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `individual_identities` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `pacients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `psychologists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `pacients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `psychologists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuestPacient" DROP CONSTRAINT "GuestPacient_contactId_fkey";

-- DropForeignKey
ALTER TABLE "GuestPacient" DROP CONSTRAINT "GuestPacient_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "individual_identities" DROP CONSTRAINT "individual_identities_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_individual_identity_id_fkey";

-- DropForeignKey
ALTER TABLE "psychologists" DROP CONSTRAINT "psychologists_individual_identity_id_fkey";

-- DropIndex
DROP INDEX "pacients_individual_identity_id_key";

-- DropIndex
DROP INDEX "psychologists_individual_identity_id_key";

-- AlterTable
ALTER TABLE "pacients" DROP COLUMN "individual_identity_id",
ADD COLUMN     "profile_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "individual_identity_id",
ADD COLUMN     "profile_id" UUID NOT NULL;

-- DropTable
DROP TABLE "GuestPacient";

-- DropTable
DROP TABLE "individual_identities";

-- CreateTable
CREATE TABLE "guests_pacients" (
    "id" UUID NOT NULL,
    "psychologistId" UUID,
    "contactId" UUID,
    "name" TEXT NOT NULL,

    CONSTRAINT "guests_pacients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "avatar_url" TEXT,
    "gender" TEXT,
    "contact_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cpf_key" ON "profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_contact_id_key" ON "profiles"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "pacients_profile_id_key" ON "pacients"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_profile_id_key" ON "psychologists"("profile_id");

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests_pacients" ADD CONSTRAINT "guests_pacients_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests_pacients" ADD CONSTRAINT "guests_pacients_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "psychologists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
