const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getTagsRepo = async (tag) => {
  let query = {};

  let orQuery = [];
  if (tag) {
    orQuery.push({
      tag: { contains: tag, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  const searchedTags = await prisma.tag_details.findMany(query);

  const serializedTags = JSONBigInt.stringify(searchedTags);
  return JSONBigInt.parse(serializedTags);
};

const getTagByIdRepo = async (id) => {
  const Tag = await prisma.tag_details.findFirst({
    where: {
      id: id,
    },
  });
  const serializedTags = JSONBigInt.stringify(Tag);
  return JSONBigInt.parse(serializedTags);
};

const createTagRepo = async (data) => {
  const newTag = await prisma.tag_details.create({
    data,
  });

  const serializedTags = JSONBigInt.stringify(newTag);
  return JSONBigInt.parse(serializedTags);
};

const updateTagRepo = async (id, data) => {
  const updatedTag = await prisma.tag_details.update({
    where: { id },
    data,
  });

  const serializedTags = JSONBigInt.stringify(updatedTag);
  return JSONBigInt.parse(serializedTags);
};

const deleteTagRepo = async (id) => {
  const deletedTag = await prisma.tag_details.delete({
    where: { id },
  });

  const serializedTags = JSONBigInt.stringify(deletedTag);
  return JSONBigInt.parse(serializedTags);
};

module.exports = {
  getTagsRepo,
  getTagByIdRepo,
  createTagRepo,
  updateTagRepo,
  deleteTagRepo,
};
