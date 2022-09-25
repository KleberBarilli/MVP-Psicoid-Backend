/*
  Warnings:

  - The `gender` column on the `individual_identities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "individual_identities" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;
