/*
  Warnings:

  - You are about to drop the column `teamId` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_userId_fkey";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "teamId",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'participant',
ALTER COLUMN "day" SET DEFAULT 'Monday',
ALTER COLUMN "time" SET DEFAULT '09:00',
ALTER COLUMN "frequency" SET DEFAULT 'weekly';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "role" SET DEFAULT 'user';

-- DropTable
DROP TABLE "Team";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
