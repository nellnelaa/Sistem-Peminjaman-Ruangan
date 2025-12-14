const { successResponse } = require("../utils/response.js");
const {
  getCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/categories_service.js");

const getCategoriesController = async (req, res) => {
  const { organizer_type, tingkatan, rank,  category_type } = req.query;

  const data = await getCategoriesService(
    organizer_type,
    tingkatan,
    rank,
    category_type
  );

  const message =
    data.length === 0
      ? "data tidak ditemukan."
      : "Request berhasil";

  successResponse(res, data, message);
};

const getCategoryByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getCategoryByIdService(id);
  successResponse(res, data);
};

const createCategoryController = async (req, res) => {
  const { body } = req;

  const data = await createCategoryService(body);
  successResponse(res, data);
};

const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateCategoryService(id, body);
  if (!data) throw new BadRequestError("Missing update data.");
  successResponse(res, data);
};

const deleteCategoryController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteCategoryService(id);
  successResponse(res, data);
};

module.exports = {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
