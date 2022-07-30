-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('APPLE', 'EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'PSYCHOLOGIST');

-- CreateEnum
CREATE TYPE "BrazilState" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'UNDER_REVIEW', 'REPPROVED');

-- CreateEnum
CREATE TYPE "PsychologistType" AS ENUM ('ABNORMAL', 'BIO', 'SOCIAL', 'COGNITIVE', 'DEVELOPMENTAL', 'PERSONALITY', 'FORENSIC', 'INDUSTRIAL_ORGANIZATIONAL');

-- CreateTable
CREATE TABLE "credentials" (
    "id" UUID NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'EMAIL',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token_recovery" TEXT,
    "roles" "Role"[],
    "inactive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "individual_identity_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychologists" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "individual_identity_id" UUID NOT NULL,
    "company_id" TEXT,
    "types" "PsychologistType"[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "psychologists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_identities" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "contact_id" UUID,
    "address_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "individual_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL,
    "telefone" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "zip_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "BrazilState" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companys" (
    "id" UUID NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trading_name" TEXT NOT NULL,
    "contact_id" UUID,
    "address_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "psychologistId" UUID,

    CONSTRAINT "companys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClientToPsychologist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_credential_id_key" ON "clients"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_individual_identity_id_key" ON "clients"("individual_identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_credential_id_key" ON "psychologists"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_individual_identity_id_key" ON "psychologists"("individual_identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_company_id_key" ON "psychologists"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "individual_identities_cpf_key" ON "individual_identities"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "individual_identities_contact_id_key" ON "individual_identities"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "individual_identities_address_id_key" ON "individual_identities"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "companys_cnpj_key" ON "companys"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companys_contact_id_key" ON "companys"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "companys_address_id_key" ON "companys"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientToPsychologist_AB_unique" ON "_ClientToPsychologist"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientToPsychologist_B_index" ON "_ClientToPsychologist"("B");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_individual_identity_id_fkey" FOREIGN KEY ("individual_identity_id") REFERENCES "individual_identities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_individual_identity_id_fkey" FOREIGN KEY ("individual_identity_id") REFERENCES "individual_identities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual_identities" ADD CONSTRAINT "individual_identities_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individual_identities" ADD CONSTRAINT "individual_identities_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companys" ADD CONSTRAINT "companys_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "psychologists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companys" ADD CONSTRAINT "companys_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companys" ADD CONSTRAINT "companys_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToPsychologist" ADD CONSTRAINT "_ClientToPsychologist_A_fkey" FOREIGN KEY ("A") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientToPsychologist" ADD CONSTRAINT "_ClientToPsychologist_B_fkey" FOREIGN KEY ("B") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
