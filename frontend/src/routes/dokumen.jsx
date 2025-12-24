import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import "../index.css";
import { getTemplates } from "../service/dokumen";
import { FaFileAlt, FaExternalLinkAlt, FaSearch } from "react-icons/fa";

export const Route = createFileRoute("/dokumen")({
  component: Dokumen,
});

function Dokumen() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async (nama = "") => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTemplates(nama);
      setTemplates(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data template dokumen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Template Dokumen
          </h1>
          <p className="text-lg text-gray-700">
            Unduh template dokumen yang diperlukan untuk peminjaman ruangan
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-semibold">Terjadi Kesalahan</p>
            <p>{error}</p>
          </div>
        )}

        {/* Templates List */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaFileAlt className="text-2xl text-orange-500" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {template.nama_berkas}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(template.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={template.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300"
                    >
                      <span>Buka Dokumen</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  Tidak ada template dokumen yang ditemukan
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Hak cipta © 2025 Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur
          </p>
        </div>
      </footer>
    </div>
  );
}
