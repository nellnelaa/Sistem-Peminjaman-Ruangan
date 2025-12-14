// const { z } = require("zod");
// const { BadRequestError } = require("../utils/request");

// const validateGetRuangans = async (req, res, next) => {
//   const validateQuery = z.object({
//     nama_ruangan: z.string().optional(),
//     Gedung: z.string().optional(),
//     lantai: z.string().optional(),
//     kapasitas: z.number().optional(),
//     status: z.string().optional(),
//     jenis: z.string().optional(),
//     fasilitas: z.string().optional(),
//     jumlah: z.number().optional(),
//     kondisi: z.string().optional(),
//   });

//   const resultValidateQuery = validateQuery.safeParse(req.query);
//   if (!resultValidateQuery.success) {
//     throw new BadRequestError(resultValidateQuery.error.errors);
//   }

//   next();
// };

// const validateGetRuanganById = async (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }

//   next();
// };

// const validateCreateRuangan = async (req, res, next) => {
//   req.body = {
//     ...req.body,
//     kapasitas: parseInt(req.body.kapasitas),
//     jumlah: parseInt(req.body.jumlah),

//     fasilitas_details_id: Array.isArray(req.body.fasilitas_details_id)
//       ? req.body.fasilitas_details_id.map((id) => parseInt(id))
//       : [parseInt(req.body.fasilitas_details_id)],
//   };

//   const validateBody = z.object({
//     nama_ruangan: z.string(),
//     Gedung: z.enum(["FIK1", "FIK2"]),
//     lantai: z.enum(["Satu", "Dua", "Tiga"]),
//     kapasitas: z.number().int().positive(),
//     status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
//     jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
//     fasilitas: z
//       .array(
//         z.object({
//           fasilitas_details_id: z.number().positive(),
//           jumlah: z.number().int().positive(),
//           kondisi: z.enum(["baik", "rusak"]),
//         })
//       )
//       .optional(),
//   });

//   const resultValidateBody = validateBody.safeParse(req.body);
//   if (!resultValidateBody.success) {
//     return res.status(400).json({ errors: resultValidateBody.error.errors });
//   }
//   next();
// };

// const validateUpdateRuangan = async (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });
//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }
//   req.body = {
//     ...req.body,
//     kapasitas: parseInt(req.body.kapasitas),
//     jumlah: parseInt(req.body.kapasitas),

//     fasilitas_details_id: Array.isArray(req.body.fasilitas_details_id)
//       ? req.body.fasilitas_details_id.map((id) => parseInt(id))
//       : [parseInt(req.body.fasilitas_details_id)],
//   };

//   const validateBody = z.object({
//     nama_ruangan: z.string(),
//     Gedung: z.enum(["FIK1", "FIK2"]),
//     lantai: z.enum(["Satu", "Dua", "Tiga"]),
//     kapasitas: z.number().int().positive(),
//     status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
//     jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
//     fasilitas: z
//       .object({
//         fasilitas_details_id: z
//           .array(z.number().positive())
//           .nullable()
//           .optional(),
//         jumlah: z.number().int().positive(),
//         kondisi: z.enum(["baik", "rusak"]),
//       })
//       .nullable()
//       .optional(),
//   });

//   const resultValidateBody = validateBody.safeParse(req.body);
//   if (!resultValidateBody.success) {
//     throw new BadRequestError(resultValidateBody.error.errors);
//   }
//   next();
// };

// const validateDeleteRuangan = (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }
//   next();
// };

// module.exports = {
//   validateGetRuangans,
//   validateGetRuanganById,
//   validateCreateRuangan,
//   validateUpdateRuangan,
//   validateDeleteRuangan,
// };















// const { z } = require("zod");
// const { BadRequestError } = require("../utils/request");

// const validateGetRuangans = async (req, res, next) => {
//   const validateQuery = z.object({
//     nama_ruangan: z.string().optional(),
//     Gedung: z.enum(["FIK1", "FIK2"]).optional(),
//     lantai: z.enum(["Satu", "Dua", "Tiga"]).optional(),
//     kapasitas: z.string().optional(),
//     status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]).optional(),
//     jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]).optional(),
//     fasilitas: z.string().optional(),
//     jumlah: z.string().optional(),
//     kondisi: z.enum(["baik", "rusak"]).optional(),
//   });

//   const resultValidateQuery = validateQuery.safeParse(req.query);
//   if (!resultValidateQuery.success) {
//     throw new BadRequestError(resultValidateQuery.error.errors);
//   }

//   next();
// };

// const validateGetRuanganById = async (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }

//   next();
// };

// const validateCreateRuangan = async (req, res, next) => {
//   // Parse kapasitas if exists
//   if (req.body.kapasitas) {
//     req.body.kapasitas = parseInt(req.body.kapasitas);
//   }

//   // Parse fasilitas array if exists
//   if (req.body.fasilitas) {
//     req.body.fasilitas = req.body.fasilitas.map((item) => ({
//       fasilitas_details_id: parseInt(item.fasilitas_details_id),
//       jumlah: parseInt(item.jumlah),
//       kondisi: item.kondisi,
//     }));
//   }

//   const validateBody = z.object({
//     nama_ruangan: z.string(),
//     Gedung: z.enum(["FIK1", "FIK2"]),
//     lantai: z.enum(["Satu", "Dua", "Tiga"]),
//     kapasitas: z.number().int().positive(),
//     status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
//     jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
//     fasilitas: z
//       .array(
//         z.object({
//           fasilitas_details_id: z.number().int().positive(),
//           jumlah: z.number().int().positive(),
//           kondisi: z.enum(["baik", "rusak"]),
//         })
//       )
//       .optional(),
//   });

//   const resultValidateBody = validateBody.safeParse(req.body);
//   if (!resultValidateBody.success) {
//     return res.status(400).json({ errors: resultValidateBody.error.errors });
//   }

//   next();
// };

// const validateUpdateRuangan = async (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }

//   // Parse kapasitas if exists
//   if (req.body.kapasitas) {
//     req.body.kapasitas = parseInt(req.body.kapasitas);
//   }

//   // Parse fasilitas array if exists
//   if (req.body.fasilitas) {
//     req.body.fasilitas = req.body.fasilitas.map((item) => ({
//       fasilitas_details_id: parseInt(item.fasilitas_details_id),
//       jumlah: parseInt(item.jumlah),
//       kondisi: item.kondisi,
//     }));
//   }

//   const validateBody = z.object({
//     nama_ruangan: z.string(),
//     Gedung: z.enum(["FIK1", "FIK2"]),
//     lantai: z.enum(["Satu", "Dua", "Tiga"]),
//     kapasitas: z.number().int().positive(),
//     status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
//     jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
//     fasilitas: z
//       .array(
//         z.object({
//           fasilitas_details_id: z.number().int().positive(),
//           jumlah: z.number().int().positive(),
//           kondisi: z.enum(["baik", "rusak"]),
//         })
//       )
//       .optional(),
//   });

//   const resultValidateBody = validateBody.safeParse(req.body);
//   if (!resultValidateBody.success) {
//     throw new BadRequestError(resultValidateBody.error.errors);
//   }

//   next();
// };

// const validateDeleteRuangan = (req, res, next) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const resultValidateParams = validateParams.safeParse(req.params);
//   if (!resultValidateParams.success) {
//     throw new BadRequestError(resultValidateParams.error.errors);
//   }

//   next();
// };

// module.exports = {
//   validateGetRuangans,
//   validateGetRuanganById,
//   validateCreateRuangan,
//   validateUpdateRuangan,
//   validateDeleteRuangan,
// };




const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetRuangans = async (req, res, next) => {
  const validateQuery = z.object({
    nama_ruangan: z.string().optional(),
    Gedung: z.enum(["FIK1", "FIK2"]).optional(),
    lantai: z.enum(["Satu", "Dua", "Tiga"]).optional(),
    kapasitas: z.string().optional(),
    status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]).optional(),
    jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]).optional(),
    fasilitas: z.string().optional(),
    jumlah: z.string().optional(),
    kondisi: z.enum(["baik", "rusak"]).optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

const validateGetRuanganById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

const validateCreateRuangan = async (req, res, next) => {
  if (req.body.kapasitas) {
    req.body.kapasitas = parseInt(req.body.kapasitas);
  }

  if (req.body.fasilitas) {
    if (!Array.isArray(req.body.fasilitas)) {
      const fasilitasMap = {};

      Object.keys(req.body).forEach((key) => {
        const match = key.match(/^fasilitas\[(\d+)\]\[(\w+)\]$/);
        if (match) {
          const index = match[1];
          const field = match[2];

          if (!fasilitasMap[index]) {
            fasilitasMap[index] = {};
          }

          fasilitasMap[index][field] = req.body[key];
          delete req.body[key];
        }
      });

      req.body.fasilitas = Object.values(fasilitasMap).map((item) => ({
        fasilitas_details_id: parseInt(item.fasilitas_details_id),
        jumlah: parseInt(item.jumlah),
        kondisi: item.kondisi,
      }));
    } else {
      req.body.fasilitas = req.body.fasilitas.map((item) => ({
        fasilitas_details_id: parseInt(item.fasilitas_details_id),
        jumlah: parseInt(item.jumlah),
        kondisi: item.kondisi,
      }));
    }
  }

  const validateBody = z.object({
    nama_ruangan: z.string(),
    Gedung: z.enum(["FIK1", "FIK2"]),
    lantai: z.enum(["Satu", "Dua", "Tiga"]),
    kapasitas: z.number().int().positive(),
    status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
    jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
    fasilitas: z
      .array(
        z.object({
          fasilitas_details_id: z.number().int().positive(),
          jumlah: z.number().int().positive(),
          kondisi: z.enum(["baik", "rusak"]),
        })
      )
      .optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    return res.status(400).json({ errors: resultValidateBody.error.errors });
  }

  next();
};

const validateUpdateRuangan = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  if (req.body.kapasitas) {
    req.body.kapasitas = parseInt(req.body.kapasitas);
  }

  if (req.body.fasilitas) {
    if (!Array.isArray(req.body.fasilitas)) {
      const fasilitasMap = {};

      Object.keys(req.body).forEach((key) => {
        const match = key.match(/^fasilitas\[(\d+)\]\[(\w+)\]$/);
        if (match) {
          const index = match[1];
          const field = match[2];

          if (!fasilitasMap[index]) {
            fasilitasMap[index] = {};
          }

          fasilitasMap[index][field] = req.body[key];
          delete req.body[key];
        }
      });

      req.body.fasilitas = Object.values(fasilitasMap).map((item) => ({
        fasilitas_details_id: parseInt(item.fasilitas_details_id),
        jumlah: parseInt(item.jumlah),
        kondisi: item.kondisi,
      }));
    } else {
      req.body.fasilitas = req.body.fasilitas.map((item) => ({
        fasilitas_details_id: parseInt(item.fasilitas_details_id),
        jumlah: parseInt(item.jumlah),
        kondisi: item.kondisi,
      }));
    }
  }

  const validateBody = z.object({
    nama_ruangan: z.string(),
    Gedung: z.enum(["FIK1", "FIK2"]),
    lantai: z.enum(["Satu", "Dua", "Tiga"]),
    kapasitas: z.number().int().positive(),
    status: z.enum(["Tersedia", "Tidak_Tersedia", "Perbaikan"]),
    jenis: z.enum(["Seminar", "Kelas", "Lab", "dll"]),
    fasilitas: z
      .array(
        z.object({
          fasilitas_details_id: z.number().int().positive(),
          jumlah: z.number().int().positive(),
          kondisi: z.enum(["baik", "rusak"]),
        })
      )
      .optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

const validateDeleteRuangan = (req, res, next) => {
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
  validateGetRuangans,
  validateGetRuanganById,
  validateCreateRuangan,
  validateUpdateRuangan,
  validateDeleteRuangan,
};