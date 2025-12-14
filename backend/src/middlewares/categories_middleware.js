const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetCategories = async (req, res, next) => {
  const validateQuery = z.object({
    organizer_type: z.enum(["Official", "Non_Official"]),
    tingkatan: z.enum(["Internasional", "Nasional", "Regional"]),
    rank: z.enum(["1", "2", "3", "Lainnya"]),
    category_type: z.enum(["Academic", "Non-Academic"]),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

const validateGetCategoryById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

const validateCreateCategory = async (req, res, next) => {
  const validateBody = z.object({
    organizer_type: z.enum(["Official", "Non_Official"]),
    tingkatan: z.enum(["Internasional", "Nasional", "Regional"]),
    rank: z.enum(["1", "2", "3", "Lainnya"]),
    category_type: z.enum(["Academic", "Non-Academic"]),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

const validateUpdateCategory = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    organizer_type: z.enum(["Official", "Non_Official"]),
    tingkatan: z.enum(["Internasional", "Nasional", "Regional"]),
    rank: z.enum(["1", "2", "3", "Lainnya"]),
    category_type: z.enum(["Academic", "Non-Academic"]),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

const validateDeleteCategory = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

module.exports = {
  validateGetCategories,
  validateGetCategoryById,
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
};
