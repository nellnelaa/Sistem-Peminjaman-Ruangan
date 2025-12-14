CREATE TABLE "users" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" varchar(255),
  "email" varchar(255) UNIQUE,
  "password" varchar(255),
  "no_pokok" varchar UNIQUE,
  "prodi" "enum(Informatika,Sistem Informasi,Sains Data,Bisnis Digital,Fasilkom)",
  "fakultas" varchar(255),
  "jabatan" "enum(TU,Dekan,Wadek 1,Wadek 2,Wadek 3)",
  "role_id" int DEFAULT 2
);

CREATE TABLE "ruangan" (
  "id" BIGSERIAL PRIMARY KEY,
  "nama_ruangan" varchar,
  "Gedung" "enum(FIK1,FIK2)",
  "lantai" enum(1,2,3),
  "kapasitas" int,
  "status" "enum(Tersedia,Tidak_Tersedia,Perbaikan)",
  "jenis" "enum(Seminar,Kelas,Lab,dll)"
);

CREATE TABLE "fasilitas" (
  "id" BIGSERIAL PRIMARY KEY,
  "ruangan_id" bigint,
  "fasilitas_details" bigint
);

CREATE TABLE "fasilitas_details" (
  "id" BIGSERIAL PRIMARY KEY,
  "nama" varchar,
  "jumlah" int,
  "kondisi" enum(baik,rusak)
);

CREATE TABLE "peminjaman" (
  "id" BIGSERIAL PRIMARY KEY,
  "user_id" bigint,
  "ruangan_id" bigint,
  "nama_kegiatan" varchar,
  "deskripsi_kegiatan" varchar,
  "jumlah_peserta" int,
  "tanggal_kegiatan" date,
  "jam_mulai" time,
  "jam_selesai" time,
  "dosen_pendamping" varchar,
  "cs_pendamping" varchar,
  "satpam_pendamping" varchar,
  "status_peminjaman" "enum(Menunggu,Review,Disetujui,Ditolak,Revisi)",
  "created_at" timestamp DEFAULT 'now()',
  "catatan_admin" varchar,
  "alasan_penolakan" varchar,
  "updated_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "template_berkas" (
  "id" BIGSERIAL PRIMARY KEY,
  "nama_berkas" varchar,
  "file_path" varchar,
  "created_at" timestamp DEFAULT 'now()',
  "user_id" bigint
);

CREATE TABLE "dokumen_peminjaman" (
  "id" BIGSERIAL PRIMARY KEY,
  "peminjaman_id" bigint,
  "berkas_id" bigint,
  "file_path" varchar,
  "status_verifikasi" "enum(Valid,Tidak_Valid)",
  "created_at" timestamp DEFAULT 'now()',
  "catatan_verifikator" text,
  "updated_at" timestamp DEFAULT 'now()'
);

COMMENT ON COLUMN "users"."no_pokok" IS 'Unique ID (NPM untuk Mahasiswa, NIP untuk TU/Dekan).';

COMMENT ON COLUMN "users"."prodi" IS 'Jika Role TU/Dekan, diisi Fasilkom.';

COMMENT ON COLUMN "users"."jabatan" IS 'Hanya diisi jika Role TU_DEKANAT';

COMMENT ON COLUMN "users"."role_id" IS '1=TU_DEKANAT, 2=MAHASISWA';

COMMENT ON COLUMN "peminjaman"."catatan_admin" IS 'nullable';

COMMENT ON COLUMN "peminjaman"."alasan_penolakan" IS 'nullable';

COMMENT ON COLUMN "dokumen_peminjaman"."catatan_verifikator" IS 'nullable';

ALTER TABLE "fasilitas" ADD FOREIGN KEY ("ruangan_id") REFERENCES "ruangan" ("id");

ALTER TABLE "fasilitas" ADD FOREIGN KEY ("fasilitas_details") REFERENCES "fasilitas_details" ("id");

ALTER TABLE "peminjaman" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "peminjaman" ADD FOREIGN KEY ("ruangan_id") REFERENCES "ruangan" ("id");

ALTER TABLE "template_berkas" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "dokumen_peminjaman" ADD FOREIGN KEY ("peminjaman_id") REFERENCES "peminjaman" ("id");

ALTER TABLE "dokumen_peminjaman" ADD FOREIGN KEY ("berkas_id") REFERENCES "template_berkas" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("name") REFERENCES "users" ("id");
