

// /route/ruangan
// const express = require("express");
// const { authorization } = require("../middlewares/auth_middleware.js");
// const {
//   validateGetRuangans,
//   validateGetRuanganById,
//   validateCreateRuangan,
//   validateUpdateRuangan,
//   validateDeleteRuangan,
// } = require("../middlewares/ruangan_middleware.js");
// const {
//   getRuangansController,
//   getRuanganByIdController,
//   createRuanganController,
//   updateRuanganController,
//   deleteRuanganController,
// } = require("../controllers/ruangan_controller.js");

// const { adminRole } = require("../constants/auth");

// const router = express.Router();

// router
//   .route("/")
//   .get(validateGetRuangans, getRuangansController)
//   .post(
//     authorization(adminRole),
//     validateCreateRuangan,
//     createRuanganController
//   );

// router
//   .route("/:id")
//   .get(validateGetRuanganById, getRuanganByIdController)
//   .put(
//     authorization(adminRole),
//     validateUpdateRuangan,
//     updateRuanganController
//   )
//   .delete(
//     authorization(adminRole),
//     validateDeleteRuangan,
//     deleteRuanganController
//   );

// module.exports = router;


// /middleware/ruangan
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


// /controller/ruangan
// const { successResponse } = require("../utils/response.js");
// const {
//   getRuangansService,
//   getRuanganByIdService,
//   createRuanganService,
//   updateRuanganService,
//   deleteRuanganService,
// } = require("../services/ruangan_service.js");

// const getRuangansController = async (req, res) => {
//   const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas, jumlah, kondisi} =
//     req.query; 

//   const data = await getRuangansService(
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis,
//     fasilitas,
//     jumlah,
//     kondisi
//   );
//   successResponse(res, data);
// };

// const getRuanganByIdController = async (req, res) => {
//   const { id } = req.params;

//   const data = await getRuanganByIdService(id);
//   successResponse(res, data);
// };

// const createRuanganController = async (req, res) => {
//   const { body } = req;

//   const data = await createRuanganService(body);
//   successResponse(res, data);
// };

// const updateRuanganController = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   const data = await updateRuanganService(id, body);
//   successResponse(res, data);
// };

// const deleteRuanganController = async (req, res) => {
//   const { id } = req.params;

//   const data = await deleteRuanganService(id);
//   successResponse(res, data);
// };

// module.exports = {
//   getRuangansController,
//   getRuanganByIdController,
//   createRuanganController,
//   updateRuanganController,
//   deleteRuanganController,
// };


// /service/ruangan
// const {
//   getRuangansRepo,
//   getRuanganByIdRepo,
//   createRuanganRepo,
//   updateRuanganRepo,
//   deleteRuanganRepo,
// } = require("../repositories/ruangan_repository.js");
// const {
//   createFasilitasRepo,
//   updateFasilitasRepo,
//   deleteFasilitasRepo,
// } = require("../repositories/fasilitas_repository.js");

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const { BadRequestError, NotFoundError } = require("../utils/request.js");
// const { imageUpload } = require("../utils/imageHandler.js");
// const e = require("express");

// const getRuangansService = async (
//   nama_ruangan,
//   Gedung,
//   lantai,
//   kapasitas,
//   status,
//   jenis,
//   fasilitas,
//   jumlah,
//   kondisi
// ) => {
//   const data = await getRuangansRepo(
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis,
//     fasilitas,
//     jumlah,
//     kondisi
//   );
//   if (data.length === 0) {
//     throw new NotFoundError("Ruangan not found");
//   }
//   return data;
// };

// const getRuanganByIdService = async (id) => {
//   const data = await getRuanganByIdRepo(id);

//   if (!data) {
//     throw new NotFoundError("Ruangan not found");
//   }

//   return data;
// };

// const createRuanganService = async (ruangan) => {
//   const {
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis,
//     fasilitas_details_id,
//     jumlah,
//     kondisi,
//   } = ruangan;

//   const createRuanganTable = await createRuanganRepo(
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis
//   );

//   const createFasilitasTable = await createFasilitasRepo(
//     fasilitas_details_id,
//     jumlah,
//     kondisi,
//     createRuanganTable.id
//   );
//   console.log(`Fasilitas created with ID: ${createFasilitasTable.id}`);

//   const newRuang = await getRuanganByIdRepo(createRuanganTable.id);

//   return newRuang;
// };

// const updateRuanganService = async (id, ruangan) => {
//   const existingruangan = await getRuanganByIdRepo(id);
//   if (!existingruangan) {
//     throw new NotFoundError("ruangan not found");
//   }

//   const {
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis,
//     fasilitas_details_id,
//     jumlah,
//     kondisi,
//   } = ruangan;

//   const updateruangan = await updateRuanganRepo(
//     id,
//     nama_ruangan,
//     Gedung,
//     lantai,
//     kapasitas,
//     status,
//     jenis
//   );

//   await deleteFasilitasRepo(id);
//   await createFasilitasRepo(fasilitas_details_id, jumlah, kondisi, id);

//   if (!updateruangan) {
//     throw new BadRequestError("Failed to update");
//   }

//   return updateruangan;
// };

// const deleteRuanganService = async (id) => {
//   const existingruangan = await getRuanganByIdRepo(id);
//   if (!existingruangan) {
//     throw new NotFoundError("ruangan not found");
//   }
//   await deleteFasilitasRepo(id);
//   const deleteruangan = await deleteRuanganRepo(id);

//   return {
//     message: `ruangan with ID: ${existingruangan.id} deleted successfully`,
//     data: existingruangan,
//   };
// };

// module.exports = {
//   getRuangansService,
//   getRuanganByIdService,
//   createRuanganService,
//   updateRuanganService,
//   deleteRuanganService,
// };

// /repositories/ruangan
// const { PrismaClient } = require("@prisma/client");
// const JSONBigInt = require("json-bigint");

// const prisma = new PrismaClient();

// const getRuangansRepo = async (
//   nama_ruangan,
//   Gedung,
//   lantai,
//   kapasitas,
//   status,
//   jenis,
//   fasilitas,
//   jumlah,
//   kondisi
// ) => {
//   const where = {};

//   if (fasilitas) {
//     where.fasilitas = {
//       some: {
//         fasilitas_details: {
//           nama: {
//             contains: nama,
//             mode: "insensitive",
//           },
//         },
//       },
//     };
//   }
//   if (fasilitas) {
//     where.fasilitas = {
//       some: {
//         fasilitas_details: {
//           kondisi: {
//             contains: kondisi,
//             mode: "insensitive",
//           },
//         },
//       },
//     };
//   }

//   if (nama_ruangan) {
//     where.nama_ruangan = {
//       contains: nama_ruangan,
//       mode: "insensitive",
//     };
//   }

//   if (Gedung) {
//     where.Gedung = {
//       equals: Gedung,
//     };
//   }

//   if (lantai) {
//     where.lantai = {
//       contains: lantai,
//       mode: "insensitive",
//     };
//   }
//   if (kapasitas) {
//     where.kapasitas = {
//       contains: kapasitas,
//       mode: "insensitive",
//     };
//   }
//   if (status) {
//     where.status = {
//       contains: status,
//       mode: "insensitive",
//     };
//   }
//   if (jenis) {
//     where.jenis = {
//       contains: jenis,
//       mode: "insensitive",
//     };
//   }

//   const searchedRuangans = await prisma.ruangan.findMany({
//     where,
//     include: {
//       fasilitas: {
//         include: {
//           fasilitas_details: true,
//         },
//       },
//     },
//     orderBy: {
//       id: "asc",
//     },
//   });

//   const serializedRuangans = JSONBigInt.stringify(searchedRuangans);
//   return JSONBigInt.parse(serializedRuangans);
// };

// const getRuanganByIdRepo = async (id) => {
//   const ruangan = await prisma.ruangan.findFirst({
//     where: {
//       id: id,
//     },
//     include: {
//       fasilitas: {
//         include: {
//           fasilitas_details: true,
//         },
//       },
//     },
//     orderBy: {
//       id: "asc",
//     },
//   });
//   const serializedRuangans = JSONBigInt.stringify(ruangan);
//   return JSONBigInt.parse(serializedRuangans);
// };

// const createRuanganRepo = async (
//   nama_ruangan,
//   Gedung,
//   lantai,
//   kapasitas,
//   status,
//   jenis
// ) => {
//   const newRuangan = await prisma.ruangan.create({
//     data: {
//       nama_ruangan,
//       Gedung,
//       lantai,
//       kapasitas,
//       status,
//       jenis,
//     },
//     include: {
//       fasilitas: {
//         include: {
//           fasilitas_details: true,
//         },
//       },
//     },
//   });

//   const serializedRuangan = JSONBigInt.stringify(newRuangan);
//   return JSONBigInt.parse(serializedRuangan);
// };

// const updateRuanganRepo = async (
//   nama_ruangan,
//   Gedung,
//   lantai,
//   kapasitas,
//   status,
//   jenis
// ) => {
//   const updatedRuangan = await prisma.ruangan.update({
//     where: { id },
//     data: {
//       nama_ruangan,
//       Gedung,
//       lantai,
//       kapasitas,
//       status,
//       jenis,
//     },
//   });

//   const serializedRuangans = JSONBigInt.stringify(updatedRuangan);
//   return JSONBigInt.parse(serializedRuangans);
// };

// const deleteRuanganRepo = async (id) => {
//   const deletedRuangan = await prisma.ruangan.delete({
//     where: { id },
//   });

//   const serializedRuangan = JSONBigInt.stringify(deletedRuangan);
//   return JSONBigInt.parse(serializedRuangan);
// };

// module.exports = {
//   getRuangansRepo,
//   getRuanganByIdRepo,
//   createRuanganRepo,
//   updateRuanganRepo,
//   deleteRuanganRepo,
// };

// /repositories/fasilitas
// const { PrismaClient } = require("@prisma/client");
// const JSONBigInt = require("json-bigint");
// const prisma = new PrismaClient();

// const createFasilitasRepo = async (fasilitas_details_id, ruangan_id, jumlah, kondisi) => {
//   const newFasilitas = fasilitas_details_id.map(async (id) => {
//     await prisma.fasilitas.create({
//       data: {
//         fasilitas_details_id: id,
//         ruangan_id,
//         jumlah,
//         kondisi,
//       },
//     });
//   });

//   const serializedFasilitass = JSONBigInt.stringify(newFasilitas);
//   return JSONBigInt.parse(serializedFasilitass);
// };

// const updateFasilitasRepo = async (fasilitas_details_id, ids, kondisi, jumlah) => {
//   const fasilitassTarget = await prisma.fasilitas.findMany({
//     where: { ruangan_id: ids },
//   });

//   const updatedFasilitass = await Promise.all(
//     fasilitas_details_id.map(async (id, index) => {
//       return await prisma.fasilitas.update({
//         where: { id: fasilitassTarget[index].id },
//         data: {
//           fasilitas_details_id: id,
//           ruangan_id: ids,
//           jumlah,
//           kondisi,
//         },
//       });
//     })
//   );

//   const serializedFasilitass = JSONBigInt.stringify(updatedFasilitass);
//   return JSONBigInt.parse(serializedFasilitass);
// };

// const deleteFasilitasRepo = async (ruangan_id) => {
//   const deletedFasilitas = await prisma.fasilitas.deleteMany({
//     where: { ruangan_id },
//   });

//   const serializedFasilitass = JSONBigInt.stringify(deletedFasilitas);
//   return JSONBigInt.parse(serializedFasilitass);
// };

// module.exports = {
//   createFasilitasRepo,
//   updateFasilitasRepo,
//   deleteFasilitasRepo,
// };
