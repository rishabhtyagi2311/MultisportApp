/*
  Warnings:

  - You are about to drop the column `nickname` on the `footballProfile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `footballTeam` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `userInfo` table. All the data in the column will be lost.
  - You are about to drop the `footballTeamMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `footballTeam` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FootballMatchStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "footballProfile" DROP CONSTRAINT "footballProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "footballTeamMember" DROP CONSTRAINT "footballTeamMember_footballProfileId_fkey";

-- DropForeignKey
ALTER TABLE "footballTeamMember" DROP CONSTRAINT "footballTeamMember_footballTeamId_fkey";

-- AlterTable
ALTER TABLE "footballProfile" DROP COLUMN "nickname";

-- AlterTable
ALTER TABLE "footballTeam" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userInfo" DROP COLUMN "age",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "firstname",
DROP COLUMN "lastname";

-- DropTable
DROP TABLE "footballTeamMember";

-- CreateTable
CREATE TABLE "footballPlayer" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "footballPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatch" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "playersPerTeam" INTEGER NOT NULL,
    "numberOfReferees" INTEGER NOT NULL,
    "referees" TEXT[],
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "status" "FootballMatchStatus" NOT NULL DEFAULT 'ONGOING',
    "extraTime" BOOLEAN NOT NULL DEFAULT false,
    "allowedSubs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footballMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatchTeamBridge" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "footballMatchTeamBridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatchPlayer" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "footballMatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatchEvent" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "matchPlayerId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "subTypeId" INTEGER,
    "minute" INTEGER NOT NULL,
    "second" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footballMatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatchEventType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "footballMatchEventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballMatchEventSubtype" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "footballMatchEventSubtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballTeamMatchStats" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "cards" INTEGER NOT NULL,

    CONSTRAINT "footballTeamMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballPlayerMatchStats" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "matchPlayerId" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "yellowCards" INTEGER NOT NULL,
    "redCards" INTEGER NOT NULL,

    CONSTRAINT "footballPlayerMatchStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "footballProfile" ADD CONSTRAINT "footballProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballPlayer" ADD CONSTRAINT "footballPlayer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "footballProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballPlayer" ADD CONSTRAINT "footballPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatch" ADD CONSTRAINT "footballMatch_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatch" ADD CONSTRAINT "footballMatch_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchTeamBridge" ADD CONSTRAINT "footballMatchTeamBridge_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "footballMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchTeamBridge" ADD CONSTRAINT "footballMatchTeamBridge_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchPlayer" ADD CONSTRAINT "footballMatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "footballMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchPlayer" ADD CONSTRAINT "footballMatchPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "footballPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchPlayer" ADD CONSTRAINT "footballMatchPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchEvent" ADD CONSTRAINT "fk_event_match" FOREIGN KEY ("matchId") REFERENCES "footballMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchEvent" ADD CONSTRAINT "fk_event_player" FOREIGN KEY ("matchPlayerId") REFERENCES "footballMatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchEvent" ADD CONSTRAINT "fk_event_type" FOREIGN KEY ("eventTypeId") REFERENCES "footballMatchEventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballMatchEvent" ADD CONSTRAINT "fk_event_subtype" FOREIGN KEY ("subTypeId") REFERENCES "footballMatchEventSubtype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMatchStats" ADD CONSTRAINT "footballTeamMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "footballMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMatchStats" ADD CONSTRAINT "footballTeamMatchStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballPlayerMatchStats" ADD CONSTRAINT "footballPlayerMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "footballMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballPlayerMatchStats" ADD CONSTRAINT "footballPlayerMatchStats_matchPlayerId_fkey" FOREIGN KEY ("matchPlayerId") REFERENCES "footballMatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
