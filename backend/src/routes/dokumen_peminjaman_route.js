const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  verifikasiDokumenController,
} = require("../controllers/dokumen_peminjaman_controller.js");
const { adminRole } = require("../constants/auth");

const router = express.Router();

router.post(
  "/verifikasi/:id",
  authorization(adminRole), 
  verifikasiDokumenController
);

module.exports = router;
