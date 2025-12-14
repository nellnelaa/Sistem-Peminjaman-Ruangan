import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Calendar,
  Clock,
  Users,
  FileText,
  Upload,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPeminjaman } from "../../../service/peminjaman";
import { getRuangans } from "../../../service/ruangan";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createFileRoute("/admin/peminjaman/create")({
  component: CreatePeminjaman,
});

function CreatePeminjaman() {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: (req) => createPeminjaman(req),
    onSuccess: () => {
      toast.success("Data peminjaman berhasil disimpan!");
      navigate({ to: "/admin/peminjaman" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const { data: ruangans } = useQuery({
    queryKey: ["ruangans"],
    queryFn: getRuangans,
  });

  const [formData, setFormData] = useState({
    ruangan_id: "",
    nama_kegiatan: "",
    deskripsi_kegiatan: "",
    jumlah_peserta: "",
    tanggal_kegiatan: "",
    jam_mulai: "",
    jam_selesai: "",
    dosen_pendamping: "",
    cs_pendamping: "",
    satpam_pendamping: "",
    dokumen: [],
  });

  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, dokumen: [...prev.dokumen, ...files] }));
    setFileNames((prev) => [...prev, ...files.map((f) => f.name)]);
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      dokumen: prev.dokumen.filter((_, i) => i !== index),
    }));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ruangan_id) newErrors.ruangan_id = "Ruangan wajib dipilih";
    if (!formData.nama_kegiatan.trim())
      newErrors.nama_kegiatan = "Nama kegiatan wajib diisi";
    if (!formData.jumlah_peserta || isNaN(formData.jumlah_peserta))
      newErrors.jumlah_peserta = "Jumlah peserta wajib berupa angka";
    if (!formData.tanggal_kegiatan)
      newErrors.tanggal_kegiatan = "Tanggal kegiatan wajib diisi";
    if (!formData.jam_mulai) newErrors.jam_mulai = "Jam mulai wajib diisi";
    if (!formData.jam_selesai)
      newErrors.jam_selesai = "Jam selesai wajib diisi";

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const request = {
      ...formData,
      ruangan_id: Number(formData.ruangan_id),
      jumlah_peserta: Number(formData.jumlah_peserta),
    };

    create(request);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/peminjaman",
      navigate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: "/admin/peminjaman" })}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Peminjaman Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan peminjaman ruangan
          </p>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8">
          {/* INFORMASI KEGIATAN */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Kegiatan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ruangan */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruangan <span className="text-red-500">*</span>
                </label>
                <select
                  name="ruangan_id"
                  value={formData.ruangan_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    errors.ruangan_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Ruangan</option>
                  {ruangans?.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nama_ruangan} - {r.Gedung} (Kapasitas: {r.kapasitas})
                    </option>
                  ))}
                </select>
                {errors.ruangan_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ruangan_id}
                  </p>
                )}
              </div>

              {/* Nama Kegiatan */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_kegiatan"
                  value={formData.nama_kegiatan}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama kegiatan"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    errors.nama_kegiatan ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nama_kegiatan && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nama_kegiatan}
                  </p>
                )}
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  name="deskripsi_kegiatan"
                  value={formData.deskripsi_kegiatan}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Masukkan deskripsi kegiatan (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              {/* Jumlah Peserta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Peserta <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="number"
                    name="jumlah_peserta"
                    value={formData.jumlah_peserta}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                      errors.jumlah_peserta
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.jumlah_peserta && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.jumlah_peserta}
                  </p>
                )}
              </div>

              {/* Tanggal Kegiatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_kegiatan"
                  value={formData.tanggal_kegiatan}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                    errors.tanggal_kegiatan
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.tanggal_kegiatan && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.tanggal_kegiatan}
                  </p>
                )}
              </div>

              {/* Jam Mulai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Mulai <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    name="jam_mulai"
                    value={formData.jam_mulai}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                      errors.jam_mulai ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.jam_mulai && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.jam_mulai}
                  </p>
                )}
              </div>

              {/* Jam Selesai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Selesai <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    name="jam_selesai"
                    value={formData.jam_selesai}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
                      errors.jam_selesai ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.jam_selesai && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.jam_selesai}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* PENDAMPING */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Penanggung Jawab & Pendamping
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dosen Pendamping */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosen Pendamping
                </label>
                <input
                  type="text"
                  name="dosen_pendamping"
                  value={formData.dosen_pendamping}
                  onChange={handleInputChange}
                  placeholder="Nama dosen (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              {/* CS Pendamping */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CS Pendamping
                </label>
                <input
                  type="text"
                  name="cs_pendamping"
                  value={formData.cs_pendamping}
                  onChange={handleInputChange}
                  placeholder="Nama CS (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              {/* Satpam Pendamping */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satpam Pendamping
                </label>
                <input
                  type="text"
                  name="satpam_pendamping"
                  value={formData.satpam_pendamping}
                  onChange={handleInputChange}
                  placeholder="Nama Satpam (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* DOKUMEN */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Dokumen Pendukung
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Dokumen (Opsional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk upload</span>{" "}
                        atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
              </div>

              {/* File List */}
              {fileNames.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    File yang diupload:
                  </p>
                  {fileNames.map((name, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{name}</span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Peminjaman
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePeminjaman;
