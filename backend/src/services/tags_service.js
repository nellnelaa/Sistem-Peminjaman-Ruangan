const {
  getTagsRepo,
  getTagByIdRepo,
  createTagRepo,
  updateTagRepo,
  deleteTagRepo,
} = require("../repositories/tags_detail_repository.js");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getTagsService = async (tag) => {
  return getTagsRepo(tag);
};

const getTagByIdService = async (id) => {
  const data = await getTagByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Tag is not found!");
  }
  return data;
};

const createTagService = async (data) => {
  const newTag = await createTagRepo(data);
  return newTag;
};

const updateTagService = async (id, data) => {
  const existingTag = await getTagByIdRepo(id);
  if (!existingTag) {
    throw new NotFoundError("Tag is not found!");
  }

  const updatedTag = await updateTagRepo(id, data);
  if (!updatedTag) {
    throw new InternalServerError("Failed to update Tag");
  }

  return updatedTag;
};

const deleteTagService = async (id) => {
  const existingTag = await getTagByIdRepo(id);
  if (!existingTag) {
    throw new NotFoundError("Tag data is not found!");
  }

  const deletedTag = await deleteTagRepo(id);
  if (!deletedTag) {
    throw new InternalServerError("Failed to delete spec");
  }

  return deletedTag;
};

module.exports = {
  getTagsService,
  getTagByIdService,
  createTagService,
  updateTagService,
  deleteTagService,
};
