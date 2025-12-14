// repositories/dokumen_peminjaman_repository.js
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const createDokumenPeminjamanRepo = async (dokumenData) => {
  const createdDokumen = await prisma.dokumen_peminjaman.createMany({
    data: dokumenData.map((dok) => ({
      peminjaman_id: BigInt(dok.peminjaman_id),
      berkas_id: dok.berkas_id ? BigInt(dok.berkas_id) : null,
      file_url: dok.file_url,
      status_verifikasi: dok.status_verifikasi || "Tidak_Valid",
    })),
  });

  return createdDokumen;
};
const getDokumenByIdRepo = async (id) => {
  const dokumen = await prisma.dokumen_peminjaman.findFirst({
    where: { id: BigInt(id) },
    include: {
      template_berkas: true,
      peminjaman: true,
    },
  });

  const serializedDokumen = JSONBigInt.stringify(dokumen);
  return JSONBigInt.parse(serializedDokumen);
};

const getDokumenByPeminjamanIdRepo = async (peminjaman_id) => {
  const dokumen = await prisma.dokumen_peminjaman.findMany({
    where: {
      peminjaman_id: BigInt(peminjaman_id),
    },
    include: {
      template_berkas: true,
    },
  });

  const serializedDokumen = JSONBigInt.stringify(dokumen);
  return JSONBigInt.parse(serializedDokumen);
};

const updateDokumenVerifikasiRepo = async (
  id,
  status_verifikasi,
  catatan_verifikator
) => {
  const updatedDokumen = await prisma.dokumen_peminjaman.update({
    where: { id: BigInt(id) },
    data: {
      status_verifikasi,
      catatan_verifikator,
      updated_at: new Date(),
    },
  });

  const serializedDokumen = JSONBigInt.stringify(updatedDokumen);
  return JSONBigInt.parse(serializedDokumen);
};

const deleteDokumenByPeminjamanIdRepo = async (peminjaman_id) => {
  const deletedDokumen = await prisma.dokumen_peminjaman.deleteMany({
    where: {
      peminjaman_id: BigInt(peminjaman_id),
    },
  });

  return deletedDokumen;
};

const deleteDokumenByIdRepo = async (id) => {
  const deletedDokumen = await prisma.dokumen_peminjaman.delete({
    where: { id: BigInt(id) },
  });

  const serializedDokumen = JSONBigInt.stringify(deletedDokumen);
  return JSONBigInt.parse(serializedDokumen);
};

module.exports = {
  createDokumenPeminjamanRepo,
  getDokumenByPeminjamanIdRepo,
  getDokumenByIdRepo,
  updateDokumenVerifikasiRepo,
  deleteDokumenByPeminjamanIdRepo,
  deleteDokumenByIdRepo,
};
