Database Setup (PostgreSQL)
Project ini menggunakan PostgreSQL sebagai database.
Untuk memudahkan setup, repository ini menyediakan dua file SQL:
schema.sql → membuat seluruh struktur tabel (DDL)
data.sql → mengisi data awal ke dalam tabel (DML)

Cara Menggunakan
1. Buat Database Kosong
- Masuk ke PostgreSQL: psql -U postgres
- Buat database baru: Buat database baru:
- Keluar dari prompt: \q
2. Jalankan Script Schema (CREATE TABLE)
- psql -U postgres -d menpro -f sql/schema.sql
3. Jalankan Script Data (INSERT DATA)
- psql -U postgres -d menpro -f sql/data.sql
4. Verifikasi (Opsional)
- Masuk ke database: psql -U postgres -d menpro
- Cek daftar tabel: \dt
