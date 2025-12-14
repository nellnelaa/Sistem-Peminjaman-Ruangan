const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetAchievements,
  validateGetAchievementById,
  validateCreateAchievement,
  validateUpdateAchievement,
  validateDeleteAchievement,
} = require("../middlewares/achievements_middleware.js");
const {
  getAchievementsController,
  getAchievementByIdController,
  createAchievementController,
  updateAchievementController,
  deleteAchievementController,
} = require("../controllers/achievements_controller.js");

const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetAchievements, getAchievementsController)
  .post(
    authorization(adminRole), validateCreateAchievement, createAchievementController);

router
  .route("/:id")
  .get(validateGetAchievementById, getAchievementByIdController)
  .put(
    authorization(adminRole), validateUpdateAchievement, updateAchievementController)
  .delete(
    authorization(adminRole), validateDeleteAchievement, deleteAchievementController);

module.exports = router;
