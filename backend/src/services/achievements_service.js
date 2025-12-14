const {
  getAchievementsRepo,
  getAchievementByIdRepo,
  createAchievementRepo,
  updateAchievementRepo,
  deleteAchievementRepo,
} = require("../repositories/achievements_repository.js");
const {
  createTagRepo,
  updateTagRepo,
  deleteTagRepo,
} = require("../repositories/tags_repository.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { BadRequestError, NotFoundError } = require("../utils/request.js");
const { imageUpload } = require("../utils/imageHandler.js");
const e = require("express");

const getAchievementsService = async (
  full_name,
  grade,
  tag,
  title,
  category_type,
  organizer_name
) => {
  const data = await getAchievementsRepo(
    full_name,
    grade,
    tag,
    title,
    category_type,
    organizer_name
  );
  if (data.length === 0) {
    throw new NotFoundError("Achievement not found");
  }
  return data;
};

const getAchievementByIdService = async (id) => {
  const data = await getAchievementByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Achievement not found");
  }

  return data;
};

const createAchievementService = async (achievement, files) => {
  if (files?.image) {
    achievement.image = await imageUpload(files.image);
  }
  const {
    student_id,
    title,
    organizer_name,
    image,
    date,
    points,
    grade,
    category_type,
    tag_details_id,
  } = achievement;

  const createAchievementTable = await createAchievementRepo(
    student_id,
    title,
    organizer_name,
    image,
    date,
    points,
    grade,
    category_type
  );

  const createTagsTable = await createTagRepo(
    tag_details_id,
    createAchievementTable.id
  );
  console.log(`Tags created with ID: ${createTagsTable.id}`);

  const newAch = await getAchievementByIdRepo(createAchievementTable.id);

  return newAch;
};

const updateAchievementService = async (id, achievement, files) => {
  const existingachievement = await getAchievementByIdRepo(id);
  if (!existingachievement) {
    throw new NotFoundError("achievement not found");
  }

  if (files?.image) {
    achievement.image = await imageUpload(files.image);
  } else {
    achievement.image = existingachievement.image;
  }

  const {
    student_id,
    title,
    organizer_name,
    image,
    date,
    points,
    grade,
    category_type,
    tag_details_id,
  } = achievement;

  const updateachievement = await updateAchievementRepo(
    id,
    student_id,
    title,
    organizer_name,
    image,
    date,
    points,
    grade,
    category_type
  );

  await deleteTagRepo(id);
  await createTagRepo(tag_details_id, id);
  
  if (!updateachievement) {
    throw new BadRequestError("Failed to update");
  }

  return updateachievement;
};

const deleteAchievementService = async (id) => {
  const existingachievement = await getAchievementByIdRepo(id);
  if (!existingachievement) {
    throw new NotFoundError("achievement not found");
  }
  await deleteTagRepo(id);
  const deleteachievement = await deleteAchievementRepo(id);

  return {
    message: `achievement with ID: ${existingachievement.id} deleted successfully`,
    data: existingachievement,
  };
};

module.exports = {
  getAchievementsService,
  getAchievementByIdService,
  createAchievementService,
  updateAchievementService,
  deleteAchievementService,
};
