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

const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getRuangansRepo = async (
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
  const where = {};

  if (nama_ruangan) {
    where.nama_ruangan = {
      contains: nama_ruangan,
      mode: "insensitive",
    };
  }

  if (Gedung) {
    where.Gedung = {
      equals: Gedung,
    };
  }

  if (lantai) {
    where.lantai = {
      equals: lantai,
    };
  }

  if (kapasitas) {
    where.kapasitas = {
      gte: parseInt(kapasitas),
    };
  }

  if (status) {
    where.status = {
      equals: status,
    };
  }

  if (jenis) {
    where.jenis = {
      equals: jenis,
    };
  }

  // Filter by fasilitas name
  if (fasilitas) {
    where.fasilitas = {
      some: {
        fasilitas_details_rel: {
          nama: {
            contains: fasilitas,
            mode: "insensitive",
          },
        },
      },
    };
  }

  // Filter by kondisi
  if (kondisi) {
    where.fasilitas = {
      ...where.fasilitas,
      some: {
        ...where.fasilitas?.some,
        kondisi: {
          equals: kondisi,
        },
      },
    };
  }

  const searchedRuangans = await prisma.ruangan.findMany({
    where,
    include: {
      fasilitas: {
        include: {
          fasilitas_details_rel: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const serializedRuangans = JSONBigInt.stringify(searchedRuangans);
  return JSONBigInt.parse(serializedRuangans);
};

const getRuanganByIdRepo = async (id) => {
  const ruangan = await prisma.ruangan.findFirst({
    where: {
      id: BigInt(id),
    },
    include: {
      fasilitas: {
        include: {
          fasilitas_details_rel: true,
        },
      },
    },
  });

  const serializedRuangans = JSONBigInt.stringify(ruangan);
  return JSONBigInt.parse(serializedRuangans);
};

const createRuanganRepo = async (
  nama_ruangan,
  Gedung,
  lantai,
  kapasitas,
  status,
  jenis
) => {
  const newRuangan = await prisma.ruangan.create({
    data: {
      nama_ruangan,
      Gedung,
      lantai,
      kapasitas,
      status,
      jenis,
    },
    include: {
      fasilitas: {
        include: {
          fasilitas_details_rel: true,
        },
      },
    },
  });

  const serializedRuangan = JSONBigInt.stringify(newRuangan);
  return JSONBigInt.parse(serializedRuangan);
};

const updateRuanganRepo = async (
  id,
  nama_ruangan,
  Gedung,
  lantai,
  kapasitas,
  status,
  jenis
) => {
  const updatedRuangan = await prisma.ruangan.update({
    where: { id: BigInt(id) },
    data: {
      nama_ruangan,
      Gedung,
      lantai,
      kapasitas,
      status,
      jenis,
    },
    include: {
      fasilitas: {
        include: {
          fasilitas_details_rel: true,
        },
      },
    },
  });

  const serializedRuangans = JSONBigInt.stringify(updatedRuangan);
  return JSONBigInt.parse(serializedRuangans);
};

const deleteRuanganRepo = async (id) => {
  const deletedRuangan = await prisma.ruangan.delete({
    where: { id: BigInt(id) },
  });

  const serializedRuangan = JSONBigInt.stringify(deletedRuangan);
  return JSONBigInt.parse(serializedRuangan);
};

module.exports = {
  getRuangansRepo,
  getRuanganByIdRepo,
  createRuanganRepo,
  updateRuanganRepo,
  deleteRuanganRepo,
};