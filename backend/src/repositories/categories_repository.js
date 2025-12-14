const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getCategoriesRepo = async (
  organizer_type,
  tingkatan,
  rank,
  category_type
) => {
  let query = {};

  let orQuery = [];
  if (organizer_type) {
    orQuery.push({
      organizer_type: organizer_type,
    });
  }
  if (full_name) {
    orQuery.push({
      full_name: { contains: full_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedCategories = await prisma.categories.findMany(query);

  const serializedCategories = JSONBigInt.stringify(searchedCategories);
  return JSONBigInt.parse(serializedCategories);
};

const getCategoryByIdRepo = async (id) => {
  const Category = await prisma.categories.findFirst({
    where: {
      id: id,
    },
  });
  const serializedCategories = JSONBigInt.stringify(Category);
  return JSONBigInt.parse(serializedCategories);
};

const getCategoryByNISRepo = async (NIS) => {
  const Category = await prisma.categories.findUnique({
    where: { NIS }, // exact match
  });

  if (!Category) return null;

  const serialized = JSONBigInt.stringify(Category);
  return JSONBigInt.parse(serialized);
};

const createCategoryRepo = async (data) => {
  const newCategory = await prisma.categories.create({
    data,
  });

  const serializedCategorys = JSONBigInt.stringify(newCategory);
  return JSONBigInt.parse(serializedCategorys);
};

const updateCategoryRepo = async (id, data) => {
  const updatedCategory = await prisma.categories.update({
    where: { id },
    data,
  });

  const serializedCategories = JSONBigInt.stringify(updatedCategory);
  return JSONBigInt.parse(serializedCategories);
};

const deleteCategoryRepo = async (id) => {
  const deletedCategory = await prisma.categories.delete({
    where: { id },
  });

  const serializedCategories = JSONBigInt.stringify(deletedCategory);
  return JSONBigInt.parse(serializedCategories);
};

module.exports = {
  getCategoriesRepo,
  getCategoryByIdRepo,
  getCategoryByNISRepo,
  createCategoryRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
};
