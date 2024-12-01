/*
  Warnings:

  - A unique constraint covering the columns `[tripId,userId]` on the table `TripOnPassenger` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "TripOnPassenger_tripId_userId_key" ON "TripOnPassenger"("tripId", "userId");
