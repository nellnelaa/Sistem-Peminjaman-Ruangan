// services/peminjaman_service.js
const {
  getPeminjamansRepo,
  getPeminjamanByIdRepo,
  createPeminjamanRepo,
  updatePeminjamanRepo,
  deletePeminjamanRepo,
} = require("../repositories/peminjaman_repository.js");
const {
  createDokumenPeminjamanRepo,
  deleteDokumenByPeminjamanIdRepo,
} = require("../repositories/dokumen_peminjaman_repository.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/request.js");
const fs = require("fs");
const path = require("path");

const getPeminjamansService = async (
  user_id,
  ruangan_id,
  nama_kegiatan,
  tanggal_kegiatan,
  status_peminjaman
) => {
  const data = await getPeminjamansRepo(
    user_id,
    ruangan_id,
    nama_kegiatan,
    tanggal_kegiatan,
    status_peminjaman
  );

  if (data.length === 0) {
    throw new NotFoundError("Peminjaman not found");
  }

  return data;
};

const getPeminjamanByIdService = async (id) => {
  const data = await getPeminjamanByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Peminjaman not found");
  }

  return data;
};

const createPeminjamanService = async (peminjaman, files) => {
  const {
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
    satpam_pendamping,
    dokumen_berkas_id,
  } = peminjaman;

  const ruangan = await prisma.ruangan.findFirst({
    where: { id: BigInt(ruangan_id) },
  });

  if (!ruangan) {
    throw new NotFoundError("Ruangan not found");
  }

  const createPeminjamanData = await createPeminjamanRepo(
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
  );

  if (files && files.dokumen) {
    const uploadDir = path.join(__dirname, "..", "upload");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const dokumenFiles = Array.isArray(files.dokumen)
      ? files.dokumen
      : [files.dokumen];

    let berkasIds = [];
    if (dokumen_berkas_id) {
      try {
        berkasIds =
          typeof dokumen_berkas_id === "string"
            ? JSON.parse(dokumen_berkas_id)
            : dokumen_berkas_id;
      } catch (e) {
        berkasIds = [];
      }
    }

    const dokumenData = [];

    for (let i = 0; i < dokumenFiles.length; i++) {
      const file = dokumenFiles[i];
      const fileName = Date.now() + "-" + file.name;
      const uploadPath = path.join(uploadDir, fileName);

      await file.mv(uploadPath);

      dokumenData.push({
        peminjaman_id: createPeminjamanData.id,
        berkas_id: berkasIds[i] ? parseInt(berkasIds[i]) : null,
        file_url: uploadPath,
        status_verifikasi: "Tidak_Valid", 
      });
    }

    if (dokumenData.length > 0) {
      await createDokumenPeminjamanRepo(dokumenData);
    }
  }

  const newPeminjaman = await getPeminjamanByIdRepo(createPeminjamanData.id);

  return newPeminjaman;
};

const updatePeminjamanService = async (id, peminjaman, files, user) => {
  const existingPeminjaman = await getPeminjamanByIdRepo(id);

  if (!existingPeminjaman) {
    throw new NotFoundError("Peminjaman not found");
  }

  if (user.role_id !== 1 && existingPeminjaman.user_id !== user.id) {
    throw new UnauthorizedError(
      "You are not authorized to update this peminjaman"
    );
  }

  const {
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
    alasan_penolakan,
    dokumen_berkas_id,
  } = peminjaman;

  const updatePeminjamanData = await updatePeminjamanRepo(
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
  );

  if (files && files.dokumen) {
    const oldDokumen = existingPeminjaman.dokumen_peminjaman;
    if (oldDokumen && Array.isArray(oldDokumen) && oldDokumen.length > 0) {
      oldDokumen.forEach((doc) => {
        if (doc.file_url && fs.existsSync(doc.file_url)) {
          fs.unlinkSync(doc.file_url);
        }
      });
    }

    await deleteDokumenByPeminjamanIdRepo(id);

    const uploadDir = path.join(__dirname, "..", "upload");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const dokumenFiles = Array.isArray(files.dokumen)
      ? files.dokumen
      : [files.dokumen];

    let berkasIds = [];
    if (dokumen_berkas_id) {
      try {
        berkasIds =
          typeof dokumen_berkas_id === "string"
            ? JSON.parse(dokumen_berkas_id)
            : dokumen_berkas_id;
      } catch (e) {
        berkasIds = [];
      }
    }

    const dokumenData = [];

    for (let i = 0; i < dokumenFiles.length; i++) {
      const file = dokumenFiles[i];
      const fileName = Date.now() + "-" + file.name;
      const uploadPath = path.join(uploadDir, fileName);

      await file.mv(uploadPath);

      dokumenData.push({
        peminjaman_id: BigInt(id),
        berkas_id: berkasIds[i] ? parseInt(berkasIds[i]) : null,
        file_url: uploadPath,
        status_verifikasi: "Tidak_Valid",
      });
    }

    if (dokumenData.length > 0) {
      await createDokumenPeminjamanRepo(dokumenData);
    }
  }

  const updatedPeminjaman = await getPeminjamanByIdRepo(id);

  return updatedPeminjaman;
};

const deletePeminjamanService = async (id, user) => {
  const existingPeminjaman = await getPeminjamanByIdRepo(id);

  if (!existingPeminjaman) {
    throw new NotFoundError("Peminjaman not found");
  }

  if (user.role_id !== 1 && existingPeminjaman.user_id !== user.id) {
    throw new UnauthorizedError(
      "You are not authorized to delete this peminjaman"
    );
  }
  const dokumen = existingPeminjaman.dokumen_peminjaman;
  if (dokumen && Array.isArray(dokumen) && dokumen.length > 0) {
    dokumen.forEach((doc) => {
      if (doc.file_url && fs.existsSync(doc.file_url)) {
        fs.unlinkSync(doc.file_url);
      }
    });
  }

  await deleteDokumenByPeminjamanIdRepo(id);
  const deletedPeminjaman = await deletePeminjamanRepo(id);

  return {
    message: `Peminjaman with ID: ${existingPeminjaman.id} deleted successfully`,
    data: existingPeminjaman,
  };
};

module.exports = {
  getPeminjamansService,
  getPeminjamanByIdService,
  createPeminjamanService,
  updatePeminjamanService,
  deletePeminjamanService,
};
