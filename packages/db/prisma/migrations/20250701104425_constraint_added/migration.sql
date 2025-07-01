/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `userInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userInfo_contact_key" ON "userInfo"("contact");
