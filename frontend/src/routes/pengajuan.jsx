import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../index.css";
import { useSelector } from "react-redux";
import { createPeminjaman } from "../service/peminjaman";
import { getRuangans } from "../service/ruangan";
import { getTemplates } from "../service/templateBerkas";
import { getPeminjamans } from "../service/peminjaman"; // Import untuk cek peminjaman

export const Route = createFileRoute("/pengajuan")({
  component: PengajuanPeminjaman,
});

function PengajuanPeminjaman() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [ruangans, setRuangans] = useState([]);
  const [loadingRuangans, setLoadingRuangans] = useState(true);
  const [peminjamansDisetujui, setPeminjamansDisetujui] = useState([]);

  const [templateBerkas, setTemplateBerkas] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  const [ruanganId, setRuanganId] = useState("");
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [deskripsiKegiatan, setDeskripsiKegiatan] = useState("");
  const [jumlahPeserta, setJumlahPeserta] = useState("");
  const [tanggalKegiatan, setTanggalKegiatan] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [dosenPendamping, setDosenPendamping] = useState("");
  const [csPendamping, setCsPendamping] = useState("");
  const [satpamPendamping, setSatpamPendamping] = useState("");

  const [dokumenByTemplate, setDokumenByTemplate] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch ruangans yang tersedia
  useEffect(() => {
    const fetchRuangans = async () => {
      try {
        const data = await getRuangans({ status: "Tersedia" });
        setRuangans(data);
      } catch (error) {
        toast.error("Gagal memuat data ruangan: " + error.message);
      } finally {
        setLoadingRuangans(false);
      }
    };

    if (token) {
      fetchRuangans();
    }
  }, [token]);

  // Fetch peminjaman yang disetujui
  useEffect(() => {
    const fetchPeminjamansDisetujui = async () => {
      try {
        const data = await getPeminjamans({ status_peminjaman: "Disetujui" });
        setPeminjamansDisetujui(data);
      } catch (error) {
        console.error("Gagal memuat data peminjaman:", error);
      }
    };

    if (token) {
      fetchPeminjamansDisetujui();
    }
  }, [token]);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplateBerkas(data);
      } catch (error) {
        toast.error("Gagal memuat template berkas: " + error.message);
      } finally {
        setLoadingTemplates(false);
      }
    };

    if (token) {
      fetchTemplates();
    }
  }, [token]);

  // Fungsi untuk mengecek apakah waktu bertabrakan
  const isTimeOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };

  // Fungsi untuk mengecek ketersediaan ruangan
  const checkRuanganAvailability = (
    ruanganId,
    tanggal,
    jamMulai,
    jamSelesai
  ) => {
    if (!tanggal || !jamMulai || !jamSelesai) {
      return { available: true, conflictingBooking: null };
    }

    const conflictingBooking = peminjamansDisetujui.find((peminjaman) => {
      // Cek apakah ruangan sama
      if (peminjaman.ruangan_id !== parseInt(ruanganId)) {
        return false;
      }

      // Cek apakah tanggal sama
      const peminjamanDate = new Date(peminjaman.tanggal_kegiatan)
        .toISOString()
        .split("T")[0];
      if (peminjamanDate !== tanggal) {
        return false;
      }

      // Cek apakah waktu bertabrakan
      return isTimeOverlap(
        jamMulai,
        jamSelesai,
        peminjaman.jam_mulai,
        peminjaman.jam_selesai
      );
    });

    return {
      available: !conflictingBooking,
      conflictingBooking,
    };
  };

  // Filter ruangan yang tersedia berdasarkan tanggal dan waktu
  const getAvailableRuangans = () => {
    if (!tanggalKegiatan || !jamMulai || !jamSelesai) {
      return ruangans;
    }

    return ruangans.map((ruangan) => {
      const { available, conflictingBooking } = checkRuanganAvailability(
        ruangan.id,
        tanggalKegiatan,
        jamMulai,
        jamSelesai
      );

      return {
        ...ruangan,
        available,
        conflictingBooking,
      };
    });
  };

  const handleFileUploadForTemplate = (templateId, event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "File tidak valid. Hanya PDF, DOC, DOCX, JPG, JPEG, PNG yang diperbolehkan"
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    setDokumenByTemplate({
      ...dokumenByTemplate,
      [templateId]: file,
    });

    const template = templateBerkas.find((t) => t.id === templateId);
    toast.success(`File untuk ${template?.nama_berkas} berhasil dipilih`);
  };

  const removeFileForTemplate = (templateId) => {
    const newDokumen = { ...dokumenByTemplate };
    delete newDokumen[templateId];
    setDokumenByTemplate(newDokumen);

    const template = templateBerkas.find((t) => t.id === templateId);
    toast.info(`File untuk ${template?.nama_berkas} dihapus`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ruanganId) {
      toast.error("Mohon pilih ruangan");
      return;
    }

    if (!namaKegiatan || !tanggalKegiatan || !jamMulai || !jamSelesai) {
      toast.error("Mohon lengkapi semua data kegiatan yang wajib");
      return;
    }

    if (!jumlahPeserta || parseInt(jumlahPeserta) <= 0) {
      toast.error("Jumlah peserta harus lebih dari 0");
      return;
    }

    if (jamMulai >= jamSelesai) {
      toast.error("Jam mulai harus lebih awal dari jam selesai");
      return;
    }

    // Validasi ketersediaan ruangan
    const { available, conflictingBooking } = checkRuanganAvailability(
      ruanganId,
      tanggalKegiatan,
      jamMulai,
      jamSelesai
    );

    if (!available) {
      toast.error(
        `Ruangan tidak tersedia pada waktu yang dipilih. Sudah ada peminjaman untuk kegiatan "${conflictingBooking.nama_kegiatan}" pada ${conflictingBooking.jam_mulai} - ${conflictingBooking.jam_selesai}`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const dokumenFiles = [];
      const dokumenBerkasIds = [];

      Object.entries(dokumenByTemplate).forEach(([templateId, file]) => {
        dokumenFiles.push(file);
        dokumenBerkasIds.push(parseInt(templateId));
      });

      const request = {
        ruangan_id: ruanganId,
        nama_kegiatan: namaKegiatan,
        deskripsi_kegiatan: deskripsiKegiatan,
        jumlah_peserta: parseInt(jumlahPeserta),
        tanggal_kegiatan: tanggalKegiatan,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        dosen_pendamping: dosenPendamping,
        cs_pendamping: csPendamping,
        satpam_pendamping: satpamPendamping,
        dokumen: dokumenFiles,
        dokumen_berkas_id: dokumenBerkasIds,
      };

      const result = await createPeminjaman(request);

      toast.success("Pengajuan peminjaman berhasil dikirim!");
      navigate({ to: "/riwayat" });
    } catch (error) {
      toast.error("Gagal mengirim pengajuan: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Anda harus login untuk melakukan peminjaman
        </h1>

        <a
          href="/login"
          className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-lg 
                     font-medium hover:bg-orange-600 transition-colors shadow-sm"
        >
          Login Sekarang
        </a>
      </div>
    );
  }

  const availableRuangans = getAvailableRuangans();

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Pengajuan Peminjaman Ruangan
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Data Kegiatan Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Data Kegiatan
              </h2>

              {/* Tanggal & Waktu - Dipindah ke atas */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-3 font-medium">
                  ℹ️ Pilih tanggal dan waktu terlebih dahulu untuk melihat
                  ruangan yang tersedia
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Tanggal Kegiatan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={tanggalKegiatan}
                      onChange={(e) => {
                        setTanggalKegiatan(e.target.value);
                        setRuanganId(""); // Reset pilihan ruangan
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Jam Mulai <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={jamMulai}
                      onChange={(e) => {
                        setJamMulai(e.target.value);
                        setRuanganId(""); // Reset pilihan ruangan
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Jam Selesai <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={jamSelesai}
                      onChange={(e) => {
                        setJamSelesai(e.target.value);
                        setRuanganId(""); // Reset pilihan ruangan
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pilih Ruangan */}
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">
                  Pilih Ruangan <span className="text-red-500">*</span>
                </label>
                {loadingRuangans ? (
                  <div className="text-gray-500">Memuat data ruangan...</div>
                ) : (
                  <>
                    <select
                      value={ruanganId}
                      onChange={(e) => setRuanganId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Pilih ruangan</option>
                      {availableRuangans.map((ruangan) => (
                        <option
                          key={ruangan.id}
                          value={ruangan.id}
                          disabled={!ruangan.available}
                          className={!ruangan.available ? "text-gray-400" : ""}
                        >
                          {ruangan.nama_ruangan} - {ruangan.Gedung} Lantai{" "}
                          {ruangan.lantai} (Kapasitas: {ruangan.kapasitas})
                          {!ruangan.available ? " - TIDAK TERSEDIA" : ""}
                        </option>
                      ))}
                    </select>

                    {/* Tampilkan info ruangan yang tidak tersedia */}
                    {tanggalKegiatan && jamMulai && jamSelesai && (
                      <div className="mt-3">
                        {availableRuangans.filter((r) => !r.available).length >
                          0 && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800 font-medium mb-2">
                              ⚠️ Ruangan yang tidak tersedia:
                            </p>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {availableRuangans
                                .filter((r) => !r.available)
                                .map((r) => (
                                  <li key={r.id}>
                                    • {r.nama_ruangan} - Sudah dipesan untuk "
                                    {r.conflictingBooking.nama_kegiatan}" (
                                    {r.conflictingBooking.jam_mulai} -{" "}
                                    {r.conflictingBooking.jam_selesai})
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Nama Kegiatan */}
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">
                  Nama Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={namaKegiatan}
                  onChange={(e) => setNamaKegiatan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Contoh: Seminar Teknologi AI"
                  required
                />
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  value={deskripsiKegiatan}
                  onChange={(e) => setDeskripsiKegiatan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Deskripsi singkat mengenai kegiatan"
                  rows="3"
                />
              </div>

              {/* Jumlah Peserta */}
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">
                  Jumlah Peserta <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={jumlahPeserta}
                  onChange={(e) => setJumlahPeserta(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Jumlah peserta"
                  min="1"
                  required
                />
              </div>

              {/* Penanggung Jawab */}
              <div className="mb-4">
                <label className="block text-gray-900 font-semibold mb-2">
                  Penanggung Jawab (Opsional)
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={dosenPendamping}
                    onChange={(e) => setDosenPendamping(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama Dosen Pendamping"
                  />
                  <input
                    type="text"
                    value={csPendamping}
                    onChange={(e) => setCsPendamping(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama CS Pendamping"
                  />
                  <input
                    type="text"
                    value={satpamPendamping}
                    onChange={(e) => setSatpamPendamping(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Nama Satpam Pendamping"
                  />
                </div>
              </div>
            </div>

            {/* Upload Dokumen Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upload Dokumen
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Upload dokumen sesuai dengan template yang tersedia (opsional).
                Format yang diterima: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB
                per file)
              </p>

              {loadingTemplates ? (
                <div className="text-gray-500">Memuat template dokumen...</div>
              ) : templateBerkas.length === 0 ? (
                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  Tidak ada template dokumen tersedia
                </div>
              ) : (
                <div className="space-y-4">
                  {templateBerkas.map((template) => (
                    <div
                      key={template.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {template.nama_berkas}
                          </h3>
                          {template.file_path && (
                            <a
                              href={template.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              Lihat Template
                            </a>
                          )}
                        </div>
                      </div>

                      {dokumenByTemplate[template.id] ? (
                        <div className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg">
                          <div className="flex items-center flex-1 min-w-0">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm text-gray-700 truncate">
                              {dokumenByTemplate[template.id].name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                              (
                              {(
                                dokumenByTemplate[template.id].size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFileForTemplate(template.id)}
                            className="ml-3 text-red-500 hover:text-red-700 flex-shrink-0"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label className="block">
                          <div className="px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                            <svg
                              className="w-8 h-8 mx-auto mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">
                              Klik untuk upload dokumen
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileUploadForTemplate(template.id, e)
                            }
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold">
                  Dokumen yang sudah diupload:{" "}
                  {Object.keys(dokumenByTemplate).length} dari{" "}
                  {templateBerkas.length}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "MENGIRIM..." : "KIRIM PENGAJUAN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
