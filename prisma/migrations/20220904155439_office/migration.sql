-- CreateTable
CREATE TABLE "offices" (
    "id" UUID NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "contact_id" UUID,
    "address_id" UUID NOT NULL,
    "photos" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offices_psychologist_id_key" ON "offices"("psychologist_id");

-- CreateIndex
CREATE UNIQUE INDEX "offices_contact_id_key" ON "offices"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "offices_address_id_key" ON "offices"("address_id");

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
