-- CreateEnum
CREATE TYPE "prodi_enum" AS ENUM ('Informatika', 'Sistem Informasi', 'Sains Data', 'Bisnis Digital', 'Fasilkom');

-- CreateEnum
CREATE TYPE "jabatan_enum" AS ENUM ('TU', 'Dekan', 'Wadek 1', 'Wadek 2', 'Wadek 3');

-- CreateEnum
CREATE TYPE "ruangan_gedung_enum" AS ENUM ('FIK1', 'FIK2');

-- CreateEnum
CREATE TYPE "ruangan_lantai_enum" AS ENUM ('1', '2', '3');

-- CreateEnum
CREATE TYPE "ruangan_status_enum" AS ENUM ('Tersedia', 'Tidak_Tersedia', 'Perbaikan');

-- CreateEnum
CREATE TYPE "ruangan_jenis_enum" AS ENUM ('Seminar', 'Kelas', 'Lab', 'dll');

-- CreateEnum
CREATE TYPE "fasilitas_kondisi_enum" AS ENUM ('baik', 'rusak');

-- CreateEnum
CREATE TYPE "peminjaman_status_enum" AS ENUM ('Menunggu', 'Review', 'Disetujui', 'Ditolak', 'Revisi');

-- CreateEnum
CREATE TYPE "verifikasi_status_enum" AS ENUM ('Valid', 'Tidak_Valid');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "no_pokok" VARCHAR,
    "prodi" "prodi_enum",
    "fakultas" VARCHAR(255),
    "jabatan" "jabatan_enum",
    "role_id" INTEGER DEFAULT 2,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruangan" (
    "id" BIGSERIAL NOT NULL,
    "nama_ruangan" TEXT,
    "Gedung" "ruangan_gedung_enum",
    "lantai" "ruangan_lantai_enum",
    "kapasitas" INTEGER,
    "status" "ruangan_status_enum",
    "jenis" "ruangan_jenis_enum",

    CONSTRAINT "ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas_details" (
    "id" BIGSERIAL NOT NULL,
    "nama" TEXT,
    "jumlah" INTEGER,
    "kondisi" "fasilitas_kondisi_enum",

    CONSTRAINT "fasilitas_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas" (
    "id" BIGSERIAL NOT NULL,
    "ruangan_id" BIGINT,
    "fasilitas_details" BIGINT,

    CONSTRAINT "fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peminjaman" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "ruangan_id" BIGINT,
    "nama_kegiatan" TEXT,
    "deskripsi_kegiatan" TEXT,
    "jumlah_peserta" INTEGER,
    "tanggal_kegiatan" DATE,
    "jam_mulai" TIME(6),
    "jam_selesai" TIME(6),
    "dosen_pendamping" TEXT,
    "cs_pendamping" TEXT,
    "satpam_pendamping" TEXT,
    "status_peminjaman" "peminjaman_status_enum",
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catatan_admin" TEXT,
    "alasan_penolakan" TEXT,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_berkas" (
    "id" BIGSERIAL NOT NULL,
    "nama_berkas" TEXT,
    "file_path" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT,

    CONSTRAINT "template_berkas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen_peminjaman" (
    "id" BIGSERIAL NOT NULL,
    "peminjaman_id" BIGINT,
    "berkas_id" BIGINT,
    "file_path" TEXT,
    "status_verifikasi" "verifikasi_status_enum",
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catatan_verifikator" TEXT,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dokumen_peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_no_pokok_key" ON "users"("no_pokok");

-- AddForeignKey
ALTER TABLE "fasilitas" ADD CONSTRAINT "fasilitas_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "ruangan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fasilitas" ADD CONSTRAINT "fasilitas_fasilitas_details_fkey" FOREIGN KEY ("fasilitas_details") REFERENCES "fasilitas_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peminjaman" ADD CONSTRAINT "peminjaman_ruangan_id_fkey" FOREIGN KEY ("ruangan_id") REFERENCES "ruangan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peminjaman" ADD CONSTRAINT "peminjaman_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_berkas" ADD CONSTRAINT "template_berkas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_peminjaman" ADD CONSTRAINT "dokumen_peminjaman_berkas_id_fkey" FOREIGN KEY ("berkas_id") REFERENCES "template_berkas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen_peminjaman" ADD CONSTRAINT "dokumen_peminjaman_peminjaman_id_fkey" FOREIGN KEY ("peminjaman_id") REFERENCES "peminjaman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
