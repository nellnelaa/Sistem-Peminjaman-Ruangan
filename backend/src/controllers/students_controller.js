const { successResponse } = require("../utils/response.js");
const {
    getStudentsService,
    getStudentByIdService,
    createStudentService,updateStudentService,deleteStudentService,
} = require("../services/students_service.js");

const getStudentsController = async (req, res) => {
  const { NIS, full_name } = req.query;

  const data = await getStudentsService(NIS, full_name);

  const message =
    data.length === 0
      ? "Siswa dengan NIS atau nama tersebut tidak ditemukan."
      : "Request berhasil";
      
  successResponse(res, data, message);
};

const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getStudentByIdService(id);
  successResponse(res, data);
};

const createStudentController = async (req, res) => {
  const { body } = req;
  const data = await createStudentService(body);
  successResponse(res, data);
};

const updateStudentController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const data = await updateStudentService(id, body);
  if (!data) throw new BadRequestError("Missing update data.");
  successResponse(res, data);
};

const deleteStudentController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteStudentService(id);
  successResponse(res, data);
};

module.exports = {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
};
