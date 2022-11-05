-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "credential_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_credential_id_key" ON "admins"("credential_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_profile_id_key" ON "admins"("profile_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
