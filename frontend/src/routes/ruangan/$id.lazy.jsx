import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getRuanganById } from "../../service/ruangan";
import { useNavigate } from "@tanstack/react-router";
import {
  FaArrowLeft,
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaWrench,
  FaCouch,
  FaTools,
} from "react-icons/fa";

export const Route = createLazyFileRoute("/ruangan/$id")({
  component: RuanganDetail,
});

function RuanganDetail() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const {
    data: ruangan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ruangan", id],
    queryFn: () => getRuanganById(id),
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-300";
      case "Tidak_Tersedia":
        return "bg-red-100 text-red-800 border-red-300";
      case "Perbaikan":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Tersedia":
        return <FaCheckCircle className="text-2xl" />;
      case "Tidak_Tersedia":
        return <FaTimesCircle className="text-2xl" />;
      case "Perbaikan":
        return <FaWrench className="text-2xl" />;
      default:
        return null;
    }
  };

  const getKondisiColor = (kondisi) => {
    return kondisi === "baik"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail ruangan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <p className="text-xl font-semibold">Gagal memuat data</p>
            <p className="mt-2">{error.message}</p>
          </div>
          <button
            onClick={() => navigate({ to: "/ruangan" })}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Daftar Ruangan
          </button>
        </div>
      </div>
    );
  }

  if (!ruangan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Ruangan tidak ditemukan</p>
          <button
            onClick={() => navigate({ to: "/ruangan" })}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Kembali ke Daftar Ruangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: "/ruangan" })}
          className="flex items-center text-orange-500 hover:text-orange-600 mb-6 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Kembali ke Daftar Ruangan
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {ruangan.nama_ruangan}
                </h1>
                <p className="text-orange-100">
                  Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur
                </p>
              </div>
              <div
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 ${getStatusColor(
                  ruangan.status
                )}`}
              >
                {getStatusIcon(ruangan.status)}
                <span className="font-semibold text-lg">
                  {ruangan.status === "Tidak_Tersedia"
                    ? "Tidak Tersedia"
                    : ruangan.status}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    Informasi Lokasi
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gedung:</span>
                      <span className="font-semibold text-gray-800">
                        {ruangan.Gedung}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lantai:</span>
                      <span className="font-semibold text-gray-800">
                        Lantai{" "}
                        {ruangan.lantai === "Satu"
                          ? "1"
                          : ruangan.lantai === "Dua"
                            ? "2"
                            : "3"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jenis Ruangan:</span>
                      <span className="font-semibold text-gray-800 capitalize">
                        {ruangan.jenis}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaUsers className="mr-2 text-orange-500" />
                    Kapasitas
                  </h2>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-500 mb-2">
                        {ruangan.kapasitas}
                      </div>
                      <div className="text-gray-600">Orang</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Fasilitas */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaCouch className="mr-2 text-orange-500" />
                    Fasilitas Ruangan
                  </h2>

                  {ruangan.fasilitas && ruangan.fasilitas.length > 0 ? (
                    <div className="space-y-4">
                      {ruangan.fasilitas.map((fas) => (
                        <div
                          key={fas.id}
                          className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              <FaTools className="mr-2 text-orange-500" />
                              {fas.fasilitas_details_rel?.nama ||
                                "Tidak ada nama"}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getKondisiColor(
                                fas.kondisi
                              )}`}
                            >
                              {fas.kondisi === "baik" ? "Baik" : "Rusak"}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="text-sm">
                              Jumlah:{" "}
                              <span className="font-semibold">
                                {fas.jumlah}
                              </span>{" "}
                              unit
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FaCouch className="text-4xl mx-auto mb-2 text-gray-300" />
                      <p>Tidak ada fasilitas tercatat</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => navigate({ to: "/pengajuan" })}
                disabled={ruangan.status !== "Tersedia"}
                className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all ${
                  ruangan.status === "Tersedia"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {ruangan.status === "Tersedia"
                  ? "Ajukan Peminjaman Ruangan"
                  : "Ruangan Tidak Tersedia"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
