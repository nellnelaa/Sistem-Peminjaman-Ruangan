const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetRuangans,
  validateGetRuanganById,
  validateCreateRuangan,
  validateUpdateRuangan,
  validateDeleteRuangan,
} = require("../middlewares/ruangan_middleware.js");
const {
  getRuangansController,
  getRuanganByIdController,
  createRuanganController,
  updateRuanganController,
  deleteRuanganController,
} = require("../controllers/ruangan_controller.js");

const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetRuangans, getRuangansController)
  .post(
    authorization(adminRole),
    validateCreateRuangan,
    createRuanganController
  );

router
  .route("/:id")
  .get(validateGetRuanganById, getRuanganByIdController)
  .put(
    authorization(adminRole),
    validateUpdateRuangan,
    updateRuanganController
  )
  .delete(
    authorization(adminRole),
    validateDeleteRuangan,
    deleteRuanganController
  );

module.exports = router;
