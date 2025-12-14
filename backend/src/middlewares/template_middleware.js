const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

// GET ALL
const validateGetTemplates = async (req, res, next) => {
  const validateQuery = z.object({
    nama: z.string().optional(),
  });

  const result = validateQuery.safeParse(req.query);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

// GET BY ID
const validateGetTemplateById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

// CREATE
const validateCreateTemplate = async (req, res, next) => {
  const validateBody = z.object({
    nama_berkas: z.string(),
    file_path: z.string(), // kalau mau optional: z.string().optional()
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

// UPDATE
const validateUpdateTemplate = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultParams = validateParams.safeParse(req.params);
  if (!resultParams.success) {
    throw new BadRequestError(resultParams.error.errors);
  }

  const validateBody = z.object({
    nama_berkas: z.string(),
    file_path: z.string(),
  });

  const resultBody = validateBody.safeParse(req.body);
  if (!resultBody.success) {
    throw new BadRequestError(resultBody.error.errors);
  }

  next();
};

// DELETE
const validateDeleteTemplate = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

module.exports = {
  validateGetTemplates,
  validateGetTemplateById,
  validateCreateTemplate,
  validateUpdateTemplate,
  validateDeleteTemplate,
};
