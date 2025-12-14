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

// // const createRuanganService = async (ruangan) => {
// //   const {
// //     nama_ruangan,
// //     Gedung,
// //     lantai,
// //     kapasitas,
// //     status,
// //     jenis,
// //     fasilitas_details_id,
// //     jumlah,
// //     kondisi,
// //   } = ruangan;

// //   const createRuanganTable = await createRuanganRepo(
// //     nama_ruangan,
// //     Gedung,
// //     lantai,
// //     kapasitas,
// //     status,
// //     jenis
// //   );

// //   const createFasilitasTable = await createFasilitasRepo(
// //     fasilitas_details_id,
// //     jumlah,
// //     kondisi,
// //     createRuanganTable.id
// //   );
// //   console.log(`Fasilitas created with ID: ${createFasilitasTable.id}`);

// //   const newRuang = await getRuanganByIdRepo(createRuanganTable.id);

// //   return newRuang;
// // };

// const createRuanganService = async (ruangan) => {
//   const { fasilitas, ...dataRuangan } = ruangan;

//   const createRuangan = await createRuanganRepo(dataRuangan);

//   if (fasilitas?.length > 0) {
//     await Promise.all(
//       fasilitas.map((f) =>
//         createFasilitasRepo(
//           f.fasilitas_details_id,
//           f.jumlah,
//           f.kondisi,
//           createRuangan.id
//         )
//       )
//     );
//   }

//   return getRuanganByIdRepo(createRuangan.id);
// };

// // const updateRuanganService = async (id, ruangan) => {
// //   const existingruangan = await getRuanganByIdRepo(id);
// //   if (!existingruangan) {
// //     throw new NotFoundError("ruangan not found");
// //   }

// //   const {
// //     nama_ruangan,
// //     Gedung,
// //     lantai,
// //     kapasitas,
// //     status,
// //     jenis,
// //     fasilitas_details_id,
// //     jumlah,
// //     kondisi,
// //   } = ruangan;

// //   const updateruangan = await updateRuanganRepo(
// //     id,
// //     nama_ruangan,
// //     Gedung,
// //     lantai,
// //     kapasitas,
// //     status,
// //     jenis
// //   );

// //   await deleteFasilitasRepo(id);
// //   await createFasilitasRepo(fasilitas_details_id, jumlah, kondisi, id);

// //   if (!updateruangan) {
// //     throw new BadRequestError("Failed to update");
// //   }

// //   return updateruangan;
// // };

// const updateRuanganService = async (id, ruangan) => {
//   const { fasilitas, ...dataRuangan } = ruangan;

//   const updated = await updateRuanganRepo(id, dataRuangan);

//   // Hapus semua fasilitas lama
//   await deleteFasilitasRepo(id);

//   // Insert baru
//   if (fasilitas?.length > 0) {
//     await Promise.all(
//       fasilitas.map((f) =>
//         createFasilitasRepo(f.fasilitas_details_id, f.jumlah, f.kondisi, id)
//       )
//     );
//   }

//   return getRuanganByIdRepo(id);
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

const {
  getRuangansRepo,
  getRuanganByIdRepo,
  createRuanganRepo,
  updateRuanganRepo,
  deleteRuanganRepo,
} = require("../repositories/ruangan_repository.js");
const {
  createFasilitasRepo,
  updateFasilitasRepo,
  deleteFasilitasRepo,
} = require("../repositories/fasilitas_repository.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { BadRequestError, NotFoundError } = require("../utils/request.js");

const getRuangansService = async (
  nama_ruangan,
  Gedung,
  lantai,
  kapasitas,
  status,
  jenis,
  fasilitas,
  jumlah,
  kondisi
) => {
  const data = await getRuangansRepo(
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis,
    fasilitas,
    jumlah,
    kondisi
  );

  if (data.length === 0) {
    throw new NotFoundError("Ruangan not found");
  }

  return data;
};

const getRuanganByIdService = async (id) => {
  const data = await getRuanganByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Ruangan not found");
  }

  return data;
};

const createRuanganService = async (ruangan) => {
  const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas } =
    ruangan;

  // Create ruangan first
  const createRuanganTable = await createRuanganRepo(
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis
  );

  // Create fasilitas if provided
  if (fasilitas && fasilitas.length > 0) {
    await createFasilitasRepo(createRuanganTable.id, fasilitas);
  }

  // Get complete ruangan data with fasilitas
  const newRuang = await getRuanganByIdRepo(createRuanganTable.id);

  return newRuang;
};

const updateRuanganService = async (id, ruangan) => {
  const existingRuangan = await getRuanganByIdRepo(id);
  if (!existingRuangan) {
    throw new NotFoundError("Ruangan not found");
  }

  const { nama_ruangan, Gedung, lantai, kapasitas, status, jenis, fasilitas } =
    ruangan;

  // Update ruangan data
  const updateRuanganData = await updateRuanganRepo(
    id,
    nama_ruangan,
    Gedung,
    lantai,
    kapasitas,
    status,
    jenis
  );

  // Update fasilitas if provided
  if (fasilitas && fasilitas.length > 0) {
    await deleteFasilitasRepo(id);
    await createFasilitasRepo(id, fasilitas);
  }

  // Get complete updated ruangan data
  const updatedRuangan = await getRuanganByIdRepo(id);

  return updatedRuangan;
};

const deleteRuanganService = async (id) => {
  const existingRuangan = await getRuanganByIdRepo(id);
  if (!existingRuangan) {
    throw new NotFoundError("Ruangan not found");
  }

  // Delete fasilitas first
  await deleteFasilitasRepo(id);

  // Delete ruangan
  const deletedRuangan = await deleteRuanganRepo(id);

  return {
    message: `Ruangan with ID: ${existingRuangan.id} deleted successfully`,
    data: existingRuangan,
  };
};

module.exports = {
  getRuangansService,
  getRuanganByIdService,
  createRuanganService,
  updateRuanganService,
  deleteRuanganService,
};