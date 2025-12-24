import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Layers } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";
import { getRuangans, deleteRuangan } from "../../../service/ruangan";

export const Route = createLazyFileRoute("/admin/ruangan/")({
  component: RuanganPage,
});

function RuanganPage() {
  const queryClient = useQueryClient();

  const [ruangans, setRuangans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteRuangan(id),
    onSuccess: () => {
      toast.success("Ruangan berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["ruangans"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["ruangans"],
    queryFn: () => getRuangans(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setRuangans(data);
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
      message: `Apakah Anda yakin ingin menghapus ruangan "${nama || "Tanpa Nama"}"?`,
      onConfirm: () => mutateDelete(id),
      confirmLabel: "Ya, Hapus",
    });
  };

  // Filtering
  const filtered = ruangans.filter((item) => {
    const fasilitasStr = item.fasilitas
      ?.map((f) => f.fasilitas_details_rel?.nama)
      .join(" ")
      .toLowerCase();

    return (
      item.nama_ruangan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Gedung?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fasilitasStr?.includes(searchTerm.toLowerCase())
    );
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
            Data Ruangan
          </h1>
          <p className="text-gray-600">Kelola data ruangan & fasilitas</p>
        </div>

        {/* Search + Create */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari ruangan, gedung, fasilitas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Create */}
            <a
              href="/admin/ruangan/create"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Ruangan
            </a>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-head px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Ruangan
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gedung
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kapasitas
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fasilitas
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
                        {item.nama_ruangan}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.Gedung}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.status}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.kapasitas}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.jenis}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                        {item.fasilitas && item.fasilitas.length > 0 ? (
                          <div className="space-y-1">
                            <ul className="list-disc ml-4 space-y-0.5">
                              {item.fasilitas.slice(0, 3).map((f) => (
                                <li key={f.id} className="text-xs">
                                  {f.fasilitas_details_rel?.nama} ({f.jumlah}) –{" "}
                                  <span
                                    className={
                                      f.kondisi === "baik"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {f.kondisi}
                                  </span>
                                </li>
                              ))}
                            </ul>

                            {item.fasilitas.length > 3 && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                +{item.fasilitas.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs italic">
                            Tidak ada fasilitas
                          </span>
                        )}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`/admin/ruangan/edit/${item.id}`}
                            className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() =>
                              handleDelete(item.id, item.nama_ruangan)
                            }
                            disabled={isDeleting}
                            className="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors duration-200 disabled:opacity-50"
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
                        <Layers className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada data ditemukan
                        </p>
                        <p className="text-gray-500">
                          {searchTerm
                            ? "Coba ubah kata kunci pencarian"
                            : "Belum ada data ruangan yang ditambahkan"}
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

export default RuanganPage;
