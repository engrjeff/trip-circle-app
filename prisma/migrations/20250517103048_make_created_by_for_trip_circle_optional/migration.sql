-- DropForeignKey
ALTER TABLE "TripCircle" DROP CONSTRAINT "TripCircle_createdBy_fkey";

-- AlterTable
ALTER TABLE "TripCircle" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TripCircle" ADD CONSTRAINT "TripCircle_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
