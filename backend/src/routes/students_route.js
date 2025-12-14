const express = require("express");
const { authorization } = require("../middlewares/auth_middleware.js");
const {
  validateGetStudents,
  validateGetStudentById,
  validateCreateStudent,
  validateUpdateStudent,
  validateDeleteStudent,
} = require("../middlewares/students_middleware.js");
const {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} = require("../controllers/students_controller.js");
const { adminRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateGetStudents, getStudentsController)
  .post(
    authorization(adminRole),
    validateCreateStudent,
    createStudentController
  );

router
  .route("/:id")
  .get(validateGetStudentById, getStudentByIdController)
  .put(authorization(adminRole), validateUpdateStudent, updateStudentController)
  .delete(
    authorization(adminRole),
    validateDeleteStudent,
    deleteStudentController
  );

module.exports = router;
