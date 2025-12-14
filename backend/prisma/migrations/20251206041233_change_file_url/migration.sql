/*
  Warnings:

  - You are about to drop the column `file_path` on the `dokumen_peminjaman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "dokumen_peminjaman" DROP COLUMN "file_path",
ADD COLUMN     "file_url" TEXT;
