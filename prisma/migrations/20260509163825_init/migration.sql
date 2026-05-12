/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facebook"."User" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "facebook"."UserLog" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "oldStartDate" TIMESTAMP(3),
    "oldEndDate" TIMESTAMP(3),
    "newStartDate" TIMESTAMP(3),
    "newEndDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "facebook"."UserLog" ADD CONSTRAINT "UserLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "facebook"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
