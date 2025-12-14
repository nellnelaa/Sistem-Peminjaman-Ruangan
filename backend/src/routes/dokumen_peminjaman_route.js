// routes/dokumen_peminjaman_route.js
const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  verifikasiDokumenController,
} = require("../controllers/dokumen_peminjaman_controller.js");
const { adminRole } = require("../constants/auth");

const router = express.Router();

// Route untuk verifikasi dokumen dengan ML
router.post(
  "/verifikasi/:id",
  authorization(adminRole), // Hanya admin yang bisa verifikasi
  verifikasiDokumenController
);

module.exports = router;
