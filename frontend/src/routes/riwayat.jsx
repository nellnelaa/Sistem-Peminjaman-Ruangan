import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../index.css";
import { useSelector } from "react-redux";
import { getPeminjamans, deletePeminjaman } from "../service/peminjaman";

export const Route = createFileRoute("/riwayat")({
  component: RiwayatPeminjaman,
});

function RiwayatPeminjaman() {
  const { token, User } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [peminjamans, setPeminjamans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);

  // Status options
  const statusOptions = [
    { value: "", label: "Semua Status" },
    {
      value: "Menunggu",
      label: "Menunggu",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "Review", label: "Review", color: "bg-blue-100 text-blue-800" },
    {
      value: "Disetujui",
      label: "Disetujui",
      color: "bg-green-100 text-green-800",
    },
    { value: "Ditolak", label: "Ditolak", color: "bg-red-100 text-red-800" },
    {
      value: "Revisi",
      label: "Revisi",
      color: "bg-purple-100 text-purple-800",
    },
    { value: "Selesai", label: "Selesai", color: "bg-gray-100 text-gray-800" },
  ];

  // Fetch peminjamans
  const fetchPeminjamans = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (selectedStatus) filters.status_peminjaman = selectedStatus;
      if (searchQuery) filters.nama_kegiatan = searchQuery;

      const data = await getPeminjamans(filters);
      setPeminjamans(data);
    } catch (error) {
      if (error.message.includes("not found")) {
        setPeminjamans([]);
      } else {
        toast.error("Gagal memuat riwayat peminjaman: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPeminjamans();
    }
  }, [token, selectedStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPeminjamans();
  };

  const handleDelete = async () => {
    try {
      await deletePeminjaman(selectedPeminjaman.id);
      toast.success("Peminjaman berhasil dihapus");
      setShowDeleteModal(false);
      setSelectedPeminjaman(null);
      fetchPeminjamans();
    } catch (error) {
      toast.error("Gagal menghapus peminjaman: " + error.message);
    }
  };

  const openDeleteModal = (peminjaman) => {
    setSelectedPeminjaman(peminjaman);
    setShowDeleteModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = statusOptions.find((s) => s.value === status);
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusConfig?.color || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.substring(0, 5) : "-";
  };

  if (!token) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Anda harus login untuk melihat riwayat peminjaman
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

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Riwayat Peminjaman Ruangan
            </h1>
            <p className="text-gray-600">
              Kelola dan pantau status peminjaman ruangan Anda
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="md:col-span-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari berdasarkan nama kegiatan..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Cari
                  </button>
                </div>
              </form>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* New Pengajuan Button */}
            {/* <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate({ to: "/pengajuan" })}
                className="w-full md:w-auto px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                + Buat Pengajuan Baru
              </button>
            </div> */}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Memuat data...</p>
            </div>
          ) : peminjamans.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum ada riwayat peminjaman
              </h3>
              <p className="text-gray-500 mb-6">
                Mulai buat pengajuan peminjaman ruangan baru
              </p>
              <button
                onClick={() => navigate({ to: "/pengajuan" })}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Buat Pengajuan
              </button>
            </div>
          ) : (
            /* Peminjaman List */
            <div className="space-y-4">
              {peminjamans.map((peminjaman) => (
                <div
                  key={peminjaman.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {peminjaman.nama_kegiatan}
                        </h3>
                        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                          <span className="flex items-center">
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {peminjaman.users?.name || "N/A"}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{peminjaman.users?.email || "N/A"}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {getStatusBadge(peminjaman.status_peminjaman)}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {/* Ruangan */}
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Ruangan
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {peminjaman.ruangan?.nama_ruangan || "N/A"}
                          </p>
                          <p className="text-xs text-gray-600">
                            {peminjaman.ruangan?.Gedung} Lantai{" "}
                            {peminjaman.ruangan?.lantai}
                          </p>
                        </div>
                      </div>

                      {/* Tanggal */}
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Tanggal & Waktu
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {formatDate(peminjaman.tanggal_kegiatan)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatTime(peminjaman.jam_mulai)} -{" "}
                            {formatTime(peminjaman.jam_selesai)}
                          </p>
                        </div>
                      </div>

                      {/* Peserta */}
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Jumlah Peserta
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {peminjaman.jumlah_peserta} orang
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {peminjaman.deskripsi_kegiatan && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {peminjaman.deskripsi_kegiatan}
                        </p>
                      </div>
                    )}

                    {/* Admin Notes */}
                    {(peminjaman.catatan_admin ||
                      peminjaman.alasan_penolakan) && (
                      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p className="text-xs font-semibold text-blue-800 mb-1">
                          {peminjaman.alasan_penolakan
                            ? "Alasan Penolakan:"
                            : "Catatan Admin:"}
                        </p>
                        <p className="text-sm text-blue-700">
                          {peminjaman.alasan_penolakan ||
                            peminjaman.catatan_admin}
                        </p>
                      </div>
                    )}

                    {/* Dokumen */}
                    {peminjaman.dokumen_peminjaman &&
                      peminjaman.dokumen_peminjaman.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">
                            Dokumen ({peminjaman.dokumen_peminjaman.length}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {peminjaman.dokumen_peminjaman.map((dok, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                {dok.template_berkas?.nama_berkas ||
                                  `Dokumen ${idx + 1}`}
                                <span
                                  className={`ml-2 px-2 py-0.5 rounded text-xs ${
                                    dok.status_verifikasi === "Valid"
                                      ? "bg-green-200 text-green-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {dok.status_verifikasi}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Dibuat:{" "}
                        {new Date(peminjaman.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      {/* <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate({ to: `/peminjaman/${peminjaman.id}` })
                          }
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium hover:bg-blue-600 transition-colors"
                        >
                          Detail
                        </button>
                        {(peminjaman.status_peminjaman === "Menunggu" ||
                          peminjaman.status_peminjaman === "Revisi") && (
                          <>
                            <button
                              onClick={() =>
                                navigate({
                                  to: `/peminjaman/${peminjaman.id}/edit`,
                                })
                              }
                              className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(peminjaman)}
                              className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg font-medium hover:bg-red-600 transition-colors"
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus pengajuan peminjaman "
              {selectedPeminjaman?.nama_kegiatan}"? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPeminjaman(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
