-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "facebook";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tiktok";

-- CreateTable
CREATE TABLE "facebook"."User" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facebook"."Plan" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facebook"."UserSubscription" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "planId" BIGINT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facebook"."FbOverrideConfig" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "rowIndex" INTEGER NOT NULL,
    "clickValue" INTEGER NOT NULL,
    "pricePerClick" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FbOverrideConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "facebook"."User"("email");

-- AddForeignKey
ALTER TABLE "facebook"."UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "facebook"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facebook"."UserSubscription" ADD CONSTRAINT "UserSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "facebook"."Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facebook"."FbOverrideConfig" ADD CONSTRAINT "FbOverrideConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "facebook"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
