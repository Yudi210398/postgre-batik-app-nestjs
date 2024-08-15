-- CreateTable
CREATE TABLE "pembelian" (
    "id" SERIAL NOT NULL,
    "batikId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "pembelian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pembelian" ADD CONSTRAINT "pembelian_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembelian" ADD CONSTRAINT "pembelian_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
