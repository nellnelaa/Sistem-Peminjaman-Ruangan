const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data"); // WAJIB INSTALL: npm install form-data

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateDocumentService = async (file) => {
  // 1. Pastikan folder uploads ada
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uploadPath = path.join(uploadDir, file.name);

  // 2. SIMPAN FILE KE FOLDER LOKAL
  await file.mv(uploadPath);

  try {
    // 3. SIAPKAN DATA UNTUK DIKIRIM KE PYTHON
    const form = new FormData();
    form.append("file", fs.createReadStream(uploadPath));

    console.log("Mengirim ke Python:", process.env.PYTHON_URL + "/api/deteksi");

    // 4. KIRIM KE PYTHON
    // Perhatikan endpointnya diganti jadi '/api/deteksi' sesuai app.py
    const pythonResponse = await axios.post(
      process.env.PYTHON_URL + "/api/deteksi",
      form,
      {
        headers: {
          ...form.getHeaders(), // Penting agar header Content-Type benar
        },
      }
    );

    // 5. OLAH RESPON DARI PYTHON
    // Python return: { status: "VALID", pesan: "...", data: {...} }
    const resultML = pythonResponse.data;

    console.log("Respon Python:", resultML);

    const isValid = resultML.status === "VALID";
    const messageResponse = resultML.pesan || "Tidak ada pesan";

    // 6. SIMPAN KE DATABASE
    const saved = await prisma.documentValidation.create({
      data: {
        filename: file.name,
        fileUrl: uploadPath, // Atau upload ke cloud jika perlu
        status: isValid ? "VALID" : "INVALID",
        message: messageResponse,
      },
    });

    return saved;
  } catch (error) {
    console.error("Error Python Service:", error.message);
    // Hapus file jika gagal (opsional)
    // fs.unlinkSync(uploadPath);
    throw new Error("Gagal memproses validasi AI: " + error.message);
  }
};

module.exports = {
  validateDocumentService,
};
