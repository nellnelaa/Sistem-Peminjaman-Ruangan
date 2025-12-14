const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users_repository");

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new Unauthorized("You need to login!");
    }

    const splittedAuthHeader = authorizationHeader.split(" ");
    if (splittedAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid!");
    }

    const token = splittedAuthHeader[1];

    let extractedToken;
    try {
      extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new Unauthorized("Token has expired. Please log in again.");
      }
      throw new Unauthorized("Token is not valid!");
    }

    const user = await userRepository.getUserById(extractedToken.user_id);

    if (!user) {
      throw new Unauthorized("User not found!");
    }

    const accessValidation = roles.includes(user.role_id);
    if (!accessValidation) {
      throw new Forbidden("You can not access this resource!");
    }

    req.user = user;
    next();
  };

exports.validateRegister = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    no_pokok: z.string(),
    prodi: z
      .enum([
        "Informatika",
        "Sistem_Informasi",
        "Sains_Data",
        "Bisnis_Digital",
        "Lainnya",
      ])
      .optional(),
    fakultas: z.string().nullable().optional(),
    jabatan: z
      .enum(["mahasiswa", "TU", "Dekan", "Wadek_1", "Wadek_2", "Wadek_3"])
      .optional(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) throw new BadRequestError(result.error.errors);

  next();
};

exports.validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
