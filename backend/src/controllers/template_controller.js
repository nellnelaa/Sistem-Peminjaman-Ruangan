const { successResponse } = require("../utils/response.js");

const {
  getTemplatesService,
  getTemplateByIdService,
  createTemplateService,
  updateTemplateService,
  deleteTemplateService,
} = require("../services/template_service.js");

const getTemplatesController = async (req, res) => {
  const { nama } = req.query;
  const data = await getTemplatesService(nama);

  const message =
    data.length === 0
      ? "Tidak ada template berkas yang tersedia"
      : "Request berhasil";

  successResponse(res, data, message);
};

const getTemplateByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getTemplateByIdService(id);
  successResponse(res, data);
};

const createTemplateController = async (req, res) => {
  const { body } = req;
  const data = await createTemplateService(body);
  successResponse(res, data);
};

const updateTemplateController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const data = await updateTemplateService(id, body);
  successResponse(res, data);
};

const deleteTemplateController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteTemplateService(id);
  successResponse(res, data);
};

module.exports = {
  getTemplatesController,
  getTemplateByIdController,
  createTemplateController,
  updateTemplateController,
  deleteTemplateController,
};
