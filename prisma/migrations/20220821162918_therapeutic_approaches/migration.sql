-- AlterTable
ALTER TABLE "pacients" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "psychologists" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "resume" TEXT;

-- CreateTable
CREATE TABLE "therapeutic_approaches" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "therapeutic_approaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PsychologistToTherapeuticApproache" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PsychologistToTherapeuticApproache_AB_unique" ON "_PsychologistToTherapeuticApproache"("A", "B");

-- CreateIndex
CREATE INDEX "_PsychologistToTherapeuticApproache_B_index" ON "_PsychologistToTherapeuticApproache"("B");

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" ADD CONSTRAINT "_PsychologistToTherapeuticApproache_A_fkey" FOREIGN KEY ("A") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" ADD CONSTRAINT "_PsychologistToTherapeuticApproache_B_fkey" FOREIGN KEY ("B") REFERENCES "therapeutic_approaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
