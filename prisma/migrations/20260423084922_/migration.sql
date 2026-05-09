-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "camera";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "parking";

-- CreateTable
CREATE TABLE "parking"."Card" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "realm_id" INTEGER,
    "vehicle_id" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking"."Ticket" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER,
    "checkinTime" TIMESTAMP(3),
    "checkoutTime" TIMESTAMP(3),
    "fee" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "realm_id" INTEGER,
    "card_id" INTEGER,
    "vehicle_id" INTEGER,
    "parking_lot_id" INTEGER,
    "slot_id" INTEGER,
    "checkin_time" TIMESTAMP(3),
    "checkout_time" TIMESTAMP(3),
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking"."Realm" (
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
CREATE TABLE "parking"."User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "realm_id" INTEGER,
    "last_login_at" TIMESTAMP(3),
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
CREATE TABLE "parking"."Customer" (
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
CREATE TABLE "parking"."Vehicle" (
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

-- CreateTable
CREATE TABLE "parking"."Transaction" (
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
CREATE TABLE "parking"."ParkingLot" (
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
CREATE TABLE "parking"."ParkingSlot" (
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

-- CreateTable
CREATE TABLE "parking"."ParkingPrice" (
    "id" SERIAL NOT NULL,
    "vehicle_type" TEXT,
    "first_hour_price" DOUBLE PRECISION,
    "next_hour_price" DOUBLE PRECISION,
    "max_price_per_day" DOUBLE PRECISION,
    "realm_id" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParkingPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking"."Subscription" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER,
    "vehicle_id" INTEGER,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "status" TEXT,
    "realm_id" INTEGER,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_date" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_date" TIMESTAMP(3),
    "deleted_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking"."CameraLog" (
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
CREATE UNIQUE INDEX "Card_uid_key" ON "parking"."Card"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Realm_code_key" ON "parking"."Realm"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "parking"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_number_key" ON "parking"."Vehicle"("plate_number");

-- AddForeignKey
ALTER TABLE "parking"."Ticket" ADD CONSTRAINT "Ticket_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "parking"."Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
