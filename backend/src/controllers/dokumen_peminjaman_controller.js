const { successResponse } = require("../utils/response.js");
const {
  verifikasiDokumenService,
} = require("../services/dokumen_peminjaman_service.js");

const verifikasiDokumenController = async (req, res) => {
  const { id } = req.params; 
  const data = await verifikasiDokumenService(id);
  successResponse(res, data);
};

module.exports = {
  verifikasiDokumenController,
};
