import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Calendar, Eye } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";
import { getPeminjamans, deletePeminjaman } from "../../../service/peminjaman";

export const Route = createFileRoute("/admin/peminjaman/")({
  component: PeminjamanPage,
});

function PeminjamanPage() {
  const queryClient = useQueryClient();

  const [peminjamans, setPeminjamans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deletePeminjaman(id),
    onSuccess: () => {
      toast.success("Peminjaman berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["peminjamans"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["peminjamans"],
    queryFn: () => getPeminjamans(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPeminjamans(data);
    }
  }, [isSuccess, data]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (id, nama) => {
    ConfirmationDialog.showWithAction({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus peminjaman "${nama || "Tanpa Nama"}"?`,
      onConfirm: () => mutateDelete(id),
      confirmLabel: "Ya, Hapus",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Menunggu: { color: "bg-yellow-100 text-yellow-800", label: "Menunggu" },
      Disetujui: { color: "bg-green-100 text-green-800", label: "Disetujui" },
      Ditolak: { color: "bg-red-100 text-red-800", label: "Ditolak" },
      Revisi: { color: "bg-orange-100 text-orange-800", label: "Revisi" },
    };

    const config = statusConfig[status] || statusConfig.Menunggu;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  // Filtering
  const filtered = peminjamans.filter((item) => {
    const matchSearch =
      item.nama_kegiatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ruangan?.nama_ruangan
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.users?.no_pokok?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "" || item.status_peminjaman === statusFilter;

    return matchSearch && matchStatus;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Data Peminjaman
          </h1>
          <p className="text-gray-600">Kelola data peminjaman ruangan kampus</p>
        </div>

        {/* Search + Filter + Create */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari kegiatan, ruangan, peminjam..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Create */}
              {/* <a
                href="/admin/peminjaman/create"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Peminjaman
              </a> */}
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter("")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setStatusFilter("Menunggu")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "Menunggu"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Menunggu
              </button>
              <button
                onClick={() => setStatusFilter("Disetujui")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "Disetujui"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Disetujui
              </button>
              <button
                onClick={() => setStatusFilter("Ditolak")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "Ditolak"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ditolak
              </button>
              <button
                onClick={() => setStatusFilter("Revisi")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "Revisi"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Revisi
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Kegiatan
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruangan
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peminjam
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        {indexOfFirst + idx + 1}
                      </td>

                      <td className="px-4 sm:px-6 py-4 font-medium text-sm text-gray-900">
                        {item.nama_kegiatan}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.ruangan?.nama_ruangan || "-"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {item.users?.name || "-"}
                          </span>
                          {item.users?.no_pokok && (
                            <span className="text-xs text-gray-500">
                              {item.users.no_pokok}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.tanggal_kegiatan
                          ? new Date(item.tanggal_kegiatan).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.jam_mulai && item.jam_selesai
                          ? `${item.jam_mulai} - ${item.jam_selesai}`
                          : "-"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm">
                        {getStatusBadge(item.status_peminjaman)}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`/admin/peminjaman/detail/${item.id}`}
                            className="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors duration-200"
                            title="Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <a
                            href={`/admin/peminjaman/edit/${item.id}`}
                            className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors duration-200"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() =>
                              handleDelete(item.id, item.nama_kegiatan)
                            }
                            disabled={isDeleting}
                            className="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors duration-200 disabled:opacity-50"
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada data ditemukan
                        </p>
                        <p className="text-gray-500">
                          {searchTerm || statusFilter
                            ? "Coba ubah kata kunci atau filter"
                            : "Belum ada data peminjaman yang ditambahkan"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > itemsPerPage && (
            <div className="bg-white px-4 sm:px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Menampilkan {filtered.length === 0 ? 0 : indexOfFirst + 1} -{" "}
                  {Math.min(indexOfLast, filtered.length)} dari{" "}
                  {filtered.length} data
                </div>

                <nav className="relative z-0 inline-flex flex-wrap justify-center sm:justify-start rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-1.5 border text-sm font-medium ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PeminjamanPage;
