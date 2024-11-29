/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `id_conductor` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `TripOnPassenger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `conductorId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_id_conductor_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "createdAt",
DROP COLUMN "id_conductor",
DROP COLUMN "updatedAt",
ADD COLUMN     "conductorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TripOnPassenger" DROP COLUMN "joinedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "image",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
