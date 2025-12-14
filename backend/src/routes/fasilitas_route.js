const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetFasils,
  validateGetFasilById,
  validateCreateFasil,
  validateUpdateFasil,
  validateDeleteFasil,
} = require("../middlewares/fasilitas_middleware.js");
const {
  getFasilsController,
  getFasilByIdController,
  createFasilController,
  updateFasilController,
  deleteFasilController,
} = require("../controllers/fasilitas_controller.js");
const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetFasils, getFasilsController)
  .post(authorization(adminRole), validateCreateFasil, createFasilController);

router
  .route("/:id")
  .get(validateGetFasilById, getFasilByIdController)
  .put(authorization(adminRole), validateUpdateFasil, updateFasilController)
  .delete(authorization(adminRole), validateDeleteFasil, deleteFasilController);

module.exports = router;
