/*
  Warnings:

  - The values [CLIENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_ClientToPsychologist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('PACIENT', 'PSYCHOLOGIST');
ALTER TABLE "credentials" ALTER COLUMN "roles" TYPE "Role_new"[] USING ("roles"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_ClientToPsychologist" DROP CONSTRAINT "_ClientToPsychologist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientToPsychologist" DROP CONSTRAINT "_ClientToPsychologist_B_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_individual_identity_id_fkey";

-- DropTable
DROP TABLE "_ClientToPsychologist";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "pacients" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "individual_identity_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pacients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PacientToPsychologist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pacients_credential_id_key" ON "pacients"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "pacients_individual_identity_id_key" ON "pacients"("individual_identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PacientToPsychologist_AB_unique" ON "_PacientToPsychologist"("A", "B");

-- CreateIndex
CREATE INDEX "_PacientToPsychologist_B_index" ON "_PacientToPsychologist"("B");

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_individual_identity_id_fkey" FOREIGN KEY ("individual_identity_id") REFERENCES "individual_identities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacientToPsychologist" ADD CONSTRAINT "_PacientToPsychologist_A_fkey" FOREIGN KEY ("A") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PacientToPsychologist" ADD CONSTRAINT "_PacientToPsychologist_B_fkey" FOREIGN KEY ("B") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
