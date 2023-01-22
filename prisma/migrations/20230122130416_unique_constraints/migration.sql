/*
  Warnings:

  - A unique constraint covering the columns `[integration_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[integration_id]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[integration_id]` on the table `psychologists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[integration_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_integration_id_key" ON "appointments"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_integration_id_key" ON "notifications"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "psychologists_integration_id_key" ON "psychologists"("integration_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_integration_id_key" ON "reviews"("integration_id");
