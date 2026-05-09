ALTER TABLE "Ticket" DROP CONSTRAINT IF EXISTS "Ticket_cardId_fkey";

ALTER TABLE "Ticket" ALTER COLUMN "cardId" DROP NOT NULL;
ALTER TABLE "Ticket" ALTER COLUMN "checkinTime" DROP NOT NULL;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Realm" (
                                       "id" SERIAL NOT NULL,
                                       "realm_id" INTEGER,
                                       "name" TEXT,
                                       "code" TEXT NOT NULL,
                                       "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Realm_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
                                      "id" SERIAL NOT NULL,
                                      "username" TEXT NOT NULL,
                                      "password" TEXT NOT NULL,
                                      "role" TEXT NOT NULL,
                                      "realm_id" INTEGER,
                                      "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE IF NOT EXISTS "Customer" (
                                          "id" SERIAL NOT NULL,
                                          "realm_id" INTEGER,
                                          "name" TEXT,
                                          "phone" TEXT,
                                          "email" TEXT,
                                          "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE IF NOT EXISTS "Vehicle" (
                                         "id" SERIAL NOT NULL,
                                         "realm_id" INTEGER,
                                         "plate_number" TEXT NOT NULL,
                                         "color" TEXT,
                                         "type" TEXT NOT NULL,
                                         "customer_id" INTEGER,
                                         "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
    );

-- Update existing Card table from the initial migration.
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "realm_id" INTEGER;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "vehicle_id" INTEGER;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "created_by" TEXT;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "updated_date" TIMESTAMP(3);
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "updated_by" TEXT;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "deleted_date" TIMESTAMP(3);
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "deleted_by" TEXT;
ALTER TABLE "Card" ADD COLUMN IF NOT EXISTS "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE IF NOT EXISTS "ParkingLot" (
                                            "id" SERIAL NOT NULL,
                                            "realm_id" INTEGER,
                                            "name" TEXT NOT NULL,
                                            "location" TEXT,
                                            "capacity" INTEGER,
                                            "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE IF NOT EXISTS "ParkingSlot" (
                                             "id" SERIAL NOT NULL,
                                             "realm_id" INTEGER,
                                             "lot_id" INTEGER,
                                             "slot_code" TEXT NOT NULL,
                                             "status" TEXT NOT NULL,
                                             "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParkingSlot_pkey" PRIMARY KEY ("id")
    );

-- Update existing Ticket table from the initial migration.
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "realm_id" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "card_id" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "vehicle_id" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "parking_lot_id" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "slot_id" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "checkin_time" TIMESTAMP(3);
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "checkout_time" TIMESTAMP(3);
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "created_by" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "updated_date" TIMESTAMP(3);
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "updated_by" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "deleted_date" TIMESTAMP(3);
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "deleted_by" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Transaction" (
                                             "id" SERIAL NOT NULL,
                                             "realm_id" INTEGER,
                                             "ticket_id" INTEGER,
                                             "amount" DOUBLE PRECISION,
                                             "payment_type" TEXT,
                                             "paid_at" TIMESTAMP(3),
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE IF NOT EXISTS "CameraLog" (
                                           "id" SERIAL NOT NULL,
                                           "realm_id" INTEGER,
                                           "ticket_id" INTEGER,
                                           "image_url" TEXT,
                                           "type" TEXT NOT NULL,
                                           "captured_at" TIMESTAMP(3),
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CameraLog_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Realm_code_key" ON "Realm"("code");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Vehicle_plate_number_key" ON "Vehicle"("plate_number");
