const {
  getCategoriesRepo,
  getCategoryByIdRepo,
  getCategoryByNISRepo,
  createCategoryRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
} = require("../repositories/categories_repository.js");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getCategoriesService = async (organizer_type, tingkatan, rank,  category_type) => {
  return getCategoriesRepo(organizer_type, tingkatan, rank,  category_type);
};

const getCategoryByIdService = async (id) => {
  const data = await getCategoryByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Category is not found!");
  }
  return data;
};

const createCategoryService = async (data) => {
//   const existingCategory = await getCategoryByNISRepo(data.NIS);
//   if (existingCategory) {
//     throw new BadRequestError("NIS sudah terdaftar");
//   }

  const newCategory = await createCategoryRepo(data);
  return newCategory;
};

const updateCategoryService = async (id, data) => {
  const existingCategory = await getCategoryByIdRepo(id);
  if (!existingCategory) {
    throw new NotFoundError("Category is not found!");
  }
//   const CategoryWithSameNIS = await getCategoryByNISRepo(data.NIS, Number(id));
//   if (CategoryWithSameNIS) {
//     throw new BadRequestError("NIS sudah terdaftar oleh siswa lain");
//   }

  const updatedCategory = await updateCategoryRepo(id, data);
  if (!updatedCategory) {
    throw new InternalServerError("Failed to update Category");
  }

  return updatedCategory;
};

const deleteCategoryService = async (id) => {
  const existingCategory = await getCategoryByIdRepo(id);
  if (!existingCategory) {
    throw new NotFoundError("Category data is not found!");
  }

  const deletedCategory = await deleteCategoryRepo(id);
  if (!deletedCategory) {
    throw new InternalServerError("Failed to delete spec");
  }

  return deletedCategory;
};

module.exports = {
  getCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
