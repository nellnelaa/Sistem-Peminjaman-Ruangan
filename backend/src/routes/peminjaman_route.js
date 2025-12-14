// routes/peminjaman_route.js
const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetPeminjamans,
  validateGetPeminjamanById,
  validateCreatePeminjaman,
  validateUpdatePeminjaman,
  validateDeletePeminjaman,
} = require("../middlewares/peminjaman_middleware.js");
const {
  getPeminjamansController,
  getPeminjamanByIdController,
  createPeminjamanController,
  updatePeminjamanController,
  deletePeminjamanController,
} = require("../controllers/peminjaman_controller.js");
const { adminRole, mahasiswa } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, mahasiswa),
    validateGetPeminjamans,
    getPeminjamansController
  )
  .post(
    authorization(adminRole, mahasiswa),
    validateCreatePeminjaman,
    createPeminjamanController
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, mahasiswa),
    validateGetPeminjamanById,
    getPeminjamanByIdController
  )
  .put(
    authorization(adminRole, mahasiswa),
    validateUpdatePeminjaman,
    updatePeminjamanController
  )
  .delete(
    authorization(adminRole, mahasiswa),
    validateDeletePeminjaman,
    deletePeminjamanController
  );

module.exports = router;
