/*
  Warnings:

  - You are about to drop the `footballMatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballMatchEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballMatchEventSubtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballMatchEventType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballMatchPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballMatchTeamBridge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballPlayerMatchStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footballTeamMatchStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "footballMatch" DROP CONSTRAINT "footballMatch_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatch" DROP CONSTRAINT "footballMatch_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchEvent" DROP CONSTRAINT "fk_event_match";

-- DropForeignKey
ALTER TABLE "footballMatchEvent" DROP CONSTRAINT "fk_event_player";

-- DropForeignKey
ALTER TABLE "footballMatchEventSubtype" DROP CONSTRAINT "footballMatchEventSubtype_typeId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchPlayer" DROP CONSTRAINT "footballMatchPlayer_matchId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchPlayer" DROP CONSTRAINT "footballMatchPlayer_playerId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchPlayer" DROP CONSTRAINT "footballMatchPlayer_teamId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchTeamBridge" DROP CONSTRAINT "footballMatchTeamBridge_matchId_fkey";

-- DropForeignKey
ALTER TABLE "footballMatchTeamBridge" DROP CONSTRAINT "footballMatchTeamBridge_teamId_fkey";

-- DropForeignKey
ALTER TABLE "footballPlayerMatchStats" DROP CONSTRAINT "footballPlayerMatchStats_matchId_fkey";

-- DropForeignKey
ALTER TABLE "footballPlayerMatchStats" DROP CONSTRAINT "footballPlayerMatchStats_matchPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "footballTeamMatchStats" DROP CONSTRAINT "footballTeamMatchStats_matchId_fkey";

-- DropForeignKey
ALTER TABLE "footballTeamMatchStats" DROP CONSTRAINT "footballTeamMatchStats_teamId_fkey";

-- DropTable
DROP TABLE "footballMatch";

-- DropTable
DROP TABLE "footballMatchEvent";

-- DropTable
DROP TABLE "footballMatchEventSubtype";

-- DropTable
DROP TABLE "footballMatchEventType";

-- DropTable
DROP TABLE "footballMatchPlayer";

-- DropTable
DROP TABLE "footballMatchTeamBridge";

-- DropTable
DROP TABLE "footballPlayerMatchStats";

-- DropTable
DROP TABLE "footballTeamMatchStats";

-- DropEnum
DROP TYPE "FootballMatchStatus";
