-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('APPLE', 'EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BACK_OFFICE', 'CUSTOMER', 'PSYCHOLOGIST');

-- CreateEnum
CREATE TYPE "BrazilState" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'UNDER_REVIEW', 'REPPROVED');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('ONGOING', 'CANCELED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('WELCOME', 'CUSTOMER_ADD_PSICO', 'CREATE_APPOINTMENT', 'UPDATE_APPOINTMENT', 'CANCEL_APPOINTMENT', 'CREATE_REVIEW');

-- CreateEnum
CREATE TYPE "AppointmentCompletedBy" AS ENUM ('CUSTOMER', 'PSYCHOLOGIST', 'TIME_EXPIRED');

-- CreateTable
CREATE TABLE "credentials" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'EMAIL',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token_recovery" TEXT,
    "role" "Role" NOT NULL,
    " inactivated_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "last_login_at" TIMESTAMPTZ,
    "last_login_ip" TEXT,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "credential_id" BIGINT,
    "profile_id" BIGINT NOT NULL,
    "guest_id" BIGINT,
    "selected_psychologist_id" BIGINT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" BIGSERIAL NOT NULL,
    "contact_id" BIGINT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "psychologists" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "credential_id" BIGINT NOT NULL,
    "profile_id" BIGINT NOT NULL,
    "office_id" BIGINT NOT NULL,
    "resume" TEXT,
    "status" "Status" NOT NULL DEFAULT 'UNDER_REVIEW',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "psychologists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" BIGSERIAL NOT NULL,
    "credential_id" BIGINT NOT NULL,
    "profile_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" BIGSERIAL NOT NULL,
    "contact_id" BIGINT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "avatar_url" TEXT,
    "gender" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" BIGSERIAL NOT NULL,
    "telephone" TEXT,
    "cell_phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" BIGSERIAL NOT NULL,
    "zip_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "BrazilState" NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapeutic_approaches" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "therapeutic_approaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offices" (
    "id" BIGSERIAL NOT NULL,
    "contact_id" BIGINT,
    "address_id" BIGINT NOT NULL,
    "photos" TEXT[],
    "operating_hours" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "psychologist_id" BIGINT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "review_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "liked_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("review_id","customer_id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "psychologist_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "created_by" "Role" NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'ONGOING',
    "price" DOUBLE PRECISION,
    "starts_at" TIMESTAMPTZ NOT NULL,
    "ends_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "closed_appointments" (
    "id" BIGSERIAL NOT NULL,
    "appointment_id" BIGINT NOT NULL,
    "closed_by" "AppointmentCompletedBy" NOT NULL,
    "cancellation_reason" TEXT,
    "cancel_at" TIMESTAMPTZ,
    "closed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "closed_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" BIGSERIAL NOT NULL,
    "integration_id" UUID NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "data" JSON NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" BIGSERIAL NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notification_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "psychologist_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invites" (
    "id" BIGSERIAL NOT NULL,
    "psychologist_id" BIGINT NOT NULL,
    "token" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "accepted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToPsychologist" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "_PsychologistToTherapeuticApproache" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_integration_id_key" ON "credentials"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE INDEX "credentials_integration_id_email_idx" ON "credentials"("integration_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_integration_id_key" ON "customers"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_credential_id_key" ON "customers"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_profile_id_key" ON "customers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_guest_id_key" ON "customers"("guest_id");

-- CreateIndex
CREATE INDEX "customers_integration_id_idx" ON "customers"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "guests_contact_id_key" ON "guests"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_integration_id_key" ON "psychologists"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_credential_id_key" ON "psychologists"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_profile_id_key" ON "psychologists"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_office_id_key" ON "psychologists"("office_id");

-- CreateIndex
CREATE INDEX "psychologists_integration_id_status_idx" ON "psychologists"("integration_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "admins_credential_id_key" ON "admins"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_profile_id_key" ON "admins"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_contact_id_key" ON "profiles"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cpf_key" ON "profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "therapeutic_approaches_name_key" ON "therapeutic_approaches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "offices_contact_id_key" ON "offices"("contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "offices_address_id_key" ON "offices"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_integration_id_key" ON "reviews"("integration_id");

-- CreateIndex
CREATE INDEX "reviews_integration_id_psychologist_id_rating_idx" ON "reviews"("integration_id", "psychologist_id", "rating");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_integration_id_key" ON "appointments"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "closed_appointments_appointment_id_key" ON "closed_appointments"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_integration_id_key" ON "notifications"("integration_id");

-- CreateIndex
CREATE INDEX "notifications_integration_id_idx" ON "notifications"("integration_id");

-- CreateIndex
CREATE INDEX "views_notification_id_idx" ON "views"("notification_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToPsychologist_AB_unique" ON "_CustomerToPsychologist"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToPsychologist_B_index" ON "_CustomerToPsychologist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PsychologistToTherapeuticApproache_AB_unique" ON "_PsychologistToTherapeuticApproache"("A", "B");

-- CreateIndex
CREATE INDEX "_PsychologistToTherapeuticApproache_B_index" ON "_PsychologistToTherapeuticApproache"("B");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "psychologists" ADD CONSTRAINT "psychologists_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "offices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offices" ADD CONSTRAINT "offices_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "closed_appointments" ADD CONSTRAINT "closed_appointments_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPsychologist" ADD CONSTRAINT "_CustomerToPsychologist_A_fkey" FOREIGN KEY ("A") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPsychologist" ADD CONSTRAINT "_CustomerToPsychologist_B_fkey" FOREIGN KEY ("B") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" ADD CONSTRAINT "_PsychologistToTherapeuticApproache_A_fkey" FOREIGN KEY ("A") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PsychologistToTherapeuticApproache" ADD CONSTRAINT "_PsychologistToTherapeuticApproache_B_fkey" FOREIGN KEY ("B") REFERENCES "therapeutic_approaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
