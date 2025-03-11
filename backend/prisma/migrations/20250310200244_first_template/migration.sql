-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condominiums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mountlyQuota" DOUBLE PRECISION NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Condominiums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "houseType" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "coundominiumId" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonAreas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION,
    "rules" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "images" TEXT[],
    "type" INTEGER NOT NULL,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "CommonAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaReservations" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AreaReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CondominiumPayments" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentType" INTEGER NOT NULL,
    "addressId" TEXT NOT NULL,
    "areaReservationId" TEXT,

    CONSTRAINT "CondominiumPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fine" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "areaReservationId" TEXT NOT NULL,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "ownerId" TEXT NOT NULL,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequests" (
    "id" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ServiceRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceReviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "serviceRequestId" TEXT NOT NULL,

    CONSTRAINT "ServiceReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "urgency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastOrder" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "condominiumId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budgets" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votings" (
    "id" TEXT NOT NULL,
    "decision" BOOLEAN NOT NULL,
    "orderID" TEXT NOT NULL,
    "budgetID" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Votings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderWorks" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderWorks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Condominiums_id_key" ON "Condominiums"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Addresses_id_key" ON "Addresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommonAreas_id_key" ON "CommonAreas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AreaReservations_id_key" ON "AreaReservations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CondominiumPayments_id_key" ON "CondominiumPayments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fine_id_key" ON "Fine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_key" ON "Services"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequests_id_key" ON "ServiceRequests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceReviews_id_key" ON "ServiceReviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Budgets_id_key" ON "Budgets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Votings_id_key" ON "Votings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderWorks_id_key" ON "OrderWorks"("id");

-- AddForeignKey
ALTER TABLE "Condominiums" ADD CONSTRAINT "Condominiums_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_coundominiumId_fkey" FOREIGN KEY ("coundominiumId") REFERENCES "Condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreas" ADD CONSTRAINT "CommonAreas_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaReservations" ADD CONSTRAINT "AreaReservations_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "CommonAreas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaReservations" ADD CONSTRAINT "AreaReservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondominiumPayments" ADD CONSTRAINT "CondominiumPayments_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CondominiumPayments" ADD CONSTRAINT "CondominiumPayments_areaReservationId_fkey" FOREIGN KEY ("areaReservationId") REFERENCES "AreaReservations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_areaReservationId_fkey" FOREIGN KEY ("areaReservationId") REFERENCES "AreaReservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequests" ADD CONSTRAINT "ServiceRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReviews" ADD CONSTRAINT "ServiceReviews_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_budgetID_fkey" FOREIGN KEY ("budgetID") REFERENCES "Budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votings" ADD CONSTRAINT "Votings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderWorks" ADD CONSTRAINT "OrderWorks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
