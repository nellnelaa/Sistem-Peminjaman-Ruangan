import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  FileText,
  User,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Link,
  Edit,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPeminjamanById } from "../../../../service/peminjaman";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/admin/peminjaman/detail/$id")({
  component: DetailPeminjaman,
});

function DetailPeminjaman() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const {
    data: peminjaman,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["peminjaman", id],
    queryFn: () => getPeminjamanById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !peminjaman) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <p className="text-xl font-semibold text-gray-900 mb-2">
              Data tidak ditemukan
            </p>
            <p className="text-gray-600 mb-6">
              Peminjaman yang Anda cari tidak tersedia
            </p>
            <button
              onClick={() => navigate({ to: "/admin/peminjaman" })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Kembali ke Daftar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      Menunggu: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: Clock,
        label: "Menunggu",
      },
      Review: {
        color: "bg-blue-100 text-blue-800 border-blue-300",
        icon: AlertCircle,
        label: "Review",
      },
      Disetujui: {
        color: "bg-green-100 text-green-800 border-green-300",
        icon: CheckCircle,
        label: "Disetujui",
      },
      Ditolak: {
        color: "bg-red-100 text-red-800 border-red-300",
        icon: XCircle,
        label: "Ditolak",
      },
      Revisi: {
        color: "bg-orange-100 text-orange-800 border-orange-300",
        icon: AlertCircle,
        label: "Revisi",
      },
      Selesai: {
        color: "bg-gray-100 text-gray-800 border-gray-300",
        icon: CheckCircle,
        label: "Selesai",
      },
    };

    const config = statusConfig[status] || statusConfig.Menunggu;
    const Icon = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold ${config.color}`}
      >
        <Icon className="h-5 w-5" />
        <span>{config.label}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate({ to: "/admin/peminjaman" })}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Detail Peminjaman
              </h1>
              <p className="text-gray-600">
                Informasi lengkap peminjaman ruangan
              </p>
            </div>

            <div className="flex gap-2">
              {getStatusBadge(peminjaman.status_peminjaman)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informasi Kegiatan */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Informasi Kegiatan
              </h2>

              <div className="space-y-4">
                <InfoRow
                  label="Nama Kegiatan"
                  value={peminjaman.nama_kegiatan}
                  className="text-lg font-semibold"
                />

                <InfoRow
                  label="Deskripsi Kegiatan"
                  value={peminjaman.deskripsi_kegiatan || "-"}
                  className="text-gray-700"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                  <InfoRow
                    icon={Calendar}
                    label="Tanggal Kegiatan"
                    value={formatDate(peminjaman.tanggal_kegiatan)}
                  />

                  <InfoRow
                    icon={Clock}
                    label="Waktu"
                    value={
                      peminjaman.jam_mulai && peminjaman.jam_selesai
                        ? `${peminjaman.jam_mulai} - ${peminjaman.jam_selesai}`
                        : "-"
                    }
                  />

                  <InfoRow
                    icon={Users}
                    label="Jumlah Peserta"
                    value={`${peminjaman.jumlah_peserta || 0} orang`}
                  />
                </div>
              </div>
            </div>

            {/* Informasi Ruangan */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Informasi Ruangan
              </h2>

              {peminjaman.ruangan ? (
                <div className="space-y-4">
                  <InfoRow
                    label="Nama Ruangan"
                    value={peminjaman.ruangan.nama_ruangan}
                    className="text-lg font-semibold"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                    <InfoRow
                      icon={Building2}
                      label="Gedung"
                      value={peminjaman.ruangan.Gedung}
                    />

                    <InfoRow
                      label="Lantai"
                      value={`Lantai ${peminjaman.ruangan.lantai}`}
                    />

                    <InfoRow
                      label="Kapasitas"
                      value={`${peminjaman.ruangan.kapasitas} orang`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow
                      label="Jenis Ruangan"
                      value={peminjaman.ruangan.jenis}
                    />

                    <InfoRow
                      label="Status Ruangan"
                      value={peminjaman.ruangan.status}
                      valueClassName={
                        peminjaman.ruangan.status === "Tersedia"
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    />
                  </div>

                  {/* Fasilitas */}
                  {peminjaman.ruangan.fasilitas &&
                    peminjaman.ruangan.fasilitas.length > 0 && (
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Fasilitas Tersedia:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {peminjaman.ruangan.fasilitas.map((f) => (
                            <div
                              key={f.id}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span>
                                {f.fasilitas_details_rel?.nama} ({f.jumlah}) -{" "}
                                <span
                                  className={
                                    f.kondisi === "baik"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {f.kondisi}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <p className="text-gray-500">Data ruangan tidak tersedia</p>
              )}
            </div>

            {/* Penanggung Jawab & Pendamping */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Penanggung Jawab & Pendamping
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoRow
                  label="Dosen Pendamping"
                  value={peminjaman.dosen_pendamping || "-"}
                />

                <InfoRow
                  label="CS Pendamping"
                  value={peminjaman.cs_pendamping || "-"}
                />

                <InfoRow
                  label="Satpam Pendamping"
                  value={peminjaman.satpam_pendamping || "-"}
                />
              </div>
            </div>

            {/* Dokumen Pendukung */}
            {peminjaman.dokumen_peminjaman &&
              peminjaman.dokumen_peminjaman.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-600" />
                    Dokumen Pendukung
                  </h2>

                  <DokumenList
                    dokumen={peminjaman.dokumen_peminjaman}
                    peminjamanId={peminjaman.id}
                  />
                </div>
              )}

            {/* Catatan Admin & Alasan Penolakan */}
            {(peminjaman.catatan_admin || peminjaman.alasan_penolakan) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                  Catatan & Keterangan
                </h2>

                <div className="space-y-4">
                  {peminjaman.catatan_admin && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Catatan Admin:
                      </p>
                      <p className="text-sm text-blue-800">
                        {peminjaman.catatan_admin}
                      </p>
                    </div>
                  )}

                  {peminjaman.alasan_penolakan && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-900 mb-1">
                        Alasan Penolakan:
                      </p>
                      <p className="text-sm text-red-800">
                        {peminjaman.alasan_penolakan}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Informasi Peminjam */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Informasi Peminjam
              </h2>

              {peminjaman.users ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {peminjaman.users.name}
                      </p>
                      {peminjaman.users.no_pokok && (
                        <p className="text-sm text-gray-600">
                          {peminjaman.users.no_pokok}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    {peminjaman.users.email && (
                      <InfoRow
                        label="Email"
                        value={peminjaman.users.email}
                        className="text-sm break-all"
                      />
                    )}

                    {peminjaman.users.prodi && (
                      <InfoRow
                        label="Program Studi"
                        value={peminjaman.users.prodi}
                      />
                    )}

                    {peminjaman.users.fakultas && (
                      <InfoRow
                        label="Fakultas"
                        value={peminjaman.users.fakultas}
                      />
                    )}

                    {peminjaman.users.jabatan && (
                      <InfoRow
                        label="Jabatan"
                        value={peminjaman.users.jabatan}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Data peminjam tidak tersedia</p>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Timeline
              </h2>

              <div className="space-y-4">
                <TimelineItem
                  label="Dibuat"
                  value={formatDateTime(peminjaman.created_at)}
                  icon={Calendar}
                  iconColor="text-blue-600"
                />

                <TimelineItem
                  label="Terakhir Diperbarui"
                  value={formatDateTime(peminjaman.updated_at)}
                  icon={Clock}
                  iconColor="text-green-600"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-sm font-medium mb-4 opacity-90">
                Ringkasan Cepat
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">ID Peminjaman</span>
                  <span className="font-semibold">#{peminjaman.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Status</span>
                  <span className="font-semibold">
                    {peminjaman.status_peminjaman}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS */
function InfoRow({
  label,
  value,
  icon: Icon,
  className = "",
  valueClassName = "",
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className={`text-gray-900 ${valueClassName || className}`}>
        {value || "-"}
      </p>
    </div>
  );
}

function TimelineItem({
  label,
  value,
  icon: Icon,
  iconColor = "text-gray-600",
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${iconColor}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}

export default DetailPeminjaman;

/* Component untuk List Dokumen dengan Verifikasi */
function DokumenList({ dokumen, peminjamanId }) {
  const queryClient = useQueryClient();
  const [verifyingId, setVerifyingId] = useState(null);

  const { mutate: verifikasiDokumen, isPending } = useMutation({
    mutationFn: async (dokumenId) => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/dokumen-peminjaman/verifikasi/${dokumenId}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!result?.success) {
        throw new Error(result?.message || "Gagal memverifikasi dokumen");
      }

      return result?.data;
    },
    onSuccess: (data, dokumenId) => {
      toast.success("Dokumen berhasil diverifikasi!");
      // Refresh data peminjaman
      queryClient.invalidateQueries({ queryKey: ["peminjaman", peminjamanId] });
      setVerifyingId(null);
    },
    onError: (error, dokumenId) => {
      toast.error(error?.message || "Gagal memverifikasi dokumen");
      setVerifyingId(null);
    },
  });

  const handleVerifikasi = (dokumenId) => {
    setVerifyingId(dokumenId);
    verifikasiDokumen(dokumenId);
  };

  const getStatusBadge = (status) => {
    if (status === "Valid") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          <CheckCircle className="h-3 w-3" />
          Valid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
        <XCircle className="h-3 w-3" />
        Belum Valid
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {dokumen.map((doc, idx) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1">
            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {doc.template_berkas?.nama_berkas || `Dokumen ${idx + 1}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {doc.status_verifikasi && getStatusBadge(doc.status_verifikasi)}
                {doc.catatan_verifikator && (
                  <span className="text-xs text-gray-500 truncate">
                    {doc.catatan_verifikator}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {/* Tombol Download */}
            {doc.file_url && (
              <a
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                title="Path Dokumen"
              >
                <Link className="h-4 w-4" />
              </a>
            )}

            {/* Tombol Verifikasi */}
            <button
              onClick={() => handleVerifikasi(doc.id)}
              disabled={isPending && verifyingId === doc.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-600 text-white hover:bg-purple-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Verifikasi dengan ML"
            >
              {isPending && verifyingId === doc.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verifikasi ML</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
