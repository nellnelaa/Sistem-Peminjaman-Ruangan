const fileUpload = require("express-fileupload");

const uploadPeminjaman = fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  abortOnLimit: true,
});

module.exports = uploadPeminjaman;
