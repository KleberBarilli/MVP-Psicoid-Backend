-- CreateTable
CREATE TABLE "GuestPacient" (
    "id" UUID NOT NULL,
    "psychologistId" UUID,
    "contactId" UUID,
    "name" TEXT NOT NULL,

    CONSTRAINT "GuestPacient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestPacient" ADD CONSTRAINT "GuestPacient_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestPacient" ADD CONSTRAINT "GuestPacient_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "psychologists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
