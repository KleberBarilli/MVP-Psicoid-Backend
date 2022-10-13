/*
  Warnings:

  - You are about to drop the column `address_id` on the `individual_identities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "individual_identities" DROP CONSTRAINT "individual_identities_address_id_fkey";

-- DropIndex
DROP INDEX "individual_identities_address_id_key";

-- AlterTable
ALTER TABLE "individual_identities" DROP COLUMN "address_id";
