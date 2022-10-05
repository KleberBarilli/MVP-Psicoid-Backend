/*
  Warnings:

  - You are about to drop the `companys` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "companys" DROP CONSTRAINT "companys_address_id_fkey";

-- DropForeignKey
ALTER TABLE "companys" DROP CONSTRAINT "companys_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "psychologists" DROP CONSTRAINT "psychologists_company_id_fkey";

-- AlterTable
ALTER TABLE "individual_identities" ADD COLUMN     "gender" "Gender";

-- DropTable
DROP TABLE "companys";
