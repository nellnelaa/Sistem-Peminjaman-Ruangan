const express = require("express");
//const { authorization } = require("../middlewares/auth");
const {
  validateGetCategories,
  validateGetCategoryById,
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
} = require("../middlewares/categories_middleware.js");
const {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categories_controller.js");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  //.get(authorization(adminRole, userRole), validateGetCategories, getCategories)
  .get(validateGetCategories, getCategoriesController)
  //.post(authorization(adminRole), validateCreateCategory, createCategory);
  .post(validateCreateCategory, createCategoryController);

router
  .route("/:id")
  //.get( authorization(adminRole, userRole), validateGetCategoryById, getCategoryById)
  .get(validateGetCategoryById, getCategoryByIdController)
  // .put(authorization(adminRole), validateUpdateCategory, updateCategory)
  // .delete(authorization(adminRole), validateDeleteCategory, deleteCategory);
  .put(validateUpdateCategory, updateCategoryController)
  .delete(validateDeleteCategory, deleteCategoryController);

module.exports = router;
