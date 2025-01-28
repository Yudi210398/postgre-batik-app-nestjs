-- CreateTable
CREATE TABLE "LaporanBulanan" (
    "id" SERIAL NOT NULL,
    "batikId" INTEGER NOT NULL,
    "stok_awal_bulan" INTEGER NOT NULL,
    "stok_akhir_bulan" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaporanBulanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenambahanStock" (
    "id" SERIAL NOT NULL,
    "batikId" INTEGER NOT NULL,
    "alasanPenambahan" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PenambahanStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LaporanBulanan" ADD CONSTRAINT "LaporanBulanan_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenambahanStock" ADD CONSTRAINT "PenambahanStock_batikId_fkey" FOREIGN KEY ("batikId") REFERENCES "batik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
