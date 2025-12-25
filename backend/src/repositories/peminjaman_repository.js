const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const getPeminjamansRepo = async (
  user_id,
  ruangan_id,
  nama_kegiatan,
  tanggal_kegiatan,
  status_peminjaman
) => {
  const where = {};

  if (user_id) {
    where.user_id = BigInt(user_id);
  }

  if (ruangan_id) {
    where.ruangan_id = BigInt(ruangan_id);
  }

  if (nama_kegiatan) {
    where.nama_kegiatan = {
      contains: nama_kegiatan,
      mode: "insensitive",
    };
  }

  if (tanggal_kegiatan) {
    where.tanggal_kegiatan = new Date(tanggal_kegiatan);
  }

  if (status_peminjaman) {
    where.status_peminjaman = status_peminjaman;
  }

  const searchedPeminjamans = await prisma.peminjaman.findMany({
    where,
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
        },
      },
      ruangan: {
        include: {
          fasilitas: {
            include: {
              fasilitas_details_rel: true,
            },
          },
        },
      },
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const serializedPeminjamans = JSONBigInt.stringify(searchedPeminjamans);
  return JSONBigInt.parse(serializedPeminjamans);
};

const getPeminjamanByIdRepo = async (id) => {
  const peminjaman = await prisma.peminjaman.findFirst({
    where: {
      id: BigInt(id),
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
        },
      },
      ruangan: {
        include: {
          fasilitas: {
            include: {
              fasilitas_details_rel: true,
            },
          },
        },
      },
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
      },
    },
  });

  const serializedPeminjaman = JSONBigInt.stringify(peminjaman);
  return JSONBigInt.parse(serializedPeminjaman);
};

const createPeminjamanRepo = async (
  user_id,
  ruangan_id,
  nama_kegiatan,
  deskripsi_kegiatan,
  jumlah_peserta,
  tanggal_kegiatan,
  jam_mulai,
  jam_selesai,
  dosen_pendamping,
  cs_pendamping,
  satpam_pendamping
) => {
  const newPeminjaman = await prisma.peminjaman.create({
    data: {
      user_id: BigInt(user_id),
      ruangan_id: BigInt(ruangan_id),
      nama_kegiatan,
      deskripsi_kegiatan,
      jumlah_peserta,
      tanggal_kegiatan: new Date(tanggal_kegiatan),
      jam_mulai,
      jam_selesai,
      dosen_pendamping,
      cs_pendamping,
      satpam_pendamping,
      status_peminjaman: "Menunggu", 
    },
  });

  const serializedPeminjaman = JSONBigInt.stringify(newPeminjaman);
  return JSONBigInt.parse(serializedPeminjaman);
};

const updatePeminjamanRepo = async (
  id,
  ruangan_id,
  nama_kegiatan,
  deskripsi_kegiatan,
  jumlah_peserta,
  tanggal_kegiatan,
  jam_mulai,
  jam_selesai,
  dosen_pendamping,
  cs_pendamping,
  satpam_pendamping,
  status_peminjaman,
  catatan_admin,
  alasan_penolakan
) => {
  const updateData = {};

  if (ruangan_id !== undefined) updateData.ruangan_id = BigInt(ruangan_id);
  if (nama_kegiatan !== undefined) updateData.nama_kegiatan = nama_kegiatan;
  if (deskripsi_kegiatan !== undefined)
    updateData.deskripsi_kegiatan = deskripsi_kegiatan;
  if (jumlah_peserta !== undefined) updateData.jumlah_peserta = jumlah_peserta;
  if (tanggal_kegiatan !== undefined)
    updateData.tanggal_kegiatan = new Date(tanggal_kegiatan);
  if (jam_mulai !== undefined) updateData.jam_mulai = jam_mulai;
  if (jam_selesai !== undefined) updateData.jam_selesai = jam_selesai;
  if (dosen_pendamping !== undefined)
    updateData.dosen_pendamping = dosen_pendamping;
  if (cs_pendamping !== undefined) updateData.cs_pendamping = cs_pendamping;
  if (satpam_pendamping !== undefined)
    updateData.satpam_pendamping = satpam_pendamping;
  if (status_peminjaman !== undefined)
    updateData.status_peminjaman = status_peminjaman;
  if (catatan_admin !== undefined) updateData.catatan_admin = catatan_admin;
  if (alasan_penolakan !== undefined)
    updateData.alasan_penolakan = alasan_penolakan;

  updateData.updated_at = new Date();

  const updatedPeminjaman = await prisma.peminjaman.update({
    where: { id: BigInt(id) },
    data: updateData,
  });

  const serializedPeminjaman = JSONBigInt.stringify(updatedPeminjaman);
  return JSONBigInt.parse(serializedPeminjaman);
};

const deletePeminjamanRepo = async (id) => {
  const deletedPeminjaman = await prisma.peminjaman.delete({
    where: { id: BigInt(id) },
  });

  const serializedPeminjaman = JSONBigInt.stringify(deletedPeminjaman);
  return JSONBigInt.parse(serializedPeminjaman);
};

module.exports = {
  getPeminjamansRepo,
  getPeminjamanByIdRepo,
  createPeminjamanRepo,
  updatePeminjamanRepo,
  deletePeminjamanRepo,
};
