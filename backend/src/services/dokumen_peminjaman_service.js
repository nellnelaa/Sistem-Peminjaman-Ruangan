const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { NotFoundError, BadRequestError } = require("../utils/request.js");
const {
  getDokumenByIdRepo,
  updateDokumenVerifikasiRepo,
} = require("../repositories/dokumen_peminjaman_repository.js");

const verifikasiDokumenService = async (dokumen_id) => {
  const dokumen = await getDokumenByIdRepo(dokumen_id);

  if (!dokumen) {
    throw new NotFoundError("Dokumen tidak ditemukan");
  }

  if (!dokumen.file_url || !fs.existsSync(dokumen.file_url)) {
    throw new BadRequestError("File dokumen tidak ditemukan di server");
  }

  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(dokumen.file_url));

    console.log(
      "Mengirim dokumen ke ML:",
      process.env.PYTHON_URL + "/api/deteksi"
    );

    const pythonResponse = await axios.post(
      process.env.PYTHON_URL + "/api/deteksi",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        timeout: 60000, 
      }
    );

    const resultML = pythonResponse.data;
    console.log("Response dari ML:", resultML);

    const isValid = resultML.status === "VALID";
    const status_verifikasi = isValid ? "Valid" : "Tidak_Valid";
    const catatan_verifikator =
      resultML.pesan || resultML.message || "Verifikasi otomatis oleh ML";

    const updatedDokumen = await updateDokumenVerifikasiRepo(
      dokumen_id,
      status_verifikasi,
      catatan_verifikator
    );

    await prisma.documentValidation.create({
      data: {
        filename: path.basename(dokumen.file_url),
        fileUrl: dokumen.file_url,
        status: isValid ? "VALID" : "INVALID",
        message: catatan_verifikator,
      },
    });

    return {
      message: "Verifikasi dokumen berhasil",
      dokumen: updatedDokumen,
      ml_result: {
        status: resultML.status,
        message: catatan_verifikator,
        confidence: resultML.confidence || null,
        details: resultML.data || null,
      },
    };
  } catch (error) {
    console.error("Error saat verifikasi ML:", error.message);

    await updateDokumenVerifikasiRepo(
      dokumen_id,
      "Tidak_Valid",
      `Gagal verifikasi: ${error.message}`
    );

    throw new BadRequestError(
      `Gagal memverifikasi dokumen dengan ML: ${error.message}`
    );
  }
};

module.exports = {
  verifikasiDokumenService,
};
