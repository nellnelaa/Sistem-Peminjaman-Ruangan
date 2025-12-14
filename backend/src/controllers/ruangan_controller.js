const { successResponse } = require("../utils/response.js");
const {
  getRuangansService,
  getRuanganByIdService,
  createRuanganService,
  updateRuanganService,
  deleteRuanganService,
} = require("../services/ruangan_service.js");

const getRuangansController = async (req, res) => {
  const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas, jumlah, kondisi} =
    req.query; 

  const data = await getRuangansService(
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
  successResponse(res, data);
};

const getRuanganByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getRuanganByIdService(id);
  successResponse(res, data);
};

const createRuanganController = async (req, res) => {
  const { body } = req;

  const data = await createRuanganService(body);
  successResponse(res, data);
};

const updateRuanganController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateRuanganService(id, body);
  successResponse(res, data);
};

const deleteRuanganController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteRuanganService(id);
  successResponse(res, data);
};

module.exports = {
  getRuangansController,
  getRuanganByIdController,
  createRuanganController,
  updateRuanganController,
  deleteRuanganController,
};
