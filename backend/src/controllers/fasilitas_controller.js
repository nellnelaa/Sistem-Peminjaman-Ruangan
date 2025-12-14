const { successResponse } = require("../utils/response.js");
const {
  getFasilsService,
  getFasilByIdService,
  createFasilService,
  updateFasilService,
  deleteFasilService,
} = require("../services/fasilitas_service.js");

const getFasilsController = async (req, res) => {
  const { nama } = req.query;

  const data = await getFasilsService(nama);

  const message =
    data.length === 0 ? "Tidak ada Fasilitas yang tersedia" : "Request berhasil";

  successResponse(res, data, message);
};

const getFasilByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getFasilByIdService(id);
  successResponse(res, data);
};

const createFasilController = async (req, res) => {
  const { body } = req;

  const data = await createFasilService(body);
  successResponse(res, data);
};

const updateFasilController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateFasilService(id, body);
  if (!data) throw new BadRequestError("Missing update data.");
  successResponse(res, data);
};

const deleteFasilController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteFasilService(id);
  successResponse(res, data);
};

module.exports = {
  getFasilsController,
  getFasilByIdController,
  createFasilController,
  updateFasilController,
  deleteFasilController,
};
