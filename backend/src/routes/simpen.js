

const express = require("express");
const router = express.Router();

const { authorization } = require("../middlewares/auth_middleware");
const { adminRole, mahasiswa } = require("../constants/auth");

const uploadPeminjaman = require("../middlewares/upload_peminjaman");
const validateFivePDFs = require("../middlewares/validate_five_pdfs");

const {
  validateGetPeminjaman,
  validateCreatePeminjaman,
  validateUpdatePeminjaman,
  validateUpdateStatus,
  validateDeletePeminjaman,
} = require("../middlewares/peminjaman_middleware");

const {
  getPeminjamansController,
  getPeminjamanByIdController,
  createPeminjamanController,
  updatePeminjamanController,
  updatePeminjamanStatusController,
  deletePeminjamanController,
} = require("../controllers/peminjaman_controller");

router
  .route("/")
  .get(
    authorization(adminRole, mahasiswa),
    validateGetPeminjaman,
    getPeminjamansController
  )
  .post(
    authorization(adminRole, mahasiswa),
    uploadPeminjaman, // ⬅️ parsing file
    validateFivePDFs, // ⬅️ HARUS 5 PDF
    validateCreatePeminjaman, // ⬅️ JSON only (tanpa dokumen)
    createPeminjamanController
  );

router
  .route("/:id")
  .get(authorization(adminRole, mahasiswa), getPeminjamanByIdController)
  .put(
    authorization(adminRole, mahasiswa),
    validateUpdatePeminjaman,
    updatePeminjamanController
  )
  .delete(
    authorization(adminRole),
    validateDeletePeminjaman,
    deletePeminjamanController
  );

router.put(
  "/:id/status",
  authorization(adminRole),
  validateUpdateStatus,
  updatePeminjamanStatusController
);

module.exports = router;


const { successResponse } = require("../utils/response.js");

const {
  getPeminjamansService,
  getPeminjamanByIdService,
  createPeminjamanService,
  updatePeminjamanService,
  updatePeminjamanStatusService,
  deletePeminjamanService,
} = require("../services/peminjaman_service.js");

const getPeminjamansController = async (req, res) => {
  const query = req.query;
  const data = await getPeminjamansService(query);

  const message =
    Array.isArray(data) && data.length === 0
      ? "Tidak ada peminjaman"
      : "Request berhasil";

  return successResponse(res, data, message);
};

const getPeminjamanByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getPeminjamanByIdService(id);
  return successResponse(res, data);
};

const createPeminjamanController = async (req, res) => {
  const payload = req.body; // sudah divalidasi Zod
  const documents = req.uploadedDocuments; // dari upload middleware
  const user = req.user;

  const data = await createPeminjamanService(payload, documents, user);

  return successResponse(res, data, "Peminjaman berhasil dibuat");
};

const updatePeminjamanController = async (req, res) => {
  const { id } = req.params;
  const payload = req.body || {};

  const data = await updatePeminjamanService(id, payload);
  return successResponse(res, data, "Peminjaman berhasil diupdate");
};

const updatePeminjamanStatusController = async (req, res) => {
  const { id } = req.params;
  const { status_peminjaman, catatan_admin, alasan_penolakan } = req.body;

  const data = await updatePeminjamanStatusService(
    id,
    status_peminjaman,
    catatan_admin,
    alasan_penolakan
  );

  return successResponse(res, data, "Status peminjaman berhasil diupdate");
};

const deletePeminjamanController = async (req, res) => {
  const { id } = req.params;
  const data = await deletePeminjamanService(id);
  return successResponse(res, data, "Peminjaman berhasil dihapus");
};

module.exports = {
  getPeminjamansController,
  getPeminjamanByIdController,
  createPeminjamanController,
  updatePeminjamanController,
  updatePeminjamanStatusController,
  deletePeminjamanController,
};


const { z } = require("zod");
const { BadRequestError } = require("../utils/request.js");

const validateGetPeminjaman = async (req, res, next) => {
  const schema = z.object({
    ruangan_id: z.preprocess(
      (v) => (v ? Number(v) : undefined),
      z.number().int().positive().optional()
    ),
    user_id: z.preprocess(
      (v) => (v ? Number(v) : undefined),
      z.number().int().positive().optional()
    ),
    status: z
      .enum(["Menunggu", "Review", "Disetujui", "Ditolak", "Revisi"])
      .optional(),
    date_from: z
      .string()
      .datetime()
      .optional()
      .or(z.string().date().optional()),
    date_to: z.string().datetime().optional().or(z.string().date().optional()),
  });

  const result = schema.safeParse(req.query);
  if (!result.success) throw new BadRequestError(result.error.errors);
  next();
};

const dokumenItem = z.object({
  berkas_id: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().int().positive().optional()
  ),
  file_url: z.string().url("file_url harus berupa URL valid"),
  status_verifikasi: z.enum(["Valid", "Tidak_Valid"]).optional(),
});

const validateCreatePeminjaman = async (req, res, next) => {
  const schema = z
    .object({
      user_id: z.preprocess(
        (v) => (v ? Number(v) : undefined),
        z.number().int().positive().optional()
      ),

      ruangan_id: z.preprocess(
        (v) => Number(v),
        z.number().int().positive("ruangan_id wajib diisi")
      ),

      nama_kegiatan: z.string().min(1, "nama_kegiatan tidak boleh kosong"),

      deskripsi_kegiatan: z.string().optional(),

      jumlah_peserta: z.preprocess(
        (v) => (v ? Number(v) : undefined),
        z
          .number()
          .int()
          .positive("jumlah_peserta harus angka positif")
          .optional()
      ),

      tanggal_kegiatan: z
        .string()
        .refine(
          (v) => !isNaN(Date.parse(v)),
          "tanggal_kegiatan harus format tanggal valid"
        )
        .refine(
          (v) => new Date(v) >= new Date(new Date().setHours(0, 0, 0, 0)),
          "tanggal_kegiatan tidak boleh di masa lalu"
        ),

      jam_mulai: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam_mulai harus HH:mm")
        .optional(),

      jam_selesai: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam_selesai harus HH:mm")
        .optional(),

      dosen_pendamping: z.string().optional(),
      cs_pendamping: z.string().optional(),
      satpam_pendamping: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.jam_mulai && !data.jam_selesai) return false;
        if (!data.jam_mulai && data.jam_selesai) return false;
        return true;
      },
      {
        message: "jam_mulai dan jam_selesai harus diisi keduanya",
        path: ["jam_mulai"],
      }
    );

  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  req.body = result.data;

  next();
};

const validateUpdatePeminjaman = async (req, res, next) => {
  const schema = z
    .object({
      nama_kegiatan: z
        .string()
        .min(1, "nama_kegiatan tidak boleh kosong")
        .optional(),
      deskripsi_kegiatan: z.string().optional(),
      jumlah_peserta: z.preprocess(
        (v) => (v ? Number(v) : undefined),
        z.number().int().positive("jumlah_peserta harus positif").optional()
      ),

      tanggal_kegiatan: z
        .string()
        .refine(
          (v) => !isNaN(Date.parse(v)),
          "tanggal_kegiatan harus format tanggal valid"
        )
        .refine(
          (v) => new Date(v) >= new Date(new Date().setHours(0, 0, 0, 0)),
          "tanggal_kegiatan tidak boleh di masa lalu"
        )
        .optional(),

      jam_mulai: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format waktu harus HH:mm")
        .optional(),

      jam_selesai: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format waktu harus HH:mm")
        .optional(),

      dosen_pendamping: z.string().optional(),
      cs_pendamping: z.string().optional(),
      satpam_pendamping: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.jam_mulai && !data.jam_selesai) return false;
        if (!data.jam_mulai && data.jam_selesai) return false;
        return true;
      },
      {
        message:
          "jam_mulai dan jam_selesai harus diisi keduanya atau kosongkan keduanya",
        path: ["jam_mulai"],
      }
    );

  const result = schema.safeParse(req.body);
  if (!result.success) throw new BadRequestError(result.error.errors);

  req.body = result.data;
  next();
};

const validateUpdateStatus = async (req, res, next) => {
  const schema = z
    .object({
      status_peminjaman: z.enum([
        "Menunggu",
        "Review",
        "Disetujui",
        "Ditolak",
        "Revisi",
      ]),
      catatan_admin: z.string().optional(),
      alasan_penolakan: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.status_peminjaman === "Ditolak" && !data.alasan_penolakan) {
          return false;
        }
        return true;
      },
      {
        message: "alasan_penolakan wajib diisi ketika status Ditolak",
        path: ["alasan_penolakan"],
      }
    )
    .refine(
      (data) => {
        if (data.status_peminjaman === "Revisi" && !data.catatan_admin) {
          return false;
        }
        return true;
      },
      {
        message: "catatan_admin wajib diisi ketika status Revisi",
        path: ["catatan_admin"],
      }
    );

  const result = schema.safeParse(req.body);
  if (!result.success) throw new BadRequestError(result.error.errors);

  req.body = result.data;
  next();
};

const validateDeletePeminjaman = async (req, res, next) => {
  const schema = z.object({
    id: z.string().refine((v) => !isNaN(Number(v)), "ID harus berupa angka"),
  });

  const result = schema.safeParse(req.params);
  if (!result.success) throw new BadRequestError(result.error.errors);

  next();
};

module.exports = {
  validateGetPeminjaman,
  validateCreatePeminjaman,
  validateUpdatePeminjaman,
  validateUpdateStatus,
  validateDeletePeminjaman,
};


const {
  getPeminjamansRepo,
  getPeminjamanByIdRepo,
  createPeminjamanRepo,
  updatePeminjamanRepo,
  updatePeminjamanStatusRepo,
  deletePeminjamanRepo,
  checkRoomAvailability,
} = require("../repositories/peminjaman_repository.js");

const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../utils/request.js");

const toMinutes = (hhmm) => {
  if (typeof hhmm !== "string") return NaN;
  const parts = hhmm.split(":");
  if (parts.length !== 2) return NaN;
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN;
  return h * 60 + m;
};

const validateJamOrder = (jamMulai, jamSelesai) => {
  if (!jamMulai || !jamSelesai) return true;
  const s = toMinutes(jamMulai);
  const e = toMinutes(jamSelesai);
  if (Number.isNaN(s) || Number.isNaN(e)) {
    throw new BadRequestError("Format jam harus HH:mm");
  }
  if (s >= e) {
    throw new BadRequestError("jam_mulai harus lebih kecil dari jam_selesai");
  }
  return true;
};

const checkTimeConflict = async (
  ruangan_id,
  tanggal_kegiatan,
  jam_mulai,
  jam_selesai,
  exclude_id = null
) => {
  if (!jam_mulai || !jam_selesai) return; // Skip jika jam tidak diisi

  const conflicts = await checkRoomAvailability(
    ruangan_id,
    tanggal_kegiatan,
    jam_mulai,
    jam_selesai,
    exclude_id
  );

  if (conflicts && conflicts.length > 0) {
    throw new BadRequestError(
      "Ruangan sudah dibooking pada waktu tersebut. Pilih waktu lain."
    );
  }
};

const getPeminjamansService = async (query) => {
  try {
    return await getPeminjamansRepo(query);
  } catch (error) {
    throw new InternalServerError(
      "Failed to fetch peminjaman: " + error.message
    );
  }
};

const getPeminjamanByIdService = async (id) => {
  const data = await getPeminjamanByIdRepo(id);
  if (!data) throw new NotFoundError("Peminjaman tidak ditemukan");
  return data;
};

const createPeminjamanService = async (payload, dokumen = [], user) => {
  // Set user_id dari authenticated user jika tidak ada
  if (!payload.user_id && user && user.id) {
    payload.user_id = Number(user.id);
  }

  // Validasi user_id harus ada
  if (!payload.user_id) {
    throw new BadRequestError("user_id diperlukan");
  }

  // Validasi jam
  if (payload.jam_mulai && payload.jam_selesai) {
    validateJamOrder(payload.jam_mulai, payload.jam_selesai);
  }

  // Check konflik booking
  if (payload.jam_mulai && payload.jam_selesai) {
    await checkTimeConflict(
      payload.ruangan_id,
      payload.tanggal_kegiatan,
      payload.jam_mulai,
      payload.jam_selesai
    );
  }

  // Set status default
  payload.status_peminjaman = payload.status_peminjaman || "Menunggu";

  // Normalize dokumen
  const normalizedDokumen = Array.isArray(dokumen)
    ? dokumen.map((d) => ({
        berkas_id: d.berkas_id ? Number(d.berkas_id) : null,
        file_url: d.file_url || d.file_path || null,
        status_verifikasi: d.status_verifikasi || null,
      }))
    : [];

  // Validasi setiap dokumen harus punya file_url
  for (const d of normalizedDokumen) {
    if (!d.file_url) {
      throw new BadRequestError("Setiap dokumen harus memiliki file_url");
    }
  }

  try {
    const created = await createPeminjamanRepo(payload, normalizedDokumen);
    if (!created) throw new InternalServerError("Failed to create peminjaman");
    return created;
  } catch (error) {
    if (error.message.includes("tidak ditemukan")) {
      throw new NotFoundError(error.message);
    }
    throw error;
  }
};

const updatePeminjamanService = async (id, payload) => {
  const existing = await getPeminjamanByIdRepo(id);
  if (!existing) throw new NotFoundError("Peminjaman tidak ditemukan");

  // Cek apakah status sudah final
  if (
    existing.status_peminjaman === "Disetujui" ||
    existing.status_peminjaman === "Ditolak"
  ) {
    throw new BadRequestError(
      "Tidak dapat mengubah peminjaman setelah disetujui/ditolak"
    );
  }

  // Validasi jam jika diubah
  const jamMulai = payload.jam_mulai || existing.jam_mulai;
  const jamSelesai = payload.jam_selesai || existing.jam_selesai;

  if (jamMulai && jamSelesai) {
    validateJamOrder(jamMulai, jamSelesai);
  }

  // Check konflik booking jika tanggal/jam/ruangan berubah
  const ruanganId = payload.ruangan_id || existing.ruangan_id;
  const tanggalKegiatan = payload.tanggal_kegiatan || existing.tanggal_kegiatan;

  if (jamMulai && jamSelesai) {
    await checkTimeConflict(
      ruanganId,
      tanggalKegiatan,
      jamMulai,
      jamSelesai,
      Number(id) // exclude current peminjaman
    );
  }

  // Update updated_at
  payload.updated_at = new Date();

  try {
    const updated = await updatePeminjamanRepo(id, payload);
    if (!updated) throw new InternalServerError("Failed to update peminjaman");
    return updated;
  } catch (error) {
    throw new InternalServerError(
      "Failed to update peminjaman: " + error.message
    );
  }
};

const updatePeminjamanStatusService = async (
  id,
  status,
  catatan_admin = null,
  alasan_penolakan = null
) => {
  const existing = await getPeminjamanByIdRepo(id);
  if (!existing) throw new NotFoundError("Peminjaman tidak ditemukan");

  // Validasi transisi status
  const validTransitions = {
    Menunggu: ["Review", "Ditolak"],
    Review: ["Disetujui", "Ditolak", "Revisi"],
    Revisi: ["Review", "Ditolak"],
    Disetujui: [], // Status final
    Ditolak: [], // Status final
  };

  const allowedNextStatus = validTransitions[existing.status_peminjaman] || [];

  if (!allowedNextStatus.includes(status)) {
    throw new BadRequestError(
      `Tidak dapat mengubah status dari ${existing.status_peminjaman} ke ${status}`
    );
  }

  try {
    const updated = await updatePeminjamanStatusRepo(
      id,
      status,
      catatan_admin,
      alasan_penolakan
    );
    if (!updated)
      throw new InternalServerError("Failed to update peminjaman status");
    return updated;
  } catch (error) {
    throw new InternalServerError(
      "Failed to update peminjaman status: " + error.message
    );
  }
};

const deletePeminjamanService = async (id) => {
  const existing = await getPeminjamanByIdRepo(id);
  if (!existing) throw new NotFoundError("Peminjaman tidak ditemukan");

  // Tidak bisa hapus jika sudah disetujui
  if (existing.status_peminjaman === "Disetujui") {
    throw new BadRequestError(
      "Tidak dapat menghapus peminjaman yang sudah disetujui"
    );
  }

  try {
    const deleted = await deletePeminjamanRepo(id);
    if (!deleted) throw new InternalServerError("Failed to delete peminjaman");
    return deleted;
  } catch (error) {
    throw new InternalServerError(
      "Failed to delete peminjaman: " + error.message
    );
  }
};

module.exports = {
  getPeminjamansService,
  getPeminjamanByIdService,
  createPeminjamanService,
  updatePeminjamanService,
  updatePeminjamanStatusService,
  deletePeminjamanService,
};


const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getPeminjamansRepo = async (query = {}) => {
  const { ruangan_id, user_id, status, date_from, date_to } = query;

  const where = {};

  if (ruangan_id !== undefined) where.ruangan_id = Number(ruangan_id);
  if (user_id !== undefined) where.user_id = Number(user_id);
  if (status !== undefined) where.status_peminjaman = status;

  if (date_from || date_to) {
    where.tanggal_kegiatan = {};
    if (date_from) {
      where.tanggal_kegiatan.gte = new Date(date_from);
    }
    if (date_to) {
      // Set ke akhir hari untuk include seluruh hari
      const endDate = new Date(date_to);
      endDate.setHours(23, 59, 59, 999);
      where.tanggal_kegiatan.lte = endDate;
    }
  }

  const result = await prisma.peminjaman.findMany({
    where,
    orderBy: { created_at: "desc" },
    include: {
      ruangan: {
        include: {
          fasilitas: {
            include: {
              fasilitas_details_rel: true,
            },
          },
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
          role_id: true,
        },
      },
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
      },
    },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(result));
};

const getPeminjamanByIdRepo = async (id) => {
  const data = await prisma.peminjaman.findUnique({
    where: { id: Number(id) },
    include: {
      ruangan: {
        include: {
          fasilitas: {
            include: {
              fasilitas_details_rel: true,
            },
          },
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
          role_id: true,
        },
      },
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
        orderBy: { created_at: "asc" },
      },
    },
  });

  return data ? JSONBigInt.parse(JSONBigInt.stringify(data)) : null;
};

// Function untuk cek availability ruangan pada waktu tertentu
const checkRoomAvailability = async (
  ruangan_id,
  tanggal_kegiatan,
  jam_mulai,
  jam_selesai,
  exclude_peminjaman_id = null
) => {
  const where = {
    ruangan_id: Number(ruangan_id),
    tanggal_kegiatan: new Date(tanggal_kegiatan),
    status_peminjaman: {
      in: ["Menunggu", "Review", "Disetujui", "Revisi"], // Status aktif
    },
    OR: [
      {
        // Booking baru mulai di tengah booking existing
        AND: [
          { jam_mulai: { lte: jam_mulai } },
          { jam_selesai: { gt: jam_mulai } },
        ],
      },
      {
        // Booking baru selesai di tengah booking existing
        AND: [
          { jam_mulai: { lt: jam_selesai } },
          { jam_selesai: { gte: jam_selesai } },
        ],
      },
      {
        // Booking baru cover seluruh booking existing
        AND: [
          { jam_mulai: { gte: jam_mulai } },
          { jam_selesai: { lte: jam_selesai } },
        ],
      },
    ],
  };

  // Exclude peminjaman yang sedang diupdate
  if (exclude_peminjaman_id) {
    where.id = { not: Number(exclude_peminjaman_id) };
  }

  const conflicts = await prisma.peminjaman.findMany({
    where,
    select: {
      id: true,
      jam_mulai: true,
      jam_selesai: true,
      nama_kegiatan: true,
    },
  });

  return conflicts;
};

const createPeminjamanRepo = async (payload, dokumenArray = []) => {
  const created = await prisma.$transaction(async (tx) => {
    // Validasi ruangan exists
    if (!payload.ruangan_id) throw new Error("ruangan_id wajib diisi");
    const ruanganExists = await tx.ruangan.findUnique({
      where: { id: Number(payload.ruangan_id) },
    });
    if (!ruanganExists) throw new Error("Ruangan tidak ditemukan");

    // Validasi ruangan available
    if (ruanganExists.status === "Tidak_Tersedia") {
      throw new Error("Ruangan tidak tersedia untuk dipinjam");
    }

    // Validasi user exists
    if (!payload.user_id) throw new Error("user_id wajib diisi");
    const userExists = await tx.users.findUnique({
      where: { id: Number(payload.user_id) },
    });
    if (!userExists) throw new Error("User tidak ditemukan");

    // Create peminjaman
    const newPeminjaman = await tx.peminjaman.create({
      data: {
        user_id: Number(payload.user_id),
        ruangan_id: Number(payload.ruangan_id),
        nama_kegiatan: payload.nama_kegiatan,
        deskripsi_kegiatan: payload.deskripsi_kegiatan || null,
        jumlah_peserta: payload.jumlah_peserta
          ? Number(payload.jumlah_peserta)
          : null,
        tanggal_kegiatan: payload.tanggal_kegiatan
          ? new Date(payload.tanggal_kegiatan)
          : null,
        jam_mulai: payload.jam_mulai || null,
        jam_selesai: payload.jam_selesai || null,
        dosen_pendamping: payload.dosen_pendamping || null,
        cs_pendamping: payload.cs_pendamping || null,
        satpam_pendamping: payload.satpam_pendamping || null,
        status_peminjaman: payload.status_peminjaman || "Menunggu",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Create dokumen peminjaman
    if (Array.isArray(dokumenArray) && dokumenArray.length > 0) {
      const createDocs = dokumenArray.map((d) =>
        tx.dokumen_peminjaman.create({
          data: {
            peminjaman_id: newPeminjaman.id,
            berkas_id: d.berkas_id ? Number(d.berkas_id) : null,
            file_url: d.file_url,
            status_verifikasi: d.status_verifikasi || null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        })
      );
      await Promise.all(createDocs);
    }

    // Return peminjaman with relations
    return tx.peminjaman.findUnique({
      where: { id: newPeminjaman.id },
      include: {
        dokumen_peminjaman: {
          include: {
            template_berkas: true,
          },
        },
        ruangan: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            no_pokok: true,
            prodi: true,
            fakultas: true,
            jabatan: true,
            role_id: true,
          },
        },
      },
    });
  });

  return JSONBigInt.parse(JSONBigInt.stringify(created));
};

const updatePeminjamanRepo = async (id, data) => {
  // Prepare data untuk update
  const updateData = { ...data };

  // Convert tanggal_kegiatan ke Date jika ada
  if (updateData.tanggal_kegiatan) {
    updateData.tanggal_kegiatan = new Date(updateData.tanggal_kegiatan);
  }

  // Convert numeric fields
  if (updateData.jumlah_peserta !== undefined) {
    updateData.jumlah_peserta = Number(updateData.jumlah_peserta);
  }

  if (updateData.ruangan_id !== undefined) {
    updateData.ruangan_id = Number(updateData.ruangan_id);
  }

  // Set updated_at
  updateData.updated_at = new Date();

  const updated = await prisma.peminjaman.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
      },
      ruangan: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
          role_id: true,
        },
      },
    },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(updated));
};

const updatePeminjamanStatusRepo = async (
  id,
  status,
  catatan_admin = null,
  alasan_penolakan = null
) => {
  const updated = await prisma.peminjaman.update({
    where: { id: Number(id) },
    data: {
      status_peminjaman: status,
      catatan_admin,
      alasan_penolakan,
      updated_at: new Date(),
    },
    include: {
      dokumen_peminjaman: {
        include: {
          template_berkas: true,
        },
      },
      ruangan: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          no_pokok: true,
          prodi: true,
          fakultas: true,
          jabatan: true,
          role_id: true,
        },
      },
    },
  });

  return JSONBigInt.parse(JSONBigInt.stringify(updated));
};

const deletePeminjamanRepo = async (id) => {
  const deleted = await prisma.$transaction(async (tx) => {
    // Delete dokumen peminjaman first (foreign key constraint)
    await tx.dokumen_peminjaman.deleteMany({
      where: { peminjaman_id: Number(id) },
    });

    // Delete peminjaman
    return tx.peminjaman.delete({
      where: { id: Number(id) },
    });
  });

  return JSONBigInt.parse(JSONBigInt.stringify(deleted));
};

module.exports = {
  getPeminjamansRepo,
  getPeminjamanByIdRepo,
  createPeminjamanRepo,
  updatePeminjamanRepo,
  updatePeminjamanStatusRepo,
  deletePeminjamanRepo,
  checkRoomAvailability,
};
