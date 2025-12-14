import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFasilitasById,
  updateFasilitas,
} from "../../../../service/fasilitas";
import ConfirmationDialog from "../../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/fasilitas/edit/$id")({
  component: EditFasilitas,
});

function EditFasilitas() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  // GET by ID
  const {
    data: fasilitas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fasilitas", id],
    queryFn: () => getFasilitasById(id),
    enabled: !!id,
  });

  // MUTATION: UPDATE
  const { mutate: update, isPending } = useMutation({
    mutationFn: (request) => updateFasilitas(id, request),
    onSuccess: () => {
      toast.success("Fasilitas berhasil diperbarui!");
      navigate({ to: "/admin/fasilitas" });
    },
    onError: (error) => {
      toast.error(
        error?.message || "Terjadi kesalahan saat memperbarui fasilitas"
      );
    },
  });

  const [formData, setFormData] = useState({
    nama: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (fasilitas) {
      setFormData({
        nama: fasilitas.nama || "",
      });
    }
  }, [fasilitas]);

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
      newErrors.nama = "Nama minimal 2 karakter";
    } else if (formData.nama.trim().length > 50) {
      newErrors.nama = "Nama maksimal 50 karakter";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    update(formData); // { nama: ... }
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Perubahan yang sudah dibuat akan hilang.",
      navigateTo: "/admin/fasilitas",
      navigate,
    });
  };

  // LOADING UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data fasilitas...</p>
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
          <p className="text-red-600 mb-4">Gagal memuat fasilitas</p>
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

  // NOT FOUND
  if (!fasilitas) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Fasilitas Tidak Ditemukan
          </h2>
          <button
            onClick={() => navigate({ to: "/admin/fasilitas" })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Fasilitas
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
            onClick={() => navigate({ to: "/admin/fasilitas" })}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Kembali
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Edit Fasilitas</h1>
          <p className="text-gray-600">Perbarui data fasilitas</p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Fasilitas
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Fasilitas <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
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

          {/* Button Action */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 inline mr-2" /> Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={isPending || formData.nama.trim() === fasilitas.nama}
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

export default EditFasilitas;
