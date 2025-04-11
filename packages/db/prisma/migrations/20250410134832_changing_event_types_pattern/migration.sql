/*
  Warnings:

  - You are about to drop the column `eventTypeId` on the `footballMatchEvent` table. All the data in the column will be lost.
  - You are about to drop the column `subTypeId` on the `footballMatchEvent` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `footballMatchEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subType` to the `footballMatchEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `footballMatchEventSubtype` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "footballMatchEvent" DROP CONSTRAINT "fk_event_subtype";

-- DropForeignKey
ALTER TABLE "footballMatchEvent" DROP CONSTRAINT "fk_event_type";

-- AlterTable
ALTER TABLE "footballMatchEvent" DROP COLUMN "eventTypeId",
DROP COLUMN "subTypeId",
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "subType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "footballMatchEventSubtype" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "footballMatchEventSubtype" ADD CONSTRAINT "footballMatchEventSubtype_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "footballMatchEventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
