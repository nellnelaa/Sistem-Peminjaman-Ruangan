import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Tag } from "lucide-react";
//import { useSelector } from "react-redux";
import { deleteFasilitas, getFasilitas } from "../../../service/fasilitas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/fasilitas/")({
  component: FasilitasPage,
});

function FasilitasPage() {
  //const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [fasilitas, setFasilitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { mutate: mutateDelete, isLoading: isDeleteProcessing } = useMutation({
    mutationFn: (fasilitasId) => deleteFasilitas(fasilitasId),
    onSuccess: () => {
      toast.success("Fasilitas berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["fasilitas"] });
    },
    onError: (error) => {
      const msg = error?.message || "Gagal menghapus fasilitas.";
      toast.error(msg);
    },
  });

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["fasilitas"],
    queryFn: () => getFasilitas(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFasilitas(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
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
      message: `Apakah Anda yakin ingin menghapus fasilitas "${nama || "Tanpa Nama"}"?`,
      onConfirm: () => mutateDelete(id),
      confirmLabel: "Ya, Hapus",
    });
  };

  const filtered = fasilitas.filter((f) =>
    f.nama?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Data Fasilitas
          </h1>
          <p className="text-gray-600">Kelola data fasilitas</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari nama fasilitas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Create Button */}
            <a
              href="/admin/fasilitas/create"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Fasilitas
            </a>
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
                    Nama Fasilitas
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, idx) => {
                    // ensure id is displayable even if returned as bigint string
                    const idDisplay = item.id?.toString?.() ?? "";
                    return (
                      <tr key={idDisplay || idx} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                          {indexOfFirst + idx + 1}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            {item.nama || (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                          #{idDisplay}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <a
                              href={`/admin/fasilitas/edit/${idDisplay}`}
                              className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors duration-200"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(item.id, item.nama)}
                              disabled={isDeleteProcessing}
                              className="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors duration-200 disabled:opacity-50"
                              title="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Tag className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada data ditemukan
                        </p>
                        <p className="text-gray-500">
                          {searchTerm
                            ? "Coba ubah kata kunci pencarian"
                            : "Belum ada data fasilitas yang ditambahkan"}
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
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-1.5 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => paginate(currentPage + 1)}
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

export default FasilitasPage;
