const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getFasilsRepo = async (nama) => {
  let query = {};

  let orQuery = [];
  if (nama) {
    orQuery.push({
      nama: { contains: nama, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedFasils = await prisma.fasilitas_details.findMany(query);

  const serializedFasils = JSONBigInt.stringify(searchedFasils);
  return JSONBigInt.parse(serializedFasils);
};

const getFasilByIdRepo = async (id) => {
  const Fasil = await prisma.fasilitas_details.findFirst({
    where: {
      id: id,
    },
  });
  const serializedFasils = JSONBigInt.stringify(Fasil);
  return JSONBigInt.parse(serializedFasils);
};

const createFasilRepo = async (data) => {
  const newFasil = await prisma.fasilitas_details.create({
    data,
  });

  const serializedFasils = JSONBigInt.stringify(newFasil);
  return JSONBigInt.parse(serializedFasils);
};

const updateFasilRepo = async (id, data) => {
  const updatedFasil = await prisma.fasilitas_details.update({
    where: { id },
    data,
  });

  const serializedFasils = JSONBigInt.stringify(updatedFasil);
  return JSONBigInt.parse(serializedFasils);
};

const deleteFasilRepo = async (id) => {
  const deletedFasil = await prisma.fasilitas_details.delete({
    where: { id },
  });

  const serializedFasils = JSONBigInt.stringify(deletedFasil);
  return JSONBigInt.parse(serializedFasils);
};

module.exports = {
  getFasilsRepo,
  getFasilByIdRepo,
  createFasilRepo,
  updateFasilRepo,
  deleteFasilRepo,
};
