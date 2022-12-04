-- CreateEnum
CREATE TYPE "AppointmentCompletedBy" AS ENUM ('CUSTOMER', 'PSYCHOLOGIST', 'TIME_EXPIRED');

-- CreateTable
CREATE TABLE "closed_appointments" (
    "id" UUID NOT NULL,
    "appointment_id" UUID NOT NULL,
    "psychologist_id" UUID NOT NULL,
    "customer_id" UUID,
    "closed_by" "AppointmentCompletedBy" NOT NULL,
    "completed_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "closed_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "closed_appointments_appointment_id_key" ON "closed_appointments"("appointment_id");

-- AddForeignKey
ALTER TABLE "closed_appointments" ADD CONSTRAINT "closed_appointments_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "closed_appointments" ADD CONSTRAINT "closed_appointments_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "closed_appointments" ADD CONSTRAINT "closed_appointments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
