import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, FileText } from "lucide-react";
import { getTemplates, deleteTemplate } from "../../../service/templateBerkas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/berkas/")({
  component: BerkasPage,
});

function BerkasPage() {
  const queryClient = useQueryClient();

  const [berkas, setBerkas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { mutate: mutateDelete, isPending: isDeleteProcessing } = useMutation({
    mutationFn: (id) => deleteTemplate(id),
    onSuccess: () => {
      toast.success("Berkas berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["berkas"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Gagal menghapus berkas.");
    },
  });

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["berkas"],
    queryFn: () => getTemplates(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setBerkas(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleDelete = (id, name) => {
    ConfirmationDialog.showWithAction({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus berkas "${name || "Tanpa Nama"}"?`,
      onConfirm: () => mutateDelete(id),
      confirmLabel: "Ya, Hapus",
    });
  };

  const filtered = berkas.filter((b) =>
    b.nama_berkas?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Data Berkas
          </h1>
          <p className="text-gray-600">Kelola template berkas dokumen</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari nama berkas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Create Button */}
            <a
              href="/admin/berkas/create"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white 
                         font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 
                         w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Berkas
            </a>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-head px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Berkas
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Path File
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

                      <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                        {item.nama_berkas || (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {item.file_path || "-"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`/admin/berkas/edit/${item.id}`}
                            className="inline-flex items-center p-1.5 text-green-600 
                                       hover:text-green-900 hover:bg-green-50 rounded 
                                       transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </a>

                          <button
                            disabled={isDeleteProcessing}
                            onClick={() =>
                              handleDelete(item.id, item.nama_berkas)
                            }
                            className="inline-flex items-center p-1.5 text-red-600 
                                       hover:text-red-900 hover:bg-red-50 rounded 
                                       transition-colors duration-200 disabled:opacity-50"
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
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <FileText className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada data ditemukan
                        </p>
                        <p className="text-gray-500">
                          {searchTerm
                            ? "Coba ubah kata kunci pencarian"
                            : "Belum ada data berkas yang ditambahkan"}
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
                    className="relative inline-flex items-center px-3 py-1.5 rounded-l-md 
                               border border-gray-300 bg-white text-sm font-medium text-gray-500 
                               hover:bg-gray-50 disabled:opacity-50"
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
                    className="relative inline-flex items-center px-3 py-1.5 rounded-r-md 
                               border border-gray-300 bg-white text-sm font-medium text-gray-500 
                               hover:bg-gray-50 disabled:opacity-50"
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

export default BerkasPage;
