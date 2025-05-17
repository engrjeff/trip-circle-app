-- DropForeignKey
ALTER TABLE "TripMember" DROP CONSTRAINT "TripMember_tripCircleId_fkey";

-- AddForeignKey
ALTER TABLE "TripMember" ADD CONSTRAINT "TripMember_tripCircleId_fkey" FOREIGN KEY ("tripCircleId") REFERENCES "TripCircle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
