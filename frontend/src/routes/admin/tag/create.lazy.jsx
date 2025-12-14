import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { ArrowLeft, Save, X, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createTag } from "../../../service/tag";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/tag/create")({
  component: CreateTag,
});

function CreateTag() {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createTag(request),
    onSuccess: () => {
      toast.success("Tag berhasil disimpan!");
      navigate({ to: "/admin/tag" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan tag");
    },
  });

  const [formData, setFormData] = useState({
    tag: "",
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

    if (!formData.tag.trim()) {
      newErrors.tag = "Nama tag harus diisi";
    } else if (formData.tag.trim().length < 2) {
      newErrors.tag = "Nama tag minimal 2 karakter";
    } else if (formData.tag.trim().length > 30) {
      newErrors.tag = "Nama tag maksimal 30 karakter";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    create(formData);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/tag",
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
              onClick={() => navigate({ to: "/admin/tag" })}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Tag Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan tag baru 
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Data Tag */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Tag
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Nama Tag */}
              <div>
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.tag ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan nama tag (contoh: Teknologi, Olahraga, Pendidikan)"
                  maxLength={30}
                />
                {errors.tag && (
                  <p className="mt-1 text-sm text-red-600">{errors.tag}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.tag.length}/30 karakter
                </p>
              </div>

              {/* Preview */}
              {formData.tag.trim() && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Tag
                  </label>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-blue-700 text-blue-800">
                      {formData.tag.trim()}
                    </span>
                  </div>
                </div>
              )}
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
              disabled={isPending || !formData.tag.trim()}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Tag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
