const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetAchievements = async (req, res, next) => {
  const validateQuery = z.object({
    category_type: z.string().optional(),
    title: z.string().optional(),
    grade: z.string().optional(),
    tag: z.string().optional(),
    full_name: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

const validateGetAchievementById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

const validateCreateAchievement = async (req, res, next) => {
  req.body = {
    ...req.body,
    student_id: parseInt(req.body.student_id),
    points: parseInt(req.body.points),
    date: req.body.date ? new Date(req.body.date) : undefined,

    tag_details_id: Array.isArray(req.body.tag_details_id)
        ? req.body.tag_details_id.map((id) => parseInt(id))
        : [parseInt(req.body.tag_details_id)],
  };

  const validateBody = z.object({
    student_id: z.number(),
    category_type: z.enum(["Academic", "Non_Academic"]),
    title: z.string(),
    organizer_name: z.string(),
    date: z.instanceof(Date).refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
    points: z.number().int().positive(),
    grade: z.enum(["A", "B", "C", "D"]),
    tag_details_id: z.array(z.number().positive()),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    return res.status(400).json({ errors: resultValidateBody.error.errors });
  }

  const resultValidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultValidateFileBody.success) {
    return res
      .status(400)
      .json({ errors: resultValidateFileBody.error.errors });
  }
  next();
};

const validateUpdateAchievement = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  req.body = {
    ...req.body,
    student_id: parseInt(req.body.student_id),
    points: parseInt(req.body.points),
    date: req.body.date ? new Date(req.body.date) : undefined,

    tag_details_id: Array.isArray(req.body.tag_details_id)
      ? req.body.tag_details_id.map((id) => parseInt(id))
      : [parseInt(req.body.tag_details_id)],
  };

  const validateBody = z.object({
    student_id: z.number(),
    category_type: z.enum(["Academic", "Non_Academic"]),
    title: z.string(),
    organizer_name: z.string(),
    date: z.instanceof(Date).refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
    points: z.number().int().positive(),
    grade: z.enum(["A", "B", "C", "D"]),
    tag_details_id: z.array(z.number().positive()),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultValidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultValidateFileBody.success) {
    throw new BadRequestError(resultValidateFileBody.error.errors);
  }

  next();
};

const validateDeleteAchievement = (req, res, next) => {
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
  validateGetAchievements,
  validateGetAchievementById,
  validateCreateAchievement,
  validateUpdateAchievement,
  validateDeleteAchievement,
};
