const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");

const {
  validateGetTemplates,
  validateGetTemplateById,
  validateCreateTemplate,
  validateUpdateTemplate,
  validateDeleteTemplate,
} = require("../middlewares/template_middleware.js");

const {
  getTemplatesController,
  getTemplateByIdController,
  createTemplateController,
  updateTemplateController,
  deleteTemplateController,
} = require("../controllers/template_controller.js");

const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetTemplates, getTemplatesController)
  .post(
    authorization(adminRole),
    validateCreateTemplate,
    createTemplateController
  );

router
  .route("/:id")
  .get(validateGetTemplateById, getTemplateByIdController)
  .put(
    authorization(adminRole),
    validateUpdateTemplate,
    updateTemplateController
  )
  .delete(
    authorization(adminRole),
    validateDeleteTemplate,
    deleteTemplateController
  );

module.exports = router;
