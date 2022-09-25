/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `therapeutic_approaches` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "therapeutic_approaches_name_key" ON "therapeutic_approaches"("name");
