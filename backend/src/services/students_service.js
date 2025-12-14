const {
  getStudentsRepo,
  getStudentByIdRepo,
  getStudentByNISRepo,
  createStudentRepo,
  updateStudentRepo,
  deleteStudentRepo,
} = require("../repositories/students_repository.js");
const {
  BadRequestError, 
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getStudentsService = async (NIS, full_name) => {
  return getStudentsRepo(NIS, full_name);
};

const getStudentByIdService = async (id) => {
  const data = await getStudentByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Student is not found!");
  }
  return data;
};

const createStudentService = async (data) => {
  const existingStudent = await getStudentByNISRepo(data.NIS);
  if (existingStudent) {
    throw new BadRequestError("NIS sudah terdaftar");
  }
  if (!data.NIS) {
    throw new BadRequestError("NIS wajib diisi");
  }
  

  const newStudent = await createStudentRepo(data);
  return newStudent;
};

const updateStudentService = async (id, data) => {
  const existingStudent = await getStudentByIdRepo(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is not found!");
  }
  const studentsWithSameNIS = await getStudentsRepo(data.NIS, null);

  const studentWithSameNIS = studentsWithSameNIS.find(
    (student) => student.id !== Number(id)
  );

  if (studentWithSameNIS) {
    throw new BadRequestError("NIS sudah terdaftar oleh siswa lain");
  }
  
  const updatedStudent = await updateStudentRepo(id, data);
  if (!updatedStudent) {
    throw new InternalServerError("Failed to update student");
  }

  return updatedStudent;
};

const deleteStudentService = async (id) => {
  const existingStudent = await getStudentByIdRepo(id);
  if (!existingStudent) {
    throw new NotFoundError("Student data is not found!");
  }

  const deletedStudent = await deleteStudentRepo(id);
  if (!deletedStudent) {
    throw new InternalServerError("Failed to delete spec");
  }

  return deletedStudent;
};

module.exports = {
  getStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
};
