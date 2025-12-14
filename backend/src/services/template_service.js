const {
  getTemplatesRepo,
  getTemplateByIdRepo,
  createTemplateRepo,
  updateTemplateRepo,
  deleteTemplateRepo,
} = require("../repositories/template_repository.js");

const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

// GET ALL
const getTemplatesService = async (nama) => {
  return getTemplatesRepo(nama);
};

// GET BY ID
const getTemplateByIdService = async (id) => {
  const data = await getTemplateByIdRepo(id);
  if (!data) {
    throw new NotFoundError("Template berkas not found!");
  }
  return data;
};

// CREATE
const createTemplateService = async (data) => {
  const created = await createTemplateRepo(data);
  return created;
};

// UPDATE
const updateTemplateService = async (id, data) => {
  const existing = await getTemplateByIdRepo(id);
  if (!existing) {
    throw new NotFoundError("Template berkas not found!");
  }

  const updated = await updateTemplateRepo(id, data);
  if (!updated) {
    throw new InternalServerError("Failed to update template berkas");
  }

  return updated;
};

// DELETE
const deleteTemplateService = async (id) => {
  const existing = await getTemplateByIdRepo(id);
  if (!existing) {
    throw new NotFoundError("Template berkas not found!");
  }

  const deleted = await deleteTemplateRepo(id);
  if (!deleted) {
    throw new InternalServerError("Failed to delete template berkas");
  }

  return deleted;
};

module.exports = {
  getTemplatesService,
  getTemplateByIdService,
  createTemplateService,
  updateTemplateService,
  deleteTemplateService,
};
