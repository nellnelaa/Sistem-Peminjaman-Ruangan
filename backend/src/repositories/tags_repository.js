const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");const prisma = new PrismaClient();

const createTagRepo = async (tag_details_id, achievement_id ) => {
  const newTag = tag_details_id.map
  (async (id) => {
    await prisma.tags.create({
      data: {
        tag_details_id: id,
        achievement_id ,
      },
    }); 
  });

  const serializedTags = JSONBigInt.stringify(newTag);
  return JSONBigInt.parse(serializedTags);
};

const updateTagRepo = async (tag_details_id, ids) => {
    const tagsTarget = await prisma.tags.findMany({
      where: { achievement_id:  ids },
    });

    const updatedTags = await Promise.all(
    tag_details_id.map(async (id, index) => {
      return await prisma.tags.update({
        where: { id: tagsTarget[index].id },
        data: {
          tag_details_id: id,
          achievement_id: ids,
        },
      });
    })
  );

  const serializedTags = JSONBigInt.stringify(updatedTags);
  return JSONBigInt.parse(serializedTags);
};

const deleteTagRepo = async (achievement_id) => {
  const deletedTag = await prisma.tags.deleteMany({
    where: { achievement_id },
  });

  const serializedTags = JSONBigInt.stringify(deletedTag);
  return JSONBigInt.parse(serializedTags);
};

module.exports = {
  createTagRepo,
  updateTagRepo,
  deleteTagRepo,
};
