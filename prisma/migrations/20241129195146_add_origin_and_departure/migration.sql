/*
  Warnings:

  - Added the required column `departure` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "departure" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;
