/*
  Warnings:

  - The values [Fasilkom] on the enum `prodi_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "jabatan_enum" ADD VALUE 'mahasiswa';

-- AlterEnum
BEGIN;
CREATE TYPE "prodi_enum_new" AS ENUM ('Informatika', 'Sistem Informasi', 'Sains Data', 'Bisnis Digital', 'Lainnya');
ALTER TABLE "users" ALTER COLUMN "prodi" TYPE "prodi_enum_new" USING ("prodi"::text::"prodi_enum_new");
ALTER TYPE "prodi_enum" RENAME TO "prodi_enum_old";
ALTER TYPE "prodi_enum_new" RENAME TO "prodi_enum";
DROP TYPE "prodi_enum_old";
COMMIT;
