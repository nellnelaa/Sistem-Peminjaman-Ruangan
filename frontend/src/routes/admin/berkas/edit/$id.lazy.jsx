import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBerkasById,
  updateBerkas,
} from "../../../../service/templateBerkas";
import ConfirmationDialog from "../../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/berkas/edit/$id")({
  component: EditBerkas,
});

function EditBerkas() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  // GET BY ID
  const {
    data: berkas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["berkas", id],
    queryFn: () => getBerkasById(id),
    enabled: !!id,
  });

  // UPDATE
  const { mutate: update, isPending } = useMutation({
    mutationFn: (request) => updateBerkas(id, request),
    onSuccess: () => {
      toast.success("Berkas berhasil diperbarui!");
      navigate({ to: "/admin/berkas" });
    },
    onError: (error) => {
      toast.error(
        error?.message || "Terjadi kesalahan saat memperbarui berkas"
      );
    },
  });

  const [formData, setFormData] = useState({
    nama_berkas: "",
    file_path: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (berkas) {
      setFormData({
        nama_berkas: berkas.nama_berkas || "",
        file_path: berkas.file_path || "",
      });
    }
  }, [berkas]);

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

  // VALIDASI
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_berkas.trim()) {
      newErrors.nama_berkas = "Nama berkas harus diisi";
    } else if (formData.nama_berkas.trim().length < 3) {
      newErrors.nama_berkas = "Nama berkas minimal 3 karakter";
    }

    if (!formData.file_path.trim()) {
      newErrors.file_path = "File path harus diisi";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    update(formData);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Perubahan yang sudah dibuat akan hilang.",
      navigateTo: "/admin/berkas",
      navigate,
    });
  };

  // LOADING UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data berkas...</p>
        </div>
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Gagal Memuat Data
          </h2>
          <p className="text-red-600 mb-4">Gagal memuat berkas</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!berkas) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Berkas Tidak Ditemukan
          </h2>
          <button
            onClick={() => navigate({ to: "/admin/berkas" })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Berkas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: "/admin/berkas" })}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Kembali
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Edit Berkas</h1>
          <p className="text-gray-600">Perbarui data berkas</p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Berkas
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* NAMA BERKAS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Berkas <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="nama_berkas"
                  value={formData.nama_berkas}
                  onChange={handleInputChange}
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

              {/* FILE PATH */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Path <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="file_path"
                  placeholder="Masukkan URL file atau path file"
                  value={formData.file_path}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.file_path ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.file_path && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.file_path}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 inline mr-2" /> Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={
                isPending ||
                (formData.nama_berkas === berkas.nama_berkas &&
                  formData.file_path === berkas.file_path)
              }
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Memperbarui...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2 inline" />
                  Perbarui
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBerkas;
