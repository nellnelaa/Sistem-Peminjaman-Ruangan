import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Trophy,
  User,
  Building,
  Calendar,
  Star,
  Award,
  Image,
  Tag,
  GraduationCap,
  ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAchievementById,
  updateAchievement,
} from "../../../../service/achievement";
import { getStudents } from "../../../../service/student";
import { getTags } from "../../../../service/tag";
import ConfirmationDialog from "../../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/achievement/edit/$id")({
  component: EditAchievement,
});

function EditAchievement() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [students, setStudents] = useState([]);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: achievement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["achievement", id],
    queryFn: () => getAchievementById(id),
    enabled: !!id,
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: (request) => updateAchievement(id, request),
    onSuccess: () => {
      toast.success("Prestasi berhasil diperbarui!");
      navigate({ to: "/admin/achievement" });
    },
    onError: (error) => {
      toast.error(
        error?.message || "Terjadi kesalahan saat memperbarui prestasi"
      );
    },
  });

  const { data: studentsData, isSuccess: isSuccessStudents } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
  });

  useEffect(() => {
    if (isSuccessStudents && studentsData) {
      setStudents(studentsData);
    }
  }, [studentsData, isSuccessStudents]);

  const { data: tagData, isSuccess: isSuccessTags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  useEffect(() => {
    if (isSuccessTags && tagData) {
      setTags(tagData);
    }
  }, [tagData, isSuccessTags]);

  const [formData, setFormData] = useState({
    student_id: "",
    category_type: "",
    title: "",
    organizer_name: "",
    image: null,
    date: "",
    points: "",
    grade: "",
    tags: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (achievement) {
      setFormData({
        student_id: achievement.student_id?.toString() || "",
        category_type: achievement.category_type || "",
        title: achievement.title || "",
        organizer_name: achievement.organizer_name || "",
        image: null,
        date: achievement.date ? achievement.date.split("T")[0] : "",
        points: achievement.points?.toString() || "",
        grade: achievement.grade || "",
        tags: achievement.tags
          ? achievement.tags.map((tag) => tag.tag_details_id.toString())
          : [],
      });

      if (achievement.image) {
        setImagePreview(achievement.image);
      }
    }
  }, [achievement]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "points") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTagChange = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.student_id) {
      newErrors.student_id = "Siswa harus dipilih";
    }

    if (!formData.category_type) {
      newErrors.category_type = "Kategori harus dipilih";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Judul prestasi harus diisi";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Judul prestasi minimal 3 karakter";
    } else if (formData.title.trim().length > 255) {
      newErrors.title = "Judul prestasi maksimal 255 karakter";
    }

    if (!formData.organizer_name.trim()) {
      newErrors.organizer_name = "Organisasi penyelenggara harus diisi";
    } else if (formData.organizer_name.trim().length < 3) {
      newErrors.organizer_name = "Organisasi penyelenggara minimal 3 karakter";
    } else if (formData.organizer_name.trim().length > 255) {
      newErrors.organizer_name =
        "Organisasi penyelenggara maksimal 255 karakter";
    }

    if (!formData.date) {
      newErrors.date = "Tanggal prestasi harus diisi";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = "Tanggal prestasi tidak boleh di masa depan";
      }
    }

    if (!formData.points) {
      newErrors.points = "Poin harus diisi";
    } else {
      const pointsValue = parseInt(formData.points);
      if (pointsValue < 1) {
        newErrors.points = "Poin minimal 1";
      } else if (pointsValue > 1000) {
        newErrors.points = "Poin maksimal 1000";
      }
    }

    if (!formData.grade) {
      newErrors.grade = "Grade harus dipilih";
    } else if (!["A", "B", "C", "D"].includes(formData.grade)) {
      newErrors.grade = "Grade harus A, B, C, atau D";
    }

    return newErrors;
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar. Maksimal 5MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const submitData = {
      student_id: parseInt(formData.student_id),
      category_type: formData.category_type,
      title: formData.title.trim(),
      organizer_name: formData.organizer_name.trim(),
      image: formData.image, 
      date: formData.date,
      points: parseInt(formData.points),
      grade: formData.grade,
      tag_details_id: formData.tags.map((tagId) => parseInt(tagId)),
    };

    update(submitData);
    console.log("ini submit", submitData);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Perubahan yang sudah dibuat akan hilang.",
      navigateTo: "/admin/achievement",
      navigate,
    });
  };

  const isFormValid = () => {
    return (
      formData.student_id &&
      formData.category_type &&
      formData.title.trim() &&
      formData.organizer_name.trim() &&
      formData.date &&
      formData.points &&
      formData.grade
    );
  };
  const hasChanges =
    achievement &&
    (formData.title.trim() !== (achievement.title || "").trim() ||
      formData.organizer_name.trim() !==
        (achievement.organizer_name || "").trim() ||
      parseInt(formData.points) !== achievement.points ||
      formData.grade !== achievement.grade ||
      formData.category_type !== achievement.category_type ||
      parseInt(formData.student_id) !== achievement.student_id ||
      formData.date !== (achievement.date?.split("T")[0] || "") ||
      JSON.stringify(
        (achievement.tags || []).map((tag) => tag.tag_details_id).sort()
      ) !== JSON.stringify([...formData.tags.map(Number)].sort()));


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data prestasi...</p>
        </div>
      </div>
    );
  }

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
          <p className="text-red-600 mb-4">Gagal memuat data prestasi</p>
          <div className="space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => navigate({ to: "/admin/achievement" })}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Prestasi Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Prestasi dengan ID tersebut tidak ditemukan dalam sistem
          </p>
          <button
            onClick={() => navigate({ to: "/admin/achievement" })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Prestasi
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
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate({ to: "/admin/achievement" })}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Prestasi
          </h1>
          <p className="text-gray-600">
            Perbarui informasi prestasi pada form berikut
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Student Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Pilih Siswa
            </h2>

            <div>
              <label
                htmlFor="student_id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <GraduationCap className="h-4 w-4 inline mr-1" />
                Siswa <span className="text-red-500">*</span>
              </label>
              <select
                id="student_id"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.student_id ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Pilih Siswa</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.NIS}) -{" "}
                    {student.class_name?.replace("grade_", "Kelas ")}
                  </option>
                ))}
              </select>
              {errors.student_id && (
                <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
              )}
            </div>
          </div>

          {/* Achievement Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Prestasi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label
                  htmlFor="category_type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Award className="h-4 w-4 inline mr-1" />
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="category_type"
                  name="category_type"
                  value={formData.category_type}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category_type ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Academic">Akademik</option>
                  <option value="Non_Academic">Non-Akademik</option>
                </select>
                {errors.category_type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category_type}
                  </p>
                )}
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Star className="h-4 w-4 inline mr-1" />
                  Grade <span className="text-red-500">*</span>
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.grade ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
                )}
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Trophy className="h-4 w-4 inline mr-1" />
                  Judul Prestasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan judul prestasi"
                  maxLength={255}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/255 karakter
                </p>
              </div>

              {/* Organizer */}
              <div className="md:col-span-2">
                <label
                  htmlFor="organizer_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Building className="h-4 w-4 inline mr-1" />
                  Organisasi Penyelenggara{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organizer_name"
                  name="organizer_name"
                  value={formData.organizer_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.organizer_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan nama organisasi penyelenggara"
                  maxLength={255}
                />
                {errors.organizer_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.organizer_name}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.organizer_name.length}/255 karakter
                </p>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Tanggal Prestasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              {/* Points */}
              <div>
                <label
                  htmlFor="points"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Star className="h-4 w-4 inline mr-1" />
                  Poin <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="points"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.points ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan poin (1-1000)"
                />
                {errors.points && (
                  <p className="mt-1 text-sm text-red-600">{errors.points}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">Poin antara 1-1000</p>
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Gambar Achievement (Opsional)
                </h2>

                <div className="space-y-4">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-sm text-gray-600 mb-4">
                        <label className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500">
                            Klik untuk upload gambar
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="mt-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG hingga 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tags Selection */}
          {tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-blue-600" />
                Tags (Opsional)
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag.id.toString())}
                      onChange={() => handleTagChange(tag.id.toString())}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{tag.tag}</span>
                  </label>
                ))}
              </div>

              {formData.tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Tags terpilih:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tagId) => {
                      const tag = tags.find((t) => t.id.toString() === tagId);
                      return tag ? (
                        <span
                          key={tagId}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          #{tag.tag}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

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
              disabled={isPending || !isFormValid() || !hasChanges}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Memperbarui...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Perbarui Prestasi
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
