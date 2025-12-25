const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetPeminjamans = async (req, res, next) => {
  const validateQuery = z.object({
    user_id: z.string().optional(),
    ruangan_id: z.string().optional(),
    nama_kegiatan: z.string().optional(),
    tanggal_kegiatan: z.string().optional(),
    status_peminjaman: z
      .enum(["Menunggu", "Review", "Disetujui", "Ditolak", "Revisi", "Selesai"])
      .optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

const validateGetPeminjamanById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

const validateCreatePeminjaman = async (req, res, next) => {
  if (req.body.ruangan_id) {
    req.body.ruangan_id = parseInt(req.body.ruangan_id);
  }
  if (req.body.jumlah_peserta) {
    req.body.jumlah_peserta = parseInt(req.body.jumlah_peserta);
  }
  if (req.body.dokumen_berkas_id) {
    if (typeof req.body.dokumen_berkas_id === "string") {
      req.body.dokumen_berkas_id = JSON.parse(req.body.dokumen_berkas_id);
    }
    req.body.dokumen_berkas_id = req.body.dokumen_berkas_id.map((id) =>
      parseInt(id)
    );
  }

  const validateBody = z.object({
    ruangan_id: z.number().int().positive(),
    nama_kegiatan: z.string().min(1, "Nama kegiatan harus diisi"),
    deskripsi_kegiatan: z.string().optional(),
    jumlah_peserta: z.number().int().positive(),
    tanggal_kegiatan: z.string().min(1, "Tanggal kegiatan harus diisi"),
    jam_mulai: z.string().min(1, "Jam mulai harus diisi"),
    jam_selesai: z.string().min(1, "Jam selesai harus diisi"),
    dosen_pendamping: z.string().optional(),
    cs_pendamping: z.string().optional(),
    satpam_pendamping: z.string().optional(),
    dokumen_berkas_id: z.array(z.number().int().positive()).optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    return res.status(400).json({ errors: resultValidateBody.error.errors });
  }

  next();
};

const validateUpdatePeminjaman = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  if (req.body.ruangan_id) {
    req.body.ruangan_id = parseInt(req.body.ruangan_id);
  }
  if (req.body.jumlah_peserta) {
    req.body.jumlah_peserta = parseInt(req.body.jumlah_peserta);
  }

  if (req.body.dokumen_berkas_id) {
    if (typeof req.body.dokumen_berkas_id === "string") {
      req.body.dokumen_berkas_id = JSON.parse(req.body.dokumen_berkas_id);
    }
    req.body.dokumen_berkas_id = req.body.dokumen_berkas_id.map((id) =>
      parseInt(id)
    );
  }

  const validateBody = z.object({
    ruangan_id: z.number().int().positive().optional(),
    nama_kegiatan: z.string().min(1).optional(),
    deskripsi_kegiatan: z.string().optional(),
    jumlah_peserta: z.number().int().positive().optional(),
    tanggal_kegiatan: z.string().optional(),
    jam_mulai: z.string().optional(),
    jam_selesai: z.string().optional(),
    dosen_pendamping: z.string().optional(),
    cs_pendamping: z.string().optional(),
    satpam_pendamping: z.string().optional(),
    status_peminjaman: z
      .enum(["Menunggu", "Review", "Disetujui", "Ditolak", "Revisi", "Selesai"])
      .optional(),
    catatan_admin: z.string().optional(),
    alasan_penolakan: z.string().optional(),
    dokumen_berkas_id: z.array(z.number().int().positive()).optional(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

const validateDeletePeminjaman = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

module.exports = {
  validateGetPeminjamans,
  validateGetPeminjamanById,
  validateCreatePeminjaman,
  validateUpdatePeminjaman,
  validateDeletePeminjaman,
};
