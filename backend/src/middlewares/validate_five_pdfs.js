const { BadRequestError } = require("../utils/request");

const validateFivePDFs = (req, res, next) => {
  if (!req.files || !req.files.documents) {
    throw new BadRequestError("5 dokumen PDF wajib diupload");
  }

  const files = Array.isArray(req.files.documents)
    ? req.files.documents
    : [req.files.documents];

  if (files.length !== 5) {
    throw new BadRequestError("Jumlah dokumen harus tepat 5 file PDF");
  }

  for (const file of files) {
    if (file.mimetype !== "application/pdf") {
      throw new BadRequestError(`File ${file.name} bukan PDF`);
    }
  }
  req.uploadedDocuments = files;

  next();
};

module.exports = validateFivePDFs;
