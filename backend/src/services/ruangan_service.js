const {
  getRuangansRepo,
  getRuanganByIdRepo,
  createRuanganRepo,
  updateRuanganRepo,
  deleteRuanganRepo,
} = require("../repositories/ruangan_repository.js");
const {
  createFasilitasRepo,
  updateFasilitasRepo,
  deleteFasilitasRepo,
} = require("../repositories/fasilitas_repository.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { BadRequestError, NotFoundError } = require("../utils/request.js");

const getRuangansService = async (
  nama_ruangan,
  Gedung,
  lantai,
  kapasitas,
  status,
  jenis,
  fasilitas,
  jumlah,
  kondisi
) => {
  const data = await getRuangansRepo(
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis,
    fasilitas,
    jumlah,
    kondisi
  );

  if (data.length === 0) {
    throw new NotFoundError("Ruangan not found");
  }

  return data;
};

const getRuanganByIdService = async (id) => {
  const data = await getRuanganByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Ruangan not found");
  }

  return data;
};

const createRuanganService = async (ruangan) => {
  const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas } =
    ruangan;

  // Create ruangan first
  const createRuanganTable = await createRuanganRepo(
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis
  );

  // Create fasilitas if provided
  if (fasilitas && fasilitas.length > 0) {
    await createFasilitasRepo(createRuanganTable.id, fasilitas);
  }

  // Get complete ruangan data with fasilitas
  const newRuang = await getRuanganByIdRepo(createRuanganTable.id);

  return newRuang;
};

const updateRuanganService = async (id, ruangan) => {
  const existingRuangan = await getRuanganByIdRepo(id);
  if (!existingRuangan) {
    throw new NotFoundError("Ruangan not found");
  }

  const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas } =
    ruangan;

  // Update ruangan data
  const updateRuanganData = await updateRuanganRepo(
    id,
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis
  );

  // Update fasilitas if provided
  if (fasilitas && fasilitas.length > 0) {
    await deleteFasilitasRepo(id);
    await createFasilitasRepo(id, fasilitas);
  }

  // Get complete updated ruangan data
  const updatedRuangan = await getRuanganByIdRepo(id);

  return updatedRuangan;
};

const deleteRuanganService = async (id) => {
  const existingRuangan = await getRuanganByIdRepo(id);
  if (!existingRuangan) {
    throw new NotFoundError("Ruangan not found");
  }

  // Delete fasilitas first
  await deleteFasilitasRepo(id);

  // Delete ruangan
  const deletedRuangan = await deleteRuanganRepo(id);

  return {
    message: `Ruangan with ID: ${existingRuangan.id} deleted successfully`,
    data: existingRuangan,
  };
};

module.exports = {
  getRuangansService,
  getRuanganByIdService,
  createRuanganService,
  updateRuanganService,
  deleteRuanganService,
};