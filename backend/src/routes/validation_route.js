const express = require("express");
const {
  validateDocumentController,
} = require("../controllers/validation_controller");

const router = express.Router();

router.post("/validate", validateDocumentController);

module.exports = router;
