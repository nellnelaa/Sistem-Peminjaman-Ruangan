import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getRuangans } from "../../service/ruangan";
import { useNavigate } from "@tanstack/react-router";
import {
  FaSearch,
  FaFilter,
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaWrench,
} from "react-icons/fa";

export const Route = createFileRoute("/ruangan/")({
  component: RuanganList,
});

function RuanganList() {
  const navigate = useNavigate();

  // State untuk search dan filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    Gedung: "",
    lantai: "",
    status: "",
    jenis: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const {
    data: ruangans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ruangans"],
    queryFn: () => getRuangans({}), 
  });
  
  const filteredRuangans = useMemo(() => {
    if (!ruangans) return [];

    return ruangans.filter((ruangan) => {
      
      const matchesSearch = ruangan.nama_ruangan
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

        
      const matchesGedung =
        !filters.Gedung || ruangan.Gedung === filters.Gedung;

      // Filter by Lantai
      const matchesLantai =
        !filters.lantai || ruangan.lantai === filters.lantai;

      // Filter by Status
      const matchesStatus =
        !filters.status || ruangan.status === filters.status;

      // Filter by Jenis
      const matchesJenis = !filters.jenis || ruangan.jenis === filters.jenis;

      return (
        matchesSearch &&
        matchesGedung &&
        matchesLantai &&
        matchesStatus &&
        matchesJenis
      );
    });
  }, [ruangans, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      Gedung: "",
      lantai: "",
      status: "",
      jenis: "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800";
      case "Tidak_Tersedia":
        return "bg-red-100 text-red-800";
      case "Perbaikan":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Tersedia":
        return <FaCheckCircle className="inline mr-1" />;
      case "Tidak_Tersedia":
        return <FaTimesCircle className="inline mr-1" />;
      case "Perbaikan":
        return <FaWrench className="inline mr-1" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data ruangan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Gagal memuat data</p>
          <p className="mt-2">{error.message}</p>
          <a
            href="/ruangan"
            className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-orange-500 text-white"
          >
            Kembali
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Daftar Ruangan
          </h1>
          <p className="text-gray-600">
            Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama ruangan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaFilter />
              Filter
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gedung
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={filters.Gedung}
                  onChange={(e) => handleFilterChange("Gedung", e.target.value)}
                >
                  <option value="">Semua Gedung</option>
                  <option value="FIK1">FIK1</option>
                  <option value="FIK2">FIK2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lantai
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={filters.lantai}
                  onChange={(e) => handleFilterChange("lantai", e.target.value)}
                >
                  <option value="">Semua Lantai</option>
                  <option value="Satu">Lantai 1</option>
                  <option value="Dua">Lantai 2</option>
                  <option value="Tiga">Lantai 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">Semua Status</option>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak_Tersedia">Tidak Tersedia</option>
                  <option value="Perbaikan">Perbaikan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={filters.jenis}
                  onChange={(e) => handleFilterChange("jenis", e.target.value)}
                >
                  <option value="">Semua Jenis</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Kelas">Kelas</option>
                  <option value="Lab">Lab</option>
                  <option value="dll">Lainnya</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-4">
                <button
                  onClick={resetFilters}
                  className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Ditemukan{" "}
            <span className="font-semibold">
              {filteredRuangans?.length || 0}
            </span>{" "}
            ruangan
          </p>
        </div>

        {/* Ruangan Grid */}
        {filteredRuangans && filteredRuangans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRuangans.map((ruangan) => (
              <div
                key={ruangan.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate({ to: `/ruangan/${ruangan.id}` })}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {ruangan.nama_ruangan}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        ruangan.status
                      )}`}
                    >
                      {getStatusIcon(ruangan.status)}
                      {ruangan.status === "Tidak_Tersedia"
                        ? "Tidak Tersedia"
                        : ruangan.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FaBuilding className="mr-2 text-orange-500" />
                      <span>
                        {ruangan.Gedung} - Lantai{" "}
                        {ruangan.lantai === "Satu"
                          ? "1"
                          : ruangan.lantai === "Dua"
                            ? "2"
                            : "3"}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaUsers className="mr-2 text-orange-500" />
                      <span>Kapasitas: {ruangan.kapasitas} orang</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      <span className="capitalize">{ruangan.jenis}</span>
                    </div>
                  </div>

                  {ruangan.fasilitas && ruangan.fasilitas.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">Fasilitas:</p>
                      <div className="flex flex-wrap gap-2">
                        {ruangan.fasilitas.slice(0, 3).map((fas, idx) => (
                          <span
                            key={idx}
                            className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs"
                          >
                            {fas.fasilitas_details_rel?.nama}
                          </span>
                        ))}
                        {ruangan.fasilitas.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{ruangan.fasilitas.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada ruangan ditemukan</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchTerm || Object.values(filters).some((f) => f)
                ? "Coba ubah kata kunci pencarian atau filter Anda"
                : "Belum ada data ruangan yang tersedia"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
