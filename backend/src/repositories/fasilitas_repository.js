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

const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const createFasilitasRepo = async (ruangan_id, fasilitasArray) => {
  const newFasilitas = await Promise.all(
    fasilitasArray.map(async (item) => {
      return await prisma.fasilitas.create({
        data: {
          fasilitas_details_id: BigInt(item.fasilitas_details_id),
          ruangan_id: BigInt(ruangan_id),
          jumlah: item.jumlah,
          kondisi: item.kondisi,
        },
        include: {
          fasilitas_details_rel: true,
        },
      });
    })
  );

  const serializedFasilitass = JSONBigInt.stringify(newFasilitas);
  return JSONBigInt.parse(serializedFasilitass);
};

const updateFasilitasRepo = async (ruangan_id, fasilitasArray) => {
  // Delete existing fasilitas first
  await prisma.fasilitas.deleteMany({
    where: { ruangan_id: BigInt(ruangan_id) },
  });

  // Create new fasilitas
  const updatedFasilitass = await Promise.all(
    fasilitasArray.map(async (item) => {
      return await prisma.fasilitas.create({
        data: {
          fasilitas_details_id: BigInt(item.fasilitas_details_id),
          ruangan_id: BigInt(ruangan_id),
          jumlah: item.jumlah,
          kondisi: item.kondisi,
        },
        include: {
          fasilitas_details_rel: true,
        },
      });
    })
  );

  const serializedFasilitass = JSONBigInt.stringify(updatedFasilitass);
  return JSONBigInt.parse(serializedFasilitass);
};

const deleteFasilitasRepo = async (ruangan_id) => {
  const deletedFasilitas = await prisma.fasilitas.deleteMany({
    where: { ruangan_id: BigInt(ruangan_id) },
  });

  const serializedFasilitass = JSONBigInt.stringify(deletedFasilitas);
  return JSONBigInt.parse(serializedFasilitass);
};

module.exports = {
  createFasilitasRepo,
  updateFasilitasRepo,
  deleteFasilitasRepo,
};