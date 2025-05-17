/*
  Warnings:

  - You are about to drop the column `name` on the `TripCircle` table. All the data in the column will be lost.
  - Added the required column `title` to the `TripCircle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PLANNING', 'FINALIZED', 'REALIZED');

-- AlterTable
ALTER TABLE "TripCircle" DROP COLUMN "name",
ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'PLANNING',
ADD COLUMN     "title" TEXT NOT NULL;
