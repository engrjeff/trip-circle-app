/*
  Warnings:

  - Added the required column `isOrganizer` to the `TripMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripMember" ADD COLUMN     "isOrganizer" BOOLEAN NOT NULL;
