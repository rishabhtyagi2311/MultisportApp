-- CreateTable
CREATE TABLE "FootballProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "FootballProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FootballProfile_userId_key" ON "FootballProfile"("userId");

-- AddForeignKey
ALTER TABLE "FootballProfile" ADD CONSTRAINT "FootballProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
