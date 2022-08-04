/*
  Warnings:

  - You are about to drop the column `celular` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "celular",
DROP COLUMN "telefone",
ADD COLUMN     "cell_phone" TEXT,
ADD COLUMN     "telephone" TEXT;
