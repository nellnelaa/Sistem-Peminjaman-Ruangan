const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

// GET ALL (dengan optional search nama_berkas)
const getTemplatesRepo = async (nama) => {
  let query = {};

  let orQuery = [];
  if (nama) {
    orQuery.push({
      nama_berkas: { contains: nama, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const templates = await prisma.template_berkas.findMany({
    ...query,
    orderBy: { created_at: "desc" },
  });

  const serialized = JSONBigInt.stringify(templates);
  return JSONBigInt.parse(serialized);
};

// GET BY ID
const getTemplateByIdRepo = async (id) => {
  const template = await prisma.template_berkas.findFirst({
    where: { id },
  });

  const serialized = JSONBigInt.stringify(template);
  return JSONBigInt.parse(serialized);
};

// CREATE
const createTemplateRepo = async (data) => {
  const created = await prisma.template_berkas.create({
    data,
  });

  const serialized = JSONBigInt.stringify(created);
  return JSONBigInt.parse(serialized);
};

// UPDATE
const updateTemplateRepo = async (id, data) => {
  const updated = await prisma.template_berkas.update({
    where: { id },
    data,
  });

  const serialized = JSONBigInt.stringify(updated);
  return JSONBigInt.parse(serialized);
};

// DELETE
const deleteTemplateRepo = async (id) => {
  const deleted = await prisma.template_berkas.delete({
    where: { id },
  });

  const serialized = JSONBigInt.stringify(deleted);
  return JSONBigInt.parse(serialized);
};

module.exports = {
  getTemplatesRepo,
  getTemplateByIdRepo,
  createTemplateRepo,
  updateTemplateRepo,
  deleteTemplateRepo,
};
