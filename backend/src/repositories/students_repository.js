const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getStudentsRepo = async (NIS, full_name) => {
  let query = {};
  let orQuery = [];
  if (NIS) {
    orQuery.push({
      NIS: NIS,
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

  // ✅ Debug query yang akan dijalankan
  console.log("Final query:", JSON.stringify(query, null, 2));

  const searchedStudents = await prisma.students.findMany(query);

  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

const getStudentByIdRepo = async (id) => {
  const student = await prisma.students.findFirst({
    where: {
      id: id,
    },
  });
  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

const getStudentByNISRepo = async (NIS) => {
  const student = await prisma.students.findUnique({
    where: { NIS }, // exact match
  });

  if (!student) return null;

  const serialized = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serialized);
};

const createStudentRepo = async (data) => {
  const newStudent = await prisma.students.create({
    data,
  });

  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};

const updateStudentRepo = async (id, data) => {
  const updatedStudent = await prisma.students.update({
    where: { id },
    data,
  });

  const serializedStudents = JSONBigInt.stringify(updatedStudent);
  return JSONBigInt.parse(serializedStudents);
};

const deleteStudentRepo = async (id) => {
  const deletedStudent = await prisma.students.delete({
    where: { id },
  });

  const serializedStudents = JSONBigInt.stringify(deletedStudent);
  return JSONBigInt.parse(serializedStudents);
};

module.exports = {
  getStudentsRepo,
  getStudentByIdRepo,
  getStudentByNISRepo,
  createStudentRepo,
  updateStudentRepo,
  deleteStudentRepo,
};
