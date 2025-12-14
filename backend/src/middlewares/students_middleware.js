const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetStudents = async (req, res, next) => {
  const validateQuery = z.object({
    NIS: z.string().optional().nullable(),
    full_name: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

const validateGetStudentById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

const validateCreateStudent = async (req, res, next) => {
  req.body = {
    ...req.body,
    graduation_year: parseInt(req.body.graduation_year),
  };

  const validateBody = z.object({
    NIS: z.string(),
    full_name: z.string(),
    class_name: z.enum(["grade_10", "grade_11", "grade_12"]),
    graduation_year: z.number().int().positive(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

const validateUpdateStudent = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  if (req.body.graduation_year) {
    req.body.graduation_year = Number(req.body.graduation_year);
  }

  const validateBody = z.object({
    NIS: z.string(),
    full_name: z.string(),
    class_name: z.enum(["grade_10", "grade_11", "grade_12"]),
    graduation_year: z
      .number()
      .min(new Date().getFullYear())
      .nullable()
      .optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

const validateDeleteStudent = (req, res, next) => {
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
  validateGetStudents,
  validateGetStudentById,
  validateCreateStudent,
  validateUpdateStudent,
  validateDeleteStudent,
};
