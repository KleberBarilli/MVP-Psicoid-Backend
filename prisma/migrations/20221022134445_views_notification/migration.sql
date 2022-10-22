-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('WELCOME');

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "data" JSON NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" UUID NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notification_id" UUID NOT NULL,
    "customer_id" UUID,
    "psychologist_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_psychologist_id_fkey" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
