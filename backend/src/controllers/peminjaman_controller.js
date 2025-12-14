// controllers/peminjaman_controller.js
const { successResponse } = require("../utils/response.js");
const {
  getPeminjamansService,
  getPeminjamanByIdService,
  createPeminjamanService,
  updatePeminjamanService,
  deletePeminjamanService,
} = require("../services/peminjaman_service.js");

const getPeminjamansController = async (req, res) => {
  const {
    user_id,
    ruangan_id,
    nama_kegiatan,
    tanggal_kegiatan,
    status_peminjaman,
  } = req.query;

  const data = await getPeminjamansService(
    user_id,
    ruangan_id,
    nama_kegiatan,
    tanggal_kegiatan,
    status_peminjaman
  );
  successResponse(res, data);
};

const getPeminjamanByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getPeminjamanByIdService(id);
  successResponse(res, data);
};

const createPeminjamanController = async (req, res) => {
  const { body, files } = req;

  body.user_id = req.user.id;

  const data = await createPeminjamanService(body, files);
  successResponse(res, data);
};

const updatePeminjamanController = async (req, res) => {
  const { id } = req.params;
  const { body, files } = req;

  const data = await updatePeminjamanService(id, body, files, req.user);
  successResponse(res, data);
};

const deletePeminjamanController = async (req, res) => {
  const { id } = req.params;
  const data = await deletePeminjamanService(id, req.user);
  successResponse(res, data);
};

module.exports = {
  getPeminjamansController,
  getPeminjamanByIdController,
  createPeminjamanController,
  updatePeminjamanController,
  deletePeminjamanController,
};
