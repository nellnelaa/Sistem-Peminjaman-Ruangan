const { BadRequestError } = require("../utils/request");
const { validateDocumentService } = require("../services/validation_service");

const validateDocumentController = async (req, res) => {
  if (!req.files || !req.files.file) {
    throw new BadRequestError("PDF tidak ditemukan di request.");
  }
  const result = await validateDocumentService(req.files.file);
  res.json({
    message: "Document processed",
    data: result,
  });
};

module.exports = {
  validateDocumentController,
};
