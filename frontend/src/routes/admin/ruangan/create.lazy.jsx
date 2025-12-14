import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Building2,
  Layers,
  Wrench,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRuangan } from "../../../service/ruangan";
import ConfirmationDialog from "../../../components/CancelConfirmation";
import { getFasilitas } from "../../../service/fasilitas";

export const Route = createLazyFileRoute("/admin/ruangan/create")({
  component: CreateRuangan,
});

function CreateRuangan() {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: (req) => createRuangan(req),
    onSuccess: () => {
      toast.success("Data ruangan berhasil disimpan!");
      navigate({ to: "/admin/ruangan" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const { data: fasilitasDetails } = useQuery({
    queryKey: ["fasilitas-details"],
    queryFn: getFasilitas,
  });

  const [formData, setFormData] = useState({
    nama_ruangan: "",
    Gedung: "",
    lantai: "",
    kapasitas: "",
    status: "",
    jenis: "",
    fasilitas: [],
  });

  const [errors, setErrors] = useState({});

  const gedungOptions = ["FIK1", "FIK2"];
  const lantaiOptions = [
    { value: "Satu", label: "Lantai 1" },
    { value: "Dua", label: "Lantai 2" },
    { value: "Tiga", label: "Lantai 3" },
  ];
  const statusOptions = ["Tersedia", "Tidak_Tersedia", "Perbaikan"];
  const jenisOptions = ["Seminar", "Kelas", "Lab", "dll"];
  const kondisiOptions = ["baik", "rusak"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_ruangan.trim())
      newErrors.nama_ruangan = "Nama ruangan wajib diisi";

    if (!formData.Gedung) newErrors.Gedung = "Gedung wajib dipilih";
    if (!formData.lantai) newErrors.lantai = "Lantai wajib dipilih";

    if (!formData.kapasitas || isNaN(formData.kapasitas))
      newErrors.kapasitas = "Kapasitas wajib berupa angka";

    if (!formData.status) newErrors.status = "Status wajib dipilih";
    if (!formData.jenis) newErrors.jenis = "Jenis ruangan wajib dipilih";

    return newErrors;
  };

  const addFasilitas = () => {
    setFormData((prev) => ({
      ...prev,
      fasilitas: [
        ...prev.fasilitas,
        { fasilitas_details_id: "", jumlah: "", kondisi: "" },
      ],
    }));
  };

  const removeFasilitas = (index) => {
    setFormData((prev) => ({
      ...prev,
      fasilitas: prev.fasilitas.filter((_, i) => i !== index),
    }));
  };

  const updateFasilitas = (index, field, value) => {
    const updated = [...formData.fasilitas];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, fasilitas: updated }));
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const request = {
      ...formData,
      kapasitas: Number(formData.kapasitas),
      fasilitas: formData.fasilitas.map((x) => ({
        fasilitas_details_id: Number(x.fasilitas_details_id),
        jumlah: Number(x.jumlah),
        kondisi: x.kondisi,
      })),
    };

    create(request);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/ruangan",
      navigate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: "/admin/ruangan" })}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Ruangan Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan ruangan baru
          </p>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-8">
          {/* DATA RUANGAN */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Ruangan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Ruangan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Ruangan <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="nama_ruangan"
                  value={formData.nama_ruangan}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama ruangan"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-blue-500 text-gray-900
            ${errors.nama_ruangan ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.nama_ruangan && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nama_ruangan}
                  </p>
                )}
              </div>

              {/* GEDUNG */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gedung <span className="text-red-500">*</span>
                </label>

                <select
                  name="Gedung"
                  value={formData.Gedung}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
    focus:ring-blue-500 focus:border-blue-500 text-gray-900
    ${errors.Gedung ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Pilih Gedung</option>
                  {gedungOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>

                {errors.Gedung && (
                  <p className="mt-1 text-sm text-red-600">{errors.Gedung}</p>
                )}
              </div>

              {/* Lantai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lantai <span className="text-red-500">*</span>
                </label>

                <select
                  name="lantai"
                  value={formData.lantai}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-blue-500 text-gray-900
            ${errors.lantai ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Pilih Lantai</option>
                  {lantaiOptions.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>

                {errors.lantai && (
                  <p className="mt-1 text-sm text-red-600">{errors.lantai}</p>
                )}
              </div>

              {/* Kapasitas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kapasitas <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="kapasitas"
                  value={formData.kapasitas}
                  onChange={handleInputChange}
                  placeholder="Masukkan kapasitas ruangan"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-blue-500 text-gray-900
            ${errors.kapasitas ? "border-red-500" : "border-gray-300"}`}
                />

                {errors.kapasitas && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.kapasitas}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-blue-500 text-gray-900
            ${errors.status ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Pilih Status</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
              </div>

              {/* Jenis Ruangan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Ruangan <span className="text-red-500">*</span>
                </label>

                <select
                  name="jenis"
                  value={formData.jenis}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-blue-500 text-gray-900
            ${errors.jenis ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Pilih Jenis</option>
                  {jenisOptions.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>

                {errors.jenis && (
                  <p className="mt-1 text-sm text-red-600">{errors.jenis}</p>
                )}
              </div>
            </div>
          </div>

          {/* FASILITAS */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-green-600" />
              Fasilitas Ruangan
            </h2>

            <div className="space-y-5">
              {formData.fasilitas.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
                >
                  {/* Nama Fasilitas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Fasilitas <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={item.fasilitas_details_id}
                      onChange={(e) =>
                        updateFasilitas(
                          index,
                          "fasilitas_details_id",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="">Pilih Fasilitas</option>
                      {fasilitasDetails?.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jumlah */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.jumlah}
                      onChange={(e) =>
                        updateFasilitas(index, "jumlah", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  {/* Kondisi */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kondisi <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={item.kondisi}
                      onChange={(e) =>
                        updateFasilitas(index, "kondisi", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="">Pilih Kondisi</option>
                      {kondisiOptions.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete */}
                  <div className="flex items-end">
                    <button
                      onClick={() => removeFasilitas(index)}
                      className="w-full flex justify-center items-center px-3 py-2 
              bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addFasilitas}
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Fasilitas
              </button>
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
                  Simpan Ruangan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRuangan;
