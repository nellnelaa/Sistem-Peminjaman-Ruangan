const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data"); 

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateDocumentService = async (file) => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uploadPath = path.join(uploadDir, file.name);

  await file.mv(uploadPath);

  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(uploadPath));

    console.log("Mengirim ke Python:", process.env.PYTHON_URL + "/api/deteksi");

    const pythonResponse = await axios.post(
      process.env.PYTHON_URL + "/api/deteksi",
      form,
      {
        headers: {
          ...form.getHeaders(), 
        },
      }
    );

    const resultML = pythonResponse.data;

    console.log("Respon Python:", resultML);

    const isValid = resultML.status === "VALID";
    const messageResponse = resultML.pesan || "Tidak ada pesan";

    const saved = await prisma.documentValidation.create({
      data: {
        filename: file.name,
        fileUrl: uploadPath,
        status: isValid ? "VALID" : "INVALID",
        message: messageResponse,
      },
    });

    return saved;
  } catch (error) {
    console.error("Error Python Service:", error.message);
    throw new Error("Gagal memproses validasi AI: " + error.message);
  }
};

module.exports = {
  validateDocumentService,
};
