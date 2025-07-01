/*
  Warnings:

  - Added the required column `contact` to the `userInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userInfo" ADD COLUMN     "contact" TEXT NOT NULL;
