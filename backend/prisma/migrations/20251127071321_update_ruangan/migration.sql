/*
  Warnings:

  - You are about to drop the column `jumlah` on the `fasilitas_details` table. All the data in the column will be lost.
  - You are about to drop the column `kondisi` on the `fasilitas_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "fasilitas" ADD COLUMN     "jumlah" INTEGER,
ADD COLUMN     "kondisi" "fasilitas_kondisi_enum";

-- AlterTable
ALTER TABLE "fasilitas_details" DROP COLUMN "jumlah",
DROP COLUMN "kondisi";
