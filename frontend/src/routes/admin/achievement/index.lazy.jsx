import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Award,
  Download,
  Calendar,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  deleteAchievement,
  getAchievements,
} from "../../../service/achievement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";
import * as XLSX from "xlsx";

export const Route = createLazyFileRoute("/admin/achievement/")({
  component: AchievementsPage,
});

function AchievementsPage() {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [achievements, setAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [achievementsPerPage] = useState(10);

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: (achievementId) => deleteAchievement(achievementId),
    onSuccess: () => {
      toast.success("Achievement berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error("Terjadi kesalahan saat menghapus achievement.");
    },
  });

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAchievements(data);

      const years = [
        ...new Set(
          data
            .filter((achievement) => achievement.date)
            .map((achievement) => new Date(achievement.date).getFullYear())
        ),
      ].sort((a, b) => b - a); 

      setAvailableYears(years);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Please login first to get achievements data!
        </h1>
      </div>
    );
  }

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

  const handleDelete = (achievementId, achievementTitle) => {
    ConfirmationDialog.showWithAction({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus achievement "${achievementTitle}"?`,
      onConfirm: () => deleting(achievementId),
      confirmLabel: "Ya, Hapus",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getClassLabel = (className) => {
    switch (className) {
      case "grade_10":
        return "Kelas 10";
      case "grade_11":
        return "Kelas 11";
      case "grade_12":
        return "Kelas 12";
      default:
        return className || "-";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "Academic":
        return "Akademik";
      case "Non_Academic":
        return "Non-Akademik";
      default:
        return category || "-";
    }
  };

  const getTingkatan = (achievement) => {
    if (!achievement.tags || achievement.tags.length === 0) return "-";

    const tingkatanTags = achievement.tags.filter((tag) => {
      const tagName = tag.tag_details?.tag;
      return [
        "Internasional",
        "Nasional",
        "Provinsi",
        "Kota/Kabupaten",
      ].includes(tagName);
    });

    if (tingkatanTags.length === 0) return "-";

    return tingkatanTags[0].tag_details?.tag || "-";
  };

  const getJuara = (achievement) => {
    if (!achievement.tags || achievement.tags.length === 0) return "-";

    const juaraTags = achievement.tags.filter((tag) => {
      const tagName = tag.tag_details?.tag;
      return ["Juara 1", "Juara 2", "Juara 3", "Juara Favorit"].includes(
        tagName
      );
    });

    if (juaraTags.length === 0) return "-";

    return juaraTags[0].tag_details?.tag || "-";
  };

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.students?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      achievement.organizer_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesYear =
      selectedYear === "" ||
      (achievement.date &&
        new Date(achievement.date).getFullYear().toString() === selectedYear);

    return matchesSearch && matchesYear;
  });

  const indexOfLastAchievement = currentPage * achievementsPerPage;
  const indexOfFirstAchievement = indexOfLastAchievement - achievementsPerPage;
  const currentAchievements = filteredAchievements.slice(
    indexOfFirstAchievement,
    indexOfLastAchievement
  );
  const totalPages = Math.ceil(
    filteredAchievements.length / achievementsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownloadExcel = () => {
    if (filteredAchievements.length === 0) {
      toast.error("Tidak ada data untuk diunduh");
      return;
    }

    try {
      const excelData = filteredAchievements.map((achievement, index) => ({
        No: index + 1,
        "Tanggal Prestasi": formatDate(achievement.date),
        "Nama Lomba": achievement.title || "-",
        Tingkatan: getTingkatan(achievement),
        Juara: getJuara(achievement),
        Penyelenggara: achievement.organizer_name || "-",
        "Nama Siswa": achievement.students?.full_name || "-",
        Kelas: getClassLabel(achievement.students?.class_name),
        Kategori: getCategoryLabel(achievement.category_type),
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      const columnWidths = [
        { wch: 5 }, // No
        { wch: 15 }, // Tanggal Prestasi
        { wch: 30 }, // Judul Lomba
        { wch: 15 }, // Tingkatan
        { wch: 15 }, // Juara
        { wch: 25 }, // Penyelenggara
        { wch: 25 }, // Nama Siswa
        { wch: 12 }, // Kelas
        { wch: 15 }, // Kategori
        { wch: 8 }, // Poin
        { wch: 30 }, // Semua Tags
      ];
      worksheet["!cols"] = columnWidths;

      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Prestasi");

      const currentDate = new Date().toISOString().split("T")[0];
      const yearFilter = selectedYear ? `_${selectedYear}` : "";
      const filename = `Data_Prestasi${yearFilter}_${currentDate}.xlsx`;

      XLSX.writeFile(workbook, filename);

      toast.success("Data berhasil diunduh!");
    } catch (error) {
      console.error("Error downloading Excel:", error);
      toast.error("Terjadi kesalahan saat mengunduh data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Data Achievement
          </h1>
          <p className="text-gray-600">Kelola data achievement</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Left Side: Search + Filter */}
            <div className="flex flex-wrap gap-4 items-center flex-1 min-w-0">
              {/* Search Input */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Cari nama siswa atau judul achievement..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Year Filter */}
              <div className="w-full sm:w-48">
                <Select
                  options={[
                    { label: "Semua Tahun", value: "" },
                    ...availableYears.map((year) => ({
                      label: year.toString(),
                      value: year.toString(),
                    })),
                  ]}
                  placeholder="Filter Tahun"
                  value={
                    selectedYear
                      ? { label: selectedYear, value: selectedYear }
                      : { label: "Semua Tahun", value: "" }
                  }
                  onChange={(selectedOption) => {
                    setSelectedYear(selectedOption?.value || "");
                    setCurrentPage(1);
                  }}
                  isClearable
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Side: Buttons */}
            <div className="flex gap-3">
              {/* Download Excel */}
              <button
                onClick={handleDownloadExcel}
                disabled={filteredAchievements.length === 0}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Excel
              </button>

              {/* Tambah Achievement */}
              <a
                href="/admin/achievement/create"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Achievement
              </a>
            </div>
          </div>

          {/* Filter Info */}
          {(searchTerm || selectedYear) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                <span>Filter aktif:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Pencarian: "{searchTerm}"
                  </span>
                )}
                {selectedYear && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Tahun: {selectedYear}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedYear("");
                    setCurrentPage(1);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          )}
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
                    Nama Siswa
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul Achievement
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tingkatan
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Juara
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAchievements.length > 0 ? (
                  currentAchievements.map((achievement, index) => (
                    <tr key={achievement.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        {indexOfFirstAchievement + index + 1}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {achievement.students?.full_name ||
                            "Nama tidak tersedia"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getClassLabel(achievement.students?.class_name)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {achievement.title || "Judul tidak tersedia"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getCategoryLabel(achievement.category_type)}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                        {formatDate(achievement.date)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        {getTingkatan(achievement)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                        {getJuara(achievement)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`/admin/achievement/${achievement.id}`}
                            className="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors duration-200"
                            title="Lihat Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <a
                            href={`/admin/achievement/edit/${achievement.id}`}
                            className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors duration-200"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() =>
                              handleDelete(
                                achievement.id,
                                achievement.title || "Achievement Tanpa Judul"
                              )
                            }
                            disabled={isDeleteProcessing}
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
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Award className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Tidak ada data ditemukan
                        </p>
                        <p className="text-gray-500">
                          {searchTerm || selectedYear
                            ? "Coba ubah filter atau kata kunci pencarian"
                            : "Belum ada data achievement yang ditambahkan"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 sm:px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Menampilkan {indexOfFirstAchievement + 1} -{" "}
                  {Math.min(
                    indexOfLastAchievement,
                    filteredAchievements.length
                  )}{" "}
                  dari {filteredAchievements.length} data
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
