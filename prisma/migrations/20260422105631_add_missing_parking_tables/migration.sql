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

CREATE TABLE IF NOT EXISTS "ParkingPrice" (
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

CREATE TABLE IF NOT EXISTS "Subscription" (
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
