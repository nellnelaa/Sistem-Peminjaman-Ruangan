--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: DocumentValidation; Type: TABLE DATA; Schema: public; Owner: postgres
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public."DocumentValidation" DISABLE TRIGGER ALL;

INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('d523e6c0-4c69-4bde-92c0-998092a74103', '1766134768972-Undangan BPD.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768972-Undangan BPD.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:27.759');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('d2adeb1f-8337-4536-836e-73860066782f', '1766134768972-Undangan BPD.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768972-Undangan BPD.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:32.045');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('68c22e06-5a06-4e8f-be69-774e99507020', '1766134769038-Undangan BPD.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769038-Undangan BPD.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:42.921');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('e7cce356-ba34-4275-9adb-1261a0328236', '1766134769023-Undangan Karang Taruna.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769023-Undangan Karang Taruna.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:48.03');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('ade7f034-8ddf-45b9-9815-4d231e9f9b35', '1766134769008-Undangan RT 9.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769008-Undangan RT 9.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:49.98');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('22858529-aad6-40f9-b1a5-9e04b71e7937', '1766134769001-Undangan Karang Taruna.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769001-Undangan Karang Taruna.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:53.314');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('f72be295-f376-4cea-9b90-58f371de84a7', '1766134768974-Undangan RT 9.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768974-Undangan RT 9.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:02:11.895');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('694d62cc-a92c-4ca0-bdb0-ca0e57ec2968', '1766134768988-Undangan ibu-ibu PKK.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768988-Undangan ibu-ibu PKK.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:02:15.107');
INSERT INTO public."DocumentValidation" (id, filename, "fileUrl", status, message, "createdAt") VALUES ('c01b5699-217a-4d55-8f5a-a26a86edf73c', '1766463000036-Undangan Karang Taruna.pdf', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766463000036-Undangan Karang Taruna.pdf', 'VALID', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-23 04:12:05.215');


ALTER TABLE public."DocumentValidation" ENABLE TRIGGER ALL;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public._prisma_migrations DISABLE TRIGGER ALL;

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5083be6d-646b-434f-b7c0-f2ef5e01a7f2', 'ff8daef428728d748a14357e638b137b14c6ee6e64318598a33911b34cced5ab', '2025-12-19 10:11:54.957508+07', '20251127035050_final', NULL, NULL, '2025-12-19 10:11:54.883006+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('35007f16-1a57-41fe-965e-7d525b9a747d', '6b2c818e1b016f9ceed2394dc08ecad25df68008c7666f3679e6864b3a3693a2', '2025-12-19 10:11:54.968539+07', '20251127071321_update_ruangan', NULL, NULL, '2025-12-19 10:11:54.965605+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('fa14c488-6f3c-40d0-8924-f9e413d27c62', '71b3383f00e7edd93362080b2831d816f2949c266db12560f51aafff3d8993ff', '2025-12-19 10:11:54.980119+07', '20251205150252_remove_user_relation_from_template_berkas', NULL, NULL, '2025-12-19 10:11:54.977243+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('690e87c3-52dd-4a84-a413-2629795c9c6c', 'ed32b5ce87ac0fde548396d3c4896b2ff71a7d28ffb6034352ed09d0e961c437', '2025-12-19 10:11:55.001744+07', '20251206033745_change_time_to_text', NULL, NULL, '2025-12-19 10:11:54.990773+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c180c22b-73d6-4b5f-81ce-b5558d441d7b', '52790af355a24d0e864a71818892973a598e2120f3710221638721ebef2d7b49', '2025-12-19 10:11:55.013635+07', '20251206041233_change_file_url', NULL, NULL, '2025-12-19 10:11:55.010723+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('72251629-2a32-4ddd-812d-0957cf19f147', '08cbecc067570a0e76ca3d5009a6cd5a8d51b52a0fea61cd94f42712a39992d1', '2025-12-19 10:11:55.032939+07', '20251206045441_change_tanggal', NULL, NULL, '2025-12-19 10:11:55.023793+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('d63968db-0e29-485b-9108-71f192335cad', 'c87dfae89f9516f358abf946590308962ab7ce848c5671189add9741a12bbb92', '2025-12-19 10:11:55.04498+07', '20251206103310_update_lagi', NULL, NULL, '2025-12-19 10:11:55.042401+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b3e22320-4eda-422f-be26-9ddcbd551b2c', '8020982f3bb96935fba2546978594ea44208eed358a64d260af48f740bd007e9', '2025-12-19 10:11:55.062567+07', '20251208131612_add_document_validation', NULL, NULL, '2025-12-19 10:11:55.055276+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('ac154dab-b6d4-4a42-8f94-21d2577cdd14', '6eb5bb80121829244a848bfc3b79e922744c05eea1579cf304779e6fd201b3b4', '2025-12-19 10:11:55.08773+07', '20251209121422_updateduser', NULL, NULL, '2025-12-19 10:11:55.072704+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c5be22ed-d435-499b-b6ec-c23c91d7bf35', '0d7450896c3810d1ff6d80d6606b3ea9f4383d65a0c36596de63c4eb374ceeb6', '2025-12-19 10:34:17.878974+07', '20251219033417_remove_is_available_from_ruangan', NULL, NULL, '2025-12-19 10:34:17.856016+07', 1);


ALTER TABLE public._prisma_migrations ENABLE TRIGGER ALL;

--
-- Data for Name: ruangan; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.ruangan DISABLE TRIGGER ALL;

INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (21, 'Ruang dosen SI', 'FIK1', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (22, 'Ruang prodi Bisnis Digital', 'FIK1', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (24, '⁠Ruang Dosen IF', 'FIK1', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (25, '⁠Ruang Dosen Fasilkom', 'FIK1', '2', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (1, 'Kelas 101', 'FIK2', '1', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (2, 'Kelas 102', 'FIK2', '1', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (3, 'Kelas 107', 'FIK2', '1', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (4, 'Kelas 108', 'FIK2', '1', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (6, 'Lab PPSTI', 'FIK2', '2', 50, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (7, 'Lab SCR', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (8, 'Lab Solusi', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (9, 'Lab MSI', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (11, 'Lab Sains Data', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (20, 'Ruang koorprodi SD', 'FIK1', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (12, 'Kelas 205', 'FIK2', '2', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (13, 'Lab MTI', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (5, 'Ruang Baca Fakultas', 'FIK2', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (10, 'Lab Bisnis Digital', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (14, 'Lab Insyde', 'FIK2', '2', 30, 'Tersedia', 'Lab');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (15, 'Kelas 301', 'FIK2', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (16, 'Kelas 302', 'FIK2', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (17, 'Kelas 304', 'FIK2', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (18, 'Kelas 305', 'FIK2', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (19, 'Ruang Seminar', 'FIK2', '3', 300, 'Tersedia', 'Seminar');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (23, 'Ruang ⁠Jurnal Fasilkom', 'FIK1', '1', 20, 'Tersedia', 'lainnya');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (26, 'Kelas 204', 'FIK1', '2', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (27, 'Kelas 203', 'FIK1', '2', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (28, 'Kelas 202', 'FIK1', '2', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (29, 'Kelas 201', 'FIK1', '2', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (30, 'Kelas 301', 'FIK1', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (31, 'Kelas 302', 'FIK1', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (32, 'Kelas 303', 'FIK1', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (33, 'Kelas 304', 'FIK1', '3', 50, 'Tersedia', 'Kelas');
INSERT INTO public.ruangan (id, nama_ruangan, "Gedung", lantai, kapasitas, status, jenis) VALUES (34, 'Kelas 305', 'FIK1', '3', 50, 'Tersedia', 'Kelas');


ALTER TABLE public.ruangan ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.users DISABLE TRIGGER ALL;

INSERT INTO public.users (id, name, email, password, no_pokok, prodi, fakultas, jabatan, role_id) VALUES (1, 'Naila Jinan', '22081010061@student.upnjatim.ac.id', '$2b$10$UNhO0hC6uk5zoy/lbAe00uAEJxcxB/Ns8vp2qV.af5yqsAZHtcVEi', '22081010061', 'Informatika', 'Ilmu Komputer', 'mahasiswa', 2);
INSERT INTO public.users (id, name, email, password, no_pokok, prodi, fakultas, jabatan, role_id) VALUES (2, 'Ibu Nurul', 'TU@gmail.com', '$2b$10$sNvlY4HUn2rygkQ/LYtJseD8ft7wycA5YJ8LjXl0ftDULqeQ94Wf.', '12345 6789 0 123', 'Lainnya', 'Ilmu Komputer', 'mahasiswa', 1);


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Data for Name: peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.peminjaman DISABLE TRIGGER ALL;

INSERT INTO public.peminjaman (id, user_id, ruangan_id, nama_kegiatan, deskripsi_kegiatan, jumlah_peserta, tanggal_kegiatan, jam_mulai, jam_selesai, dosen_pendamping, cs_pendamping, satpam_pendamping, status_peminjaman, created_at, catatan_admin, alasan_penolakan, updated_at) VALUES (2, 1, 1, 'Rapat Kerja Himatifa', 'Rapat kerja bulanan Himatifa', 47, '2025-12-20 00:00:00', '07:00', '15:00', 'Yoga Ari Tofan, S.Kom., M.Kom', 'Lilik', 'Aris Purnomo', 'Menunggu', '2025-12-19 08:55:17.392', NULL, NULL, '2025-12-19 08:55:17.392');
INSERT INTO public.peminjaman (id, user_id, ruangan_id, nama_kegiatan, deskripsi_kegiatan, jumlah_peserta, tanggal_kegiatan, jam_mulai, jam_selesai, dosen_pendamping, cs_pendamping, satpam_pendamping, status_peminjaman, created_at, catatan_admin, alasan_penolakan, updated_at) VALUES (4, 1, 19, 'Perayaan Tahun Baru FIK', 'Perayaan Tahun Baru', 300, '2025-12-31 00:00:00', '07:00', '23:59', 'Prof., Dr., Ir. Novirina Hendrasari, S.T.', 'Samin', 'Aris Purnomo', 'Disetujui', '2025-12-19 08:59:28.971', NULL, NULL, '2025-12-19 09:02:33.941');
INSERT INTO public.peminjaman (id, user_id, ruangan_id, nama_kegiatan, deskripsi_kegiatan, jumlah_peserta, tanggal_kegiatan, jam_mulai, jam_selesai, dosen_pendamping, cs_pendamping, satpam_pendamping, status_peminjaman, created_at, catatan_admin, alasan_penolakan, updated_at) VALUES (3, 1, 19, 'Perayaan Natal', 'Perayaan Natal 2025', 300, '2025-12-28 00:00:00', '12:00', '22:00', 'Yoga Ari Tofan, S.Kom., M.Kom.', 'Samin', 'Aris Purnomo', 'Revisi', '2025-12-19 08:57:25.974', 'kurang berkas', NULL, '2025-12-19 09:03:22.018');
INSERT INTO public.peminjaman (id, user_id, ruangan_id, nama_kegiatan, deskripsi_kegiatan, jumlah_peserta, tanggal_kegiatan, jam_mulai, jam_selesai, dosen_pendamping, cs_pendamping, satpam_pendamping, status_peminjaman, created_at, catatan_admin, alasan_penolakan, updated_at) VALUES (1, 1, 19, 'Pemira Informatika 2026', 'Pemilihan Umum Raya Informatika 2026', 100, '2025-12-20 00:00:00', '07:00', '16:00', 'Pak Budi', 'Mas Liliek', 'Mas Aries', 'Ditolak', '2025-12-19 08:52:04.978', 'berkas tidak lengkap', 'ajukan ulang', '2025-12-19 09:03:50.59');
INSERT INTO public.peminjaman (id, user_id, ruangan_id, nama_kegiatan, deskripsi_kegiatan, jumlah_peserta, tanggal_kegiatan, jam_mulai, jam_selesai, dosen_pendamping, cs_pendamping, satpam_pendamping, status_peminjaman, created_at, catatan_admin, alasan_penolakan, updated_at) VALUES (5, 1, 12, 'Belajar Bersama', 'Program Kerja Komunitas KOLU', 29, '2025-12-24 00:00:00', '07:00', '12:00', 'Pak Faisal', 'Mas Liliek', 'Mas Aries', 'Disetujui', '2025-12-23 04:10:00.019', NULL, NULL, '2025-12-23 04:12:36.654');


ALTER TABLE public.peminjaman ENABLE TRIGGER ALL;

--
-- Data for Name: template_berkas; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.template_berkas DISABLE TRIGGER ALL;

INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (1, 'Template TOR Pengajuan Fasilitas Fakultas', 'https://docs.google.com/document/d/1oSmJFkqGnWOTX4w_gXIcXXCv_b7I3Sl6bRKIXqPfLVc/edit?usp=drive_link', '2025-12-19 03:45:29.121');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (2, 'Template SIK', 'https://docs.google.com/document/d/10XPFxPeiuNfHSrIb7BTZTZ7s0v93yBKk5MNBlbgsB44/edit?usp=drive_link', '2025-12-19 03:45:51.198');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (3, 'Template Permohonan Tugas Dosen', 'https://docs.google.com/document/d/1bULsJOOqraDoqu2_LBhaeXbfKqYHVa1PSXNEfF-F62Q/edit?usp=drive_link', '2025-12-19 03:46:18.686');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (4, 'Template Permohonan Tugas CS & Security', 'https://docs.google.com/document/d/1OdehmF_cuI_uvQ-y7r6dSxyGhn89RUUYWuuDQATivbE/edit?usp=drive_link', '2025-12-19 03:46:30.236');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (5, 'Template Laporan Kegiatan', 'https://docs.google.com/document/d/1tKTx_Krk_a2WYTEC7FM2OjBHHHIXk83v6npTYszfzEE/edit?usp=drive_link', '2025-12-19 03:46:59.333');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (6, 'Template Daftar Hadir', 'https://docs.google.com/document/d/1YToZbL_WbucfDZFwBYo64ajX8ukU3VRe/edit?usp=drive_link&ouid=111155614491119052113&rtpof=true&sd=true', '2025-12-19 03:47:12.927');
INSERT INTO public.template_berkas (id, nama_berkas, file_path, created_at) VALUES (7, 'Template Surat Izin PAM', 'https://docs.google.com/document/d/104mIXrjdrCqFld6IkXTrNCjXbApohcV8/edit?usp=drive_link&ouid=111155614491119052113&rtpof=true&sd=true', '2025-12-19 03:47:30.083');


ALTER TABLE public.template_berkas ENABLE TRIGGER ALL;

--
-- Data for Name: dokumen_peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.dokumen_peminjaman DISABLE TRIGGER ALL;

INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (1, 1, 6, 'Tidak_Valid', '2025-12-19 08:52:05.047', NULL, '2025-12-19 08:52:05.047', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134324982-Undangan Perangkat Desa.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (2, 1, 7, 'Tidak_Valid', '2025-12-19 08:52:05.047', NULL, '2025-12-19 08:52:05.047', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134324988-Undangan RT 9.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (3, 2, 1, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517432-Undangan RT 10.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (4, 2, 2, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517434-Undangan Karang Taruna.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (5, 2, 3, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517438-Undangan RT 9.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (6, 2, 4, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517441-Undangan LPM.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (7, 2, 5, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517446-Undangan RT 10.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (8, 2, 6, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517457-Undangan ibu-ibu PKK.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (9, 2, 7, 'Tidak_Valid', '2025-12-19 08:55:17.48', NULL, '2025-12-19 08:55:17.48', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134517460-Undangan BPD.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (10, 3, 1, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134645976-Undangan BPD.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (11, 3, 2, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134645982-Undangan ibu-ibu PKK.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (12, 3, 3, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134645993-Undangan LPM.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (13, 3, 4, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134646009-Undangan RT 16.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (14, 3, 5, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134646024-Undangan RT 15.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (15, 3, 6, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134646038-Undangan ibu-ibu PKK.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (16, 3, 7, 'Tidak_Valid', '2025-12-19 08:57:26.062', NULL, '2025-12-19 08:57:26.062', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134646049-Undangan BPD.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (17, 4, 1, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:32.04', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768972-Undangan BPD.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (23, 4, 7, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:42.916', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769038-Undangan BPD.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (22, 4, 6, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:48.014', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769023-Undangan Karang Taruna.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (21, 4, 5, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:49.976', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769008-Undangan RT 9.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (20, 4, 4, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:01:53.301', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134769001-Undangan Karang Taruna.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (18, 4, 2, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:02:11.878', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768974-Undangan RT 9.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (19, 4, 3, 'Valid', '2025-12-19 08:59:29.053', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-19 09:02:15.104', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766134768988-Undangan ibu-ibu PKK.pdf');
INSERT INTO public.dokumen_peminjaman (id, peminjaman_id, berkas_id, status_verifikasi, created_at, catatan_verifikator, updated_at, file_url) VALUES (24, 5, 7, 'Valid', '2025-12-23 04:10:00.138', 'Dokumen SAH (Lengkap TTD & Stempel).', '2025-12-23 04:12:05.135', 'C:\Document\Kuliah Semester 7\Manajemen Proyek\Sistem\backend\src\upload\1766463000036-Undangan Karang Taruna.pdf');


ALTER TABLE public.dokumen_peminjaman ENABLE TRIGGER ALL;

--
-- Data for Name: fasilitas_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.fasilitas_details DISABLE TRIGGER ALL;

INSERT INTO public.fasilitas_details (id, nama) VALUES (1, 'Meja Dosen');
INSERT INTO public.fasilitas_details (id, nama) VALUES (2, 'Kursi Dosen');
INSERT INTO public.fasilitas_details (id, nama) VALUES (3, 'Kursi Mahasiswa');
INSERT INTO public.fasilitas_details (id, nama) VALUES (4, 'Papan Tulis');
INSERT INTO public.fasilitas_details (id, nama) VALUES (6, 'Mic');
INSERT INTO public.fasilitas_details (id, nama) VALUES (7, 'AC');
INSERT INTO public.fasilitas_details (id, nama) VALUES (8, 'Proyektor');
INSERT INTO public.fasilitas_details (id, nama) VALUES (10, 'Spidol Papan Tulis');
INSERT INTO public.fasilitas_details (id, nama) VALUES (11, 'Penghapus Papan Tulis');
INSERT INTO public.fasilitas_details (id, nama) VALUES (9, 'Stop Kontak 5 meter');
INSERT INTO public.fasilitas_details (id, nama) VALUES (5, 'Speaker + Microphone (Toa)');
INSERT INTO public.fasilitas_details (id, nama) VALUES (12, 'Stop Kontak');
INSERT INTO public.fasilitas_details (id, nama) VALUES (13, 'Speaker');
INSERT INTO public.fasilitas_details (id, nama) VALUES (14, 'Smart Interactive Screen');
INSERT INTO public.fasilitas_details (id, nama) VALUES (15, 'Television');


ALTER TABLE public.fasilitas_details ENABLE TRIGGER ALL;

--
-- Data for Name: fasilitas; Type: TABLE DATA; Schema: public; Owner: postgres
--

ALTER TABLE public.fasilitas DISABLE TRIGGER ALL;

INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (579, 19, 3, 300, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (616, 27, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (376, 1, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (379, 1, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (385, 2, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (392, 2, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (622, 28, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (626, 28, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (545, 15, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (546, 16, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (549, 16, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (551, 16, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (555, 16, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (644, 30, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (649, 30, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (581, 19, 7, 6, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (583, 19, 2, 24, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (374, 1, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (377, 1, 5, 1, 'rusak');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (380, 1, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (382, 1, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (383, 2, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (388, 2, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (393, 2, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (585, 19, 13, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (431, 6, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (442, 8, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (446, 9, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (586, 23, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (453, 11, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (617, 27, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (623, 28, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (557, 17, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (576, 18, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (578, 18, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (630, 28, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (631, 29, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (635, 29, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (645, 30, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (652, 30, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (580, 19, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (162, 21, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (163, 22, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (584, 19, 6, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (619, 27, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (375, 1, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (378, 1, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (381, 1, 9, 1, 'rusak');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (386, 2, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (390, 2, 5, 1, 'rusak');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (621, 28, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (429, 6, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (434, 6, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (435, 7, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (438, 7, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (443, 8, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (444, 9, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (625, 28, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (454, 11, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (629, 28, 7, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (558, 17, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (574, 18, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (633, 29, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (636, 29, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (638, 29, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (642, 30, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (647, 30, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (651, 30, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (165, 24, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (166, 25, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (582, 19, 12, 6, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (618, 27, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (373, 1, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (387, 2, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (391, 2, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (620, 28, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (430, 6, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (433, 6, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (436, 7, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (439, 7, 12, 7, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (441, 8, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (447, 9, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (634, 29, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (455, 11, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (639, 29, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (641, 29, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (559, 17, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (564, 17, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (566, 17, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (568, 18, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (571, 18, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (575, 18, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (577, 18, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (646, 30, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (648, 30, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (587, 26, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (588, 26, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (372, 1, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (384, 2, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (389, 2, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (589, 26, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (428, 6, 12, 47, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (432, 6, 2, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (437, 7, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (440, 8, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (445, 9, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (590, 26, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (452, 11, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (560, 17, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (562, 17, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (565, 17, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (570, 18, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (573, 18, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (591, 26, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (592, 26, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (593, 26, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (653, 31, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (658, 31, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (662, 31, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (665, 32, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (672, 32, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (676, 33, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (688, 34, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (696, 34, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (394, 3, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (395, 3, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (396, 3, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (397, 3, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (398, 3, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (399, 3, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (501, 12, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (502, 12, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (400, 3, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (413, 4, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (456, 20, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (503, 12, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (504, 12, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (505, 12, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (506, 12, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (507, 12, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (561, 17, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (563, 17, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (567, 17, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (569, 18, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (572, 18, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (594, 26, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (655, 31, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (659, 31, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (668, 32, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (674, 32, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (675, 33, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (680, 33, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (683, 33, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (686, 34, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (692, 34, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (694, 34, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (401, 3, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (408, 4, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (411, 4, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (595, 26, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (654, 31, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (663, 31, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (508, 12, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (532, 14, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (664, 32, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (671, 32, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (677, 33, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (681, 33, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (685, 33, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (689, 34, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (691, 34, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (693, 34, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (402, 3, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (406, 4, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (410, 4, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (414, 4, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (596, 26, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (509, 12, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (514, 13, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (516, 13, 12, 34, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (517, 5, 3, 12, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (522, 10, 3, 30, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (657, 31, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (533, 14, 14, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (661, 31, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (666, 32, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (669, 32, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (673, 32, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (679, 33, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (403, 3, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (407, 4, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (409, 4, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (412, 4, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (597, 26, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (510, 12, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (513, 13, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (515, 13, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (519, 5, 7, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (520, 10, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (524, 10, 15, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (656, 31, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (660, 31, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (530, 14, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (534, 14, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (667, 32, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (670, 32, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (678, 33, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (682, 33, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (684, 33, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (687, 34, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (690, 34, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (695, 34, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (404, 3, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (405, 4, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (415, 4, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (511, 12, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (512, 13, 3, 34, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (518, 5, 12, 5, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (521, 10, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (523, 10, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (531, 14, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (535, 15, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (536, 15, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (537, 15, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (538, 15, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (539, 15, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (540, 15, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (541, 15, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (542, 15, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (543, 15, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (548, 16, 11, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (553, 16, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (544, 15, 2, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (547, 16, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (550, 16, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (552, 16, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (554, 16, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (556, 16, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (609, 27, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (610, 27, 10, 3, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (611, 27, 7, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (612, 27, 3, 50, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (613, 27, 8, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (614, 27, 4, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (615, 27, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (624, 28, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (627, 28, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (628, 28, 12, 2, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (632, 29, 1, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (637, 29, 5, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (640, 29, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (643, 30, 9, 1, 'baik');
INSERT INTO public.fasilitas (id, ruangan_id, fasilitas_details, jumlah, kondisi) VALUES (650, 30, 3, 50, 'baik');


ALTER TABLE public.fasilitas ENABLE TRIGGER ALL;

--
-- Name: dokumen_peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dokumen_peminjaman_id_seq', 24, true);


--
-- Name: fasilitas_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fasilitas_details_id_seq', 16, true);


--
-- Name: fasilitas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fasilitas_id_seq', 696, true);


--
-- Name: peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peminjaman_id_seq', 5, true);


--
-- Name: ruangan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ruangan_id_seq', 34, true);


--
-- Name: template_berkas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.template_berkas_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

