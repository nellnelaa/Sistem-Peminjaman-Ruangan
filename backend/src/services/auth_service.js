const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users_repository");
const { imageUpload } = require("../utils/imageHandler");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  const existingUser = await userRepository.getUserByEmail(data.email);
  if (existingUser) {
    throw new Unauthorized("Email sudah terdaftar!");
  }

  const user = await userRepository.createUser(data);
  const token = createToken(user);

  delete user.password;
  return { user, token, };
};

exports.login = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email is not found!");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Incorrect password!");
  }

  const token = createToken(user);

  delete user.password;

  return {
    user,
    token,
  };
};

const createToken = (user) => {
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h", // expired in 3 days
  });

  return token;
};
