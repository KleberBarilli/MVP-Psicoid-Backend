-- DropForeignKey
ALTER TABLE "pacients" DROP CONSTRAINT "pacients_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "psychologists" DROP CONSTRAINT "psychologists_credential_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pacient_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_psychologist_id_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "deleted_at" TIMESTAMPTZ;

-- CreateTable
CREATE TABLE "likes" (
    "review_id" UUID NOT NULL,
    "pacient_id" UUID NOT NULL,
    "liked_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("review_id","pacient_id")
);

-- AddForeignKey
ALTER TABLE "pacients" ADD CONSTRAINT "pacients_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_pacient_id_fkey" FOREIGN KEY ("pacient_id") REFERENCES "pacients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_pacient_id_fkey" FOREIGN KEY ("pacient_id") REFERENCES "pacients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
