/*
  Warnings:

  - Made the column `gender` on table `individual_identities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "individual_identities" ALTER COLUMN "gender" SET NOT NULL;

-- AlterTable
ALTER TABLE "psychologists" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNDER_REVIEW';

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "pacient_id" UUID NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_pacient_id_fkey" FOREIGN KEY ("pacient_id") REFERENCES "pacients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
