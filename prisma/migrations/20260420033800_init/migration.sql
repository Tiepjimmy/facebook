-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "checkinTime" TIMESTAMP(3) NOT NULL,
    "checkoutTime" TIMESTAMP(3),
    "fee" DOUBLE PRECISION,
    "status" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_uid_key" ON "Card"("uid");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
