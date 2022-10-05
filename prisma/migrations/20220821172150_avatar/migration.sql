/*
  Warnings:

  - You are about to drop the column `avatar` on the `pacients` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `psychologists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "individual_identities" ADD COLUMN     "avatar_url" TEXT;

-- AlterTable
ALTER TABLE "pacients" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "psychologists" DROP COLUMN "avatar";
