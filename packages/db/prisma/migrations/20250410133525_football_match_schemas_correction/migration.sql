/*
  Warnings:

  - You are about to drop the column `city` on the `footballTeam` table. All the data in the column will be lost.
  - You are about to drop the `footballPlayer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nickname` to the `footballProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `footballTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `userInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `userInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `userInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `userInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `userInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "footballMatchPlayer" DROP CONSTRAINT "footballMatchPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "footballPlayer" DROP CONSTRAINT "footballPlayer_profileId_fkey";

-- DropForeignKey
ALTER TABLE "footballPlayer" DROP CONSTRAINT "footballPlayer_teamId_fkey";

-- DropForeignKey
ALTER TABLE "footballProfile" DROP CONSTRAINT "footballProfile_userId_fkey";

-- AlterTable
ALTER TABLE "footballProfile" ADD COLUMN     "nickname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "footballTeam" DROP COLUMN "city",
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userInfo" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- DropTable
DROP TABLE "footballPlayer";

-- CreateTable
CREATE TABLE "footballTeamMember" (
    "id" SERIAL NOT NULL,
    "footballProfileId" INTEGER NOT NULL,
    "footballTeamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footballTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "footballTeamMember_footballProfileId_footballTeamId_key" ON "footballTeamMember"("footballProfileId", "footballTeamId");

-- AddForeignKey
ALTER TABLE "footballProfile" ADD CONSTRAINT "footballProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMember" ADD CONSTRAINT "footballTeamMember_footballProfileId_fkey" FOREIGN KEY ("footballProfileId") REFERENCES "footballProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMember" ADD CONSTRAINT "footballTeamMember_footballTeamId_fkey" FOREIGN KEY ("footballTeamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchPlayer" ADD CONSTRAINT "footballMatchPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "footballProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
