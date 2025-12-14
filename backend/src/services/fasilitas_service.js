const {
  getFasilsRepo,
  getFasilByIdRepo,
  createFasilRepo,
  updateFasilRepo,
  deleteFasilRepo,
} = require("../repositories/fasilitas_detail_repository.js");
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const getFasilsService = async (nama) => {
  return getFasilsRepo(nama);
};

const getFasilByIdService = async (id) => {
  const data = await getFasilByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Fasil is not found!");
  }
  return data;
};

const createFasilService = async (data) => {
  const newFasil = await createFasilRepo(data);
  return newFasil;
};

const updateFasilService = async (id, data) => {
  const existingFasil = await getFasilByIdRepo(id);
  if (!existingFasil) {
    throw new NotFoundError("Fasil is not found!");
  }

  const updatedFasil = await updateFasilRepo(id, data);
  if (!updatedFasil) {
    throw new InternalServerError("Failed to update Fasil");
  }

  return updatedFasil;
};

const deleteFasilService = async (id) => {
  const existingFasil = await getFasilByIdRepo(id);
  if (!existingFasil) {
    throw new NotFoundError("Fasil data is not found!");
  }

  const deletedFasil = await deleteFasilRepo(id);
  if (!deletedFasil) {
    throw new InternalServerError("Failed to delete spec");
  }

  return deletedFasil;
};

module.exports = {
  getFasilsService,
  getFasilByIdService,
  createFasilService,
  updateFasilService,
  deleteFasilService,
};
