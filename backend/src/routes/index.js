const express = require("express");
const authRouter = require("./auth_route");
const studentsRouter = require("./students_route");
const tagsRouter = require("./tags_route");
const templateRouter = require("./template_route");
const peminjamanRouter = require("./peminjaman_route");
const dokumenRouter = require("./dokumen_peminjaman_route");
const ruangansRouter = require("./ruangan_route");
const fasilitasRouter = require("./fasilitas_route");
const validationRouter = require("./validation_route");

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/tags", tagsRouter);
router.use("/validation", validationRouter);

router.use("/dokumen-peminjaman", dokumenRouter);
router.use("/peminjaman", peminjamanRouter);
router.use("/template", templateRouter);
router.use("/auth", authRouter);
router.use("/ruangan", ruangansRouter);
router.use("/fasilitas", fasilitasRouter);

module.exports = router;
