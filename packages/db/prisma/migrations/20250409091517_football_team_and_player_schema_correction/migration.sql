/*
  Warnings:

  - You are about to drop the `FootballProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FootballTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FootballTeamMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FootballProfile" DROP CONSTRAINT "FootballProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "FootballTeam" DROP CONSTRAINT "FootballTeam_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "FootballTeamMember" DROP CONSTRAINT "FootballTeamMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "FootballTeamMember" DROP CONSTRAINT "FootballTeamMember_userId_fkey";

-- DropTable
DROP TABLE "FootballProfile";

-- DropTable
DROP TABLE "FootballTeam";

-- DropTable
DROP TABLE "FootballTeamMember";

-- DropTable
DROP TABLE "UserInfo";

-- CreateTable
CREATE TABLE "userInfo" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footballProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footballTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footballTeam_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "userInfo_username_key" ON "userInfo"("username");

-- CreateIndex
CREATE UNIQUE INDEX "footballProfile_userId_key" ON "footballProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "footballTeamMember_footballProfileId_footballTeamId_key" ON "footballTeamMember"("footballProfileId", "footballTeamId");

-- AddForeignKey
ALTER TABLE "footballProfile" ADD CONSTRAINT "footballProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeam" ADD CONSTRAINT "footballTeam_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "footballProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMember" ADD CONSTRAINT "footballTeamMember_footballProfileId_fkey" FOREIGN KEY ("footballProfileId") REFERENCES "footballProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footballTeamMember" ADD CONSTRAINT "footballTeamMember_footballTeamId_fkey" FOREIGN KEY ("footballTeamId") REFERENCES "footballTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
