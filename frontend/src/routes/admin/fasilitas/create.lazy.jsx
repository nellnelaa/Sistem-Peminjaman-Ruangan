import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { ArrowLeft, Save, X, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createFasilitas } from "../../../service/fasilitas";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/fasilitas/create")({
  component: CreateFasilitas,
});

function CreateFasilitas() {
  const navigate = useNavigate();

  const { mutate: create, isLoading } = useMutation({
    mutationFn: (req) => createFasilitas(req),
    onSuccess: () => {
      toast.success("Fasilitas berhasil disimpan!");
      navigate({ to: "/admin/fasilitas" });
    },
    onError: (error) => {
      toast.error(
        error?.message || "Terjadi kesalahan saat menyimpan fasilitas"
      );
    },
  });

  const [formData, setFormData] = useState({
    nama: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama fasilitas harus diisi";
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = "Nama fasilitas minimal 2 karakter";
    } else if (formData.nama.trim().length > 50) {
      newErrors.nama = "Nama fasilitas maksimal 50 karakter";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    create({ nama: formData.nama.trim() });
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/fasilitas",
      navigate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate({ to: "/admin/fasilitas" })}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Fasilitas Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan fasilitas baru
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Fasilitas
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Nama Fasilitas */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Fasilitas <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama fasilitas (contoh: Speaker, Mic, Kursi, AC)"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nama ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={50}
                />

                {errors.nama && (
                  <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
                )}

                <p className="mt-1 text-sm text-gray-500">
                  {formData.nama.length}/50 karakter
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !formData.nama.trim()}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Fasilitas
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFasilitas;
