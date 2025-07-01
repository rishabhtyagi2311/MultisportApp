/*
  Warnings:

  - You are about to drop the column `age` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `userInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `userInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dob` to the `userInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "userInfo_username_key";

-- AlterTable
ALTER TABLE "userInfo" DROP COLUMN "age",
DROP COLUMN "username",
ADD COLUMN     "dob" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userInfo_email_key" ON "userInfo"("email");
