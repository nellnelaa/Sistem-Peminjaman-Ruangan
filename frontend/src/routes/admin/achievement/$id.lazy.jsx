import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Award,
  Building,
  Image,
  Star,
  GraduationCap,
  Trophy,
  Tag,
  Share2,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAchievementById,
  deleteAchievement,
} from "../../../service/achievement";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/achievement/$id")({
  component: AchievementDetailPage,
});

function AchievementDetailPage() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: (achievementId) => deleteAchievement(achievementId),
    onSuccess: () => {
      toast.success("Prestasi berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      navigate({ to: "/admin/achievement" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    data: achievement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["achievement", id],
    queryFn: () => getAchievementById(id),
  });
  console.log(achievement);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (achievementId, achievementTitle) => {
    ConfirmationDialog.showWithAction({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus prestasi "${achievementTitle}"?`,
      onConfirm: () => deleting(achievementId),
      confirmLabel: "Ya, Hapus",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Achievement
            </h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Achievement Not Found
            </h2>
            <p className="text-gray-600">
              Prestasi yang Anda cari tidak ditemukan
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatClassName = (className) => {
    const classMap = {
      grade_10: "Kelas 10",
      grade_11: "Kelas 11",
      grade_12: "Kelas 12",
    };
    return classMap[className] || className;
  };

  const formatCategory = (category) => {
    const categoryMap = {
      Academic: "Akademik",
      Non_Academic: "Non-Akademik",
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category) => {
    return category === "Academic"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      A: "bg-emerald-100 text-emerald-800",
      B: "bg-blue-100 text-blue-800",
      C: "bg-yellow-100 text-yellow-800",
      D: "bg-red-100 text-red-800",
    };
    return gradeColors[grade] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <a
              href="/admin/achievement"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </a>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Detail Prestasi
          </h1>
          <p className="text-gray-600">Informasi lengkap prestasi siswa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievement Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {achievement.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(achievement.category_type)}`}
                      >
                        {formatCategory(achievement.category_type)}
                      </span>
                      {achievement.grade && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(achievement.grade)}`}
                        >
                          Grade {achievement.grade}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-amber-600 mb-1">
                      <Trophy className="h-5 w-5 mr-1" />
                      <span className="font-bold text-lg">
                        {achievement.points || 0}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Points</span>
                  </div>
                </div>

                {/* Achievement Image */}
                {achievement.image && (
                  <div className="mb-6">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-400">
                          <Image className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Gambar tidak dapat dimuat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievement Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Organisasi Penyelenggara
                      </label>
                      <p className="text-gray-900 font-medium">
                        {achievement.organizer_name || "Tidak ada informasi"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Tanggal Prestasi
                      </label>
                      <p className="text-gray-900 font-medium">
                        {achievement.date
                          ? new Date(achievement.date).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "Tidak ada tanggal"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {achievement.tags && achievement.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {achievement.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                      >
                        #{tag.tag_details?.tag || `Tag ${index + 1}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Shares */}
            {achievement.social_media_shares &&
              achievement.social_media_shares.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Social Media Shares
                    </h3>
                    <div className="space-y-3">
                      {achievement.social_media_shares.map((share, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Share2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {share.platform}
                              </p>
                              <p className="text-sm text-gray-500">
                                {share.shared_at
                                  ? new Date(
                                      share.shared_at
                                    ).toLocaleDateString("id-ID")
                                  : "Tanggal tidak tersedia"}
                              </p>
                            </div>
                          </div>
                          {share.share_link && (
                            <a
                              href={share.share_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Lihat Post
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informasi Siswa
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Nama Lengkap
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.students?.full_name || "Tidak ada nama"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      NIS
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.students?.NIS || "Tidak ada NIS"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Kelas
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.students?.class_name
                        ? formatClassName(achievement.students.class_name)
                        : "Tidak ada kelas"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Tahun Lulus
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.students?.graduation_year ||
                        "Tidak ada tahun lulus"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Info Prestasi
                </h3>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Trophy className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">
                          Achievement ID
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          #{achievement.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Dibuat
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.created_at
                        ? new Date(achievement.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Tidak ada tanggal"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Terakhir Diupdate
                    </label>
                    <p className="text-gray-900 font-medium">
                      {achievement.updated_at
                        ? new Date(achievement.updated_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Tidak ada tanggal"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="space-y-3">
                  <a
                    href={`/admin/achievement/edit/${achievement.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Prestasi
                  </a>

                  <button
                    onClick={() =>
                      handleDelete(
                        achievement.id,
                        achievement.title || "Prestasi Tanpa Judul"
                      )
                    }
                    disabled={isDeleteProcessing}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleteProcessing ? "Menghapus..." : "Hapus Prestasi"}
                  </button>

                  <a
                    href="/admin/achievement"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali ke Daftar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
