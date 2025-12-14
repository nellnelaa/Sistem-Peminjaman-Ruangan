const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  const newUser = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      no_pokok: data.no_pokok,
      prodi: data.prodi,
      fakultas: data.fakultas,
      jabatan: data.jabatan,
      role_id: data.role_id ?? 2, 
    },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(newUser));
};

exports.getUserByEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  const serializedStudents = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedStudents);
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  const serializedStudents = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedStudents);
};
