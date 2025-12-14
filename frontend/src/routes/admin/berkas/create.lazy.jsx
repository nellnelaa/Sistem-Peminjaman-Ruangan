import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { ArrowLeft, Save, X, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createBerkas } from "../../../service/templateBerkas";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/berkas/create")({
  component: CreateBerkas,
});

function CreateBerkas() {
  const navigate = useNavigate();

  const { mutate: create, isLoading } = useMutation({
    mutationFn: (form) => createBerkas(form),
    onSuccess: () => {
      toast.success("Berkas berhasil disimpan!");
      navigate({ to: "/admin/berkas" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan berkas");
    },
  });

  const [formData, setFormData] = useState({
    nama_berkas: "",
    file_path: "", // STRING URL
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_berkas.trim()) {
      newErrors.nama_berkas = "Nama berkas harus diisi";
    }

    if (!formData.file_path.trim()) {
      newErrors.file_path = "File path (URL/string) harus diisi";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validate = validateForm();

    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    }

    // langsung kirim JSON, BUKAN form-data
    create({
      nama_berkas: formData.nama_berkas.trim(),
      file_path: formData.file_path.trim(),
    });
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/berkas",
      navigate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate({ to: "/admin/berkas" })}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tambah Berkas Baru
        </h1>
        <p className="text-gray-600 mb-8">
          Lengkapi form berikut untuk menambahkan berkas baru
        </p>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Informasi Berkas
          </h2>

          <div className="space-y-6">
            {/* Nama Berkas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Berkas <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="nama_berkas"
                value={formData.nama_berkas}
                onChange={handleChange}
                placeholder="Contoh: Formulir Peminjaman..."
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.nama_berkas ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.nama_berkas && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nama_berkas}
                </p>
              )}
            </div>

            {/* FILE PATH STRING */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Path / URL File <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="file_path"
                value={formData.file_path}
                onChange={handleChange}
                placeholder="Contoh: https://server.com/uploads/file.pdf"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.file_path ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.file_path && (
                <p className="mt-1 text-sm text-red-600">{errors.file_path}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2" />
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan Berkas
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBerkas;
