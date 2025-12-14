const { successResponse } = require("../utils/response.js");
const {
  getAchievementsService,
  getAchievementByIdService,
  createAchievementService,
  updateAchievementService,
  deleteAchievementService,
} = require("../services/achievements_service.js");

const getAchievementsController = async (req, res) => {
  const { full_name, grade, tag, title, category_type, organizer_name } =
    req.query;

  const data = await getAchievementsService(
    full_name,
    grade,
    tag,
    title,
    category_type,
    organizer_name,
  );
  successResponse(res, data);
};

const getAchievementByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getAchievementByIdService(id);
  successResponse(res, data);
};

const createAchievementController = async (req, res) => {
  const { body, files } = req;

  const data = await createAchievementService(body, files);
  successResponse(res, data);
};

const updateAchievementController = async (req, res) => {
  const { id } = req.params;
  const { body, files } = req;

  const data = await updateAchievementService(id, body, files);
  successResponse(res, data);
};

const deleteAchievementController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteAchievementService(id);
  successResponse(res, data);
};

module.exports = {
  getAchievementsController,
  getAchievementByIdController,
  createAchievementController,
  updateAchievementController,
  deleteAchievementController,
};
