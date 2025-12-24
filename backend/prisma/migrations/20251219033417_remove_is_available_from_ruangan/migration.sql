/*
  Warnings:

  - The values [Review,Selesai] on the enum `peminjaman_status_enum` will be removed. If these variants are still used in the database, this will fail.
  - The values [dll] on the enum `ruangan_jenis_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "peminjaman_status_enum_new" AS ENUM ('Menunggu', 'Disetujui', 'Ditolak', 'Revisi');
ALTER TABLE "peminjaman" ALTER COLUMN "status_peminjaman" TYPE "peminjaman_status_enum_new" USING ("status_peminjaman"::text::"peminjaman_status_enum_new");
ALTER TYPE "peminjaman_status_enum" RENAME TO "peminjaman_status_enum_old";
ALTER TYPE "peminjaman_status_enum_new" RENAME TO "peminjaman_status_enum";
DROP TYPE "peminjaman_status_enum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ruangan_jenis_enum_new" AS ENUM ('Seminar', 'Kelas', 'Lab', 'lainnya');
ALTER TABLE "ruangan" ALTER COLUMN "jenis" TYPE "ruangan_jenis_enum_new" USING ("jenis"::text::"ruangan_jenis_enum_new");
ALTER TYPE "ruangan_jenis_enum" RENAME TO "ruangan_jenis_enum_old";
ALTER TYPE "ruangan_jenis_enum_new" RENAME TO "ruangan_jenis_enum";
DROP TYPE "ruangan_jenis_enum_old";
COMMIT;
