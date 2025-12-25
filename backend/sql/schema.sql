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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: fasilitas_kondisi_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.fasilitas_kondisi_enum AS ENUM (
    'baik',
    'rusak'
);


--
-- Name: jabatan_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.jabatan_enum AS ENUM (
    'TU',
    'Dekan',
    'Wadek 1',
    'Wadek 2',
    'Wadek 3',
    'mahasiswa'
);


--
-- Name: peminjaman_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.peminjaman_status_enum AS ENUM (
    'Menunggu',
    'Disetujui',
    'Ditolak',
    'Revisi'
);


--
-- Name: prodi_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.prodi_enum AS ENUM (
    'Informatika',
    'Sistem Informasi',
    'Sains Data',
    'Bisnis Digital',
    'Lainnya'
);


--
-- Name: ruangan_gedung_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ruangan_gedung_enum AS ENUM (
    'FIK1',
    'FIK2'
);


--
-- Name: ruangan_jenis_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ruangan_jenis_enum AS ENUM (
    'Seminar',
    'Kelas',
    'Lab',
    'lainnya'
);


--
-- Name: ruangan_lantai_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ruangan_lantai_enum AS ENUM (
    '1',
    '2',
    '3'
);


--
-- Name: ruangan_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ruangan_status_enum AS ENUM (
    'Tersedia',
    'Tidak_Tersedia',
    'Perbaikan'
);


--
-- Name: verifikasi_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.verifikasi_status_enum AS ENUM (
    'Valid',
    'Tidak_Valid'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: DocumentValidation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DocumentValidation" (
    id text NOT NULL,
    filename text NOT NULL,
    "fileUrl" text NOT NULL,
    status text NOT NULL,
    message text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: dokumen_peminjaman; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dokumen_peminjaman (
    id bigint NOT NULL,
    peminjaman_id bigint,
    berkas_id bigint,
    status_verifikasi public.verifikasi_status_enum,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    catatan_verifikator text,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    file_url text
);


--
-- Name: dokumen_peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dokumen_peminjaman_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dokumen_peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dokumen_peminjaman_id_seq OWNED BY public.dokumen_peminjaman.id;


--
-- Name: fasilitas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasilitas (
    id bigint NOT NULL,
    ruangan_id bigint,
    fasilitas_details bigint,
    jumlah integer,
    kondisi public.fasilitas_kondisi_enum
);


--
-- Name: fasilitas_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasilitas_details (
    id bigint NOT NULL,
    nama text
);


--
-- Name: fasilitas_details_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fasilitas_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fasilitas_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fasilitas_details_id_seq OWNED BY public.fasilitas_details.id;


--
-- Name: fasilitas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fasilitas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fasilitas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fasilitas_id_seq OWNED BY public.fasilitas.id;


--
-- Name: peminjaman; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.peminjaman (
    id bigint NOT NULL,
    user_id bigint,
    ruangan_id bigint,
    nama_kegiatan text,
    deskripsi_kegiatan text,
    jumlah_peserta integer,
    tanggal_kegiatan timestamp(3) without time zone,
    jam_mulai text,
    jam_selesai text,
    dosen_pendamping text,
    cs_pendamping text,
    satpam_pendamping text,
    status_peminjaman public.peminjaman_status_enum,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    catatan_admin text,
    alasan_penolakan text,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.peminjaman_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.peminjaman_id_seq OWNED BY public.peminjaman.id;


--
-- Name: ruangan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ruangan (
    id bigint NOT NULL,
    nama_ruangan text,
    "Gedung" public.ruangan_gedung_enum,
    lantai public.ruangan_lantai_enum,
    kapasitas integer,
    status public.ruangan_status_enum,
    jenis public.ruangan_jenis_enum
);


--
-- Name: ruangan_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ruangan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ruangan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ruangan_id_seq OWNED BY public.ruangan.id;


--
-- Name: template_berkas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.template_berkas (
    id bigint NOT NULL,
    nama_berkas text,
    file_path text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: template_berkas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.template_berkas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: template_berkas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.template_berkas_id_seq OWNED BY public.template_berkas.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    no_pokok character varying,
    prodi public.prodi_enum,
    fakultas character varying(255),
    jabatan public.jabatan_enum,
    role_id integer DEFAULT 2
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: dokumen_peminjaman id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dokumen_peminjaman ALTER COLUMN id SET DEFAULT nextval('public.dokumen_peminjaman_id_seq'::regclass);


--
-- Name: fasilitas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas ALTER COLUMN id SET DEFAULT nextval('public.fasilitas_id_seq'::regclass);


--
-- Name: fasilitas_details id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas_details ALTER COLUMN id SET DEFAULT nextval('public.fasilitas_details_id_seq'::regclass);


--
-- Name: peminjaman id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.peminjaman ALTER COLUMN id SET DEFAULT nextval('public.peminjaman_id_seq'::regclass);


--
-- Name: ruangan id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ruangan ALTER COLUMN id SET DEFAULT nextval('public.ruangan_id_seq'::regclass);


--
-- Name: template_berkas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.template_berkas ALTER COLUMN id SET DEFAULT nextval('public.template_berkas_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: DocumentValidation DocumentValidation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DocumentValidation"
    ADD CONSTRAINT "DocumentValidation_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: dokumen_peminjaman dokumen_peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dokumen_peminjaman
    ADD CONSTRAINT dokumen_peminjaman_pkey PRIMARY KEY (id);


--
-- Name: fasilitas_details fasilitas_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas_details
    ADD CONSTRAINT fasilitas_details_pkey PRIMARY KEY (id);


--
-- Name: fasilitas fasilitas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas
    ADD CONSTRAINT fasilitas_pkey PRIMARY KEY (id);


--
-- Name: peminjaman peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY (id);


--
-- Name: ruangan ruangan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ruangan
    ADD CONSTRAINT ruangan_pkey PRIMARY KEY (id);


--
-- Name: template_berkas template_berkas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.template_berkas
    ADD CONSTRAINT template_berkas_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_no_pokok_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_no_pokok_key ON public.users USING btree (no_pokok);


--
-- Name: dokumen_peminjaman dokumen_peminjaman_berkas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dokumen_peminjaman
    ADD CONSTRAINT dokumen_peminjaman_berkas_id_fkey FOREIGN KEY (berkas_id) REFERENCES public.template_berkas(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: dokumen_peminjaman dokumen_peminjaman_peminjaman_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dokumen_peminjaman
    ADD CONSTRAINT dokumen_peminjaman_peminjaman_id_fkey FOREIGN KEY (peminjaman_id) REFERENCES public.peminjaman(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: fasilitas fasilitas_fasilitas_details_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas
    ADD CONSTRAINT fasilitas_fasilitas_details_fkey FOREIGN KEY (fasilitas_details) REFERENCES public.fasilitas_details(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: fasilitas fasilitas_ruangan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasilitas
    ADD CONSTRAINT fasilitas_ruangan_id_fkey FOREIGN KEY (ruangan_id) REFERENCES public.ruangan(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: peminjaman peminjaman_ruangan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_ruangan_id_fkey FOREIGN KEY (ruangan_id) REFERENCES public.ruangan(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: peminjaman peminjaman_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

