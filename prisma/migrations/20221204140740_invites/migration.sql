/*
  Warnings:

  - The primary key for the `closed_appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `closed_appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "closed_appointments" DROP CONSTRAINT "closed_appointments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "closed_appointments_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "invites" (
    "id" SERIAL NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "token" TEXT,
    "email" UUID NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "accepted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
