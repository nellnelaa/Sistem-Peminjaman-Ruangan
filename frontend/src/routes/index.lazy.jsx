import { createLazyFileRoute } from "@tanstack/react-router";
import "../index.css";
import { useNavigate } from "@tanstack/react-router";
import {
  FaSearch,
  FaFileAlt,
  FaCalendarAlt,
  FaBuilding,
  FaUser,
  FaEdit,
  FaCheckSquare,
  FaPrint,
  FaFileDownload,
} from "react-icons/fa";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-orange-500 text-3xl md:text-4xl font-bold">
                Selamat Datang
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                SISTEM
                <br />
                PEMINJAMAN RUANG
                <br />
                SEMI-OTOMATIS
              </h2>
              <button
                onClick={() => navigate({ to: "/pengajuan" })}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                AJUKAN PEMINJAMAN SEKARANG
              </button>
            </div>

            {/* Right Content - Building Illustration */}
            <div className="flex justify-center">
              <img
                src="/image/building1.png"
                alt="Building Illustration"
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tentang Sistem Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Tentang Sistem
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Sistem Peminjaman Ruang Semi-Otomatis dirancang untuk membantu
                civitas akademika Fakultas Ilmu Komputer UPN "Veteran" Jawa
                Timur dalam peminjaman ruangan secara efisien, transparan, dan
                cepat melalui verifikasi digital.
              </p>
            </div>

            {/* Right Content - Notebook Illustration */}
            <div className="flex justify-center">
              <img
                src="/image/document1.png"
                alt="Document Illustration"
                className="w-85 h-85 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Utama Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Fitur Utama Sistem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaSearch className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Cek ketersediaan
                <br />
                ruangan secara real time
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaFileDownload className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Unduh berkas
                <br />
                pinjaman ruangan
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaCalendarAlt className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Kalender jadwal
                <br />
                terintegrasi
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaBuilding className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Pinjam ruangan
                <br />
                Fakultas Ilmu Komputer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Cara Kerja
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaUser className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">Login ke sistem</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaEdit className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">Isi form peminjaman</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaCheckSquare className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Tunggu verifikasi otomatis
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                <FaPrint className="text-4xl text-orange-500" />
              </div>
              <p className="font-semibold text-gray-800">
                Dapatkan surat
                <br />
                izin peminjaman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Hak cipta © 2025 Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur
          </p>
        </div>
      </footer>
    </>
  );
}
