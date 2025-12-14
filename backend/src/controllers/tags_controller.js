const { successResponse } = require("../utils/response.js");
const {
  getTagsService,
  getTagByIdService,
  createTagService,
  updateTagService,
  deleteTagService,
} = require("../services/tags_service.js");

const getTagsController = async (req, res) => {
  const { tag } = req.query;

  const data = await getTagsService(tag);

  const message =
    data.length === 0
      ? "Tidak ada tag yang tersedia"
      : "Request berhasil";

  successResponse(res, data, message);
};

const getTagByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getTagByIdService(id);
  successResponse(res, data);
};

const createTagController = async (req, res) => {
  const { body } = req;

  const data = await createTagService(body);
  successResponse(res, data);
};

const updateTagController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateTagService(id, body);
  if (!data) throw new BadRequestError("Missing update data.");
  successResponse(res, data);
};

const deleteTagController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteTagService(id);
  successResponse(res, data);
};

module.exports = {
  getTagsController,
  getTagByIdController,
  createTagController,
  updateTagController,
  deleteTagController,
};
