import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  FileEdit,
} from "lucide-react";
import { getPeminjamans } from "../service/peminjaman";

export const Route = createFileRoute("/berlangsung")({
  component: Berlangsung,
});

function Berlangsung() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: peminjamanData, isLoading } = useQuery({
    queryKey: ["peminjaman"],
    queryFn: () => getPeminjamans(),
  });

  console.log("aaaa", peminjamanData);
  // Debug: Log peminjaman data
  useEffect(() => {
    if (peminjamanData) {
      console.log("Total peminjaman:", peminjamanData.length);
      console.log(
        "Sample peminjaman dates:",
        peminjamanData.slice(0, 5).map((p) => ({
          id: p.id,
          nama: p.nama_kegiatan,
          tanggal: p.tanggal_kegiatan,
          tanggal_only: p.tanggal_kegiatan?.split("T")[0],
        }))
      );
    }
  }, [peminjamanData]);

  // Get month and year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Month names
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Navigate month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  // Get peminjaman for a specific date
  const getPeminjamansForDate = (date) => {
    if (!peminjamanData) return [];

    // Format date as YYYY-MM-DD in local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    return peminjamanData.filter((p) => {
      if (!p.tanggal_kegiatan) return false;

      // Parse the date string directly without timezone conversion
      const peminjamanDateStr = p.tanggal_kegiatan.split("T")[0];

      return peminjamanDateStr === dateStr;
    });
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    const statusMap = {
      Menunggu: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
        icon: Clock,
        label: "Menunggu",
      },
      Review: {
        color: "bg-blue-100 text-blue-700 border-blue-300",
        icon: Loader,
        label: "Review",
      },
      Disetujui: {
        color: "bg-green-100 text-green-700 border-green-300",
        icon: CheckCircle,
        label: "Disetujui",
      },
      Ditolak: {
        color: "bg-red-100 text-red-700 border-red-300",
        icon: XCircle,
        label: "Ditolak",
      },
      Revisi: {
        color: "bg-orange-100 text-orange-700 border-orange-300",
        icon: FileEdit,
        label: "Revisi",
      },
      Selesai: {
        color: "bg-gray-100 text-gray-700 border-gray-300",
        icon: CheckCircle,
        label: "Selesai",
      },
    };
    return statusMap[status] || statusMap.Menunggu;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];

    // Previous month days (Minggu = 0, Senin = 1, ..., Sabtu = 6)
    // Kita ingin Minggu di kolom pertama, jadi tidak perlu adjustment
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        peminjaman: getPeminjamansForDate(date),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const peminjaman = getPeminjamansForDate(date);

      // Debug log for days with peminjaman
      if (peminjaman.length > 0) {
        console.log(
          `Tanggal ${day}/${month + 1}/${year} memiliki ${peminjaman.length} peminjaman:`,
          peminjaman.map((p) => p.nama_kegiatan)
        );
      }

      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday:
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
        peminjaman,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        day,
        date,
        isCurrentMonth: false,
        peminjaman: getPeminjamansForDate(date),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get selected date details
  const selectedDatePeminjaman = selectedDate
    ? getPeminjamansForDate(selectedDate)
    : [];

  // Calculate statistics
  const stats = {
    total: peminjamanData?.length || 0,
    menunggu:
      peminjamanData?.filter((p) => p.status_peminjaman === "Menunggu")
        .length || 0,
    review:
      peminjamanData?.filter((p) => p.status_peminjaman === "Review").length ||
      0,
    disetujui:
      peminjamanData?.filter((p) => p.status_peminjaman === "Disetujui")
        .length || 0,
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data peminjaman...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kalender Peminjaman Fasilitas
          </h1>
          <p className="text-gray-600">
            Fakultas Ilmu Komputer UPN "Veteran" Jawa Timur
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Peminjaman</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.menunggu}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Review</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.review}
                </p>
              </div>
              <Loader className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disetujui</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.disetujui}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Calendar and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[month]} {year}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={goToToday}
                  className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  Hari Ini
                </button>
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day names */}
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((dayInfo, index) => {
                const isSelected =
                  selectedDate &&
                  dayInfo.date.toDateString() === selectedDate.toDateString();

                const statusCounts = dayInfo.peminjaman.reduce((acc, p) => {
                  acc[p.status_peminjaman] =
                    (acc[p.status_peminjaman] || 0) + 1;
                  return acc;
                }, {});

                const hasPeminjaman = dayInfo.peminjaman.length > 0;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      dayInfo.isCurrentMonth && setSelectedDate(dayInfo.date)
                    }
                    className={`
                    relative min-h-[90px] p-2 rounded-lg border transition-all
                    ${!dayInfo.isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"}
                    ${dayInfo.isToday ? "border-2 border-orange-500 bg-orange-50" : "border-gray-200"}
                    ${isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""}
                    ${dayInfo.isCurrentMonth && hasPeminjaman ? "hover:bg-blue-50" : "hover:bg-gray-50"}
                    ${dayInfo.isCurrentMonth ? "cursor-pointer" : "cursor-default"}
                  `}
                    disabled={!dayInfo.isCurrentMonth}
                  >
                    <div
                      className={`text-sm font-semibold mb-1 ${hasPeminjaman && dayInfo.isCurrentMonth ? "text-orange-600" : ""}`}
                    >
                      {dayInfo.day}
                    </div>

                    {/* Status indicators */}
                    {hasPeminjaman && (
                      <div className="space-y-1">
                        {Object.entries(statusCounts)
                          .slice(0, 3) // Limit to 3 status badges
                          .map(([status, count], idx) => {
                            const statusInfo = getStatusInfo(status);
                            return (
                              <div
                                key={idx}
                                className={`text-[10px] px-1.5 py-0.5 rounded ${statusInfo.color} border font-semibold truncate`}
                                title={`${statusInfo.label}: ${count}`}
                              >
                                {count} {statusInfo.label}
                              </div>
                            );
                          })}
                        {Object.keys(statusCounts).length > 3 && (
                          <div className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-300 font-semibold">
                            +{Object.keys(statusCounts).length - 3} lagi
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Keterangan Status:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Menunggu",
                  "Review",
                  "Disetujui",
                  "Ditolak",
                  "Revisi",
                  "Selesai",
                ].map((status) => {
                  const statusInfo = getStatusInfo(status);
                  const Icon = statusInfo.icon;
                  return (
                    <div key={status} className="flex items-center gap-2">
                      <div
                        className={`px-2 py-1 rounded text-xs ${statusInfo.color} border flex items-center gap-1`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="font-medium">{statusInfo.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate
                ? `Detail ${selectedDate.getDate()} ${
                    monthNames[selectedDate.getMonth()]
                  } ${selectedDate.getFullYear()}`
                : "Pilih Tanggal"}
            </h3>

            {!selectedDate ? (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  Pilih tanggal pada kalender untuk melihat detail peminjaman
                </p>
              </div>
            ) : selectedDatePeminjaman.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  Tidak ada peminjaman pada tanggal ini
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {selectedDatePeminjaman.map((peminjaman) => {
                  const statusInfo = getStatusInfo(
                    peminjaman.status_peminjaman
                  );
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div
                      key={peminjaman.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {peminjaman.nama_kegiatan}
                        </h4>
                        <div
                          className={`px-2 py-1 rounded text-xs ${statusInfo.color} border flex items-center gap-1`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span className="font-medium">
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>
                            {peminjaman.ruangan?.nama_ruangan || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>
                            {peminjaman.jam_mulai} - {peminjaman.jam_selesai}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span>{peminjaman.users?.name || "N/A"}</span>
                        </div>

                        {peminjaman.jumlah_peserta && (
                          <div className="text-gray-600">
                            <span className="font-medium">Peserta:</span>{" "}
                            {peminjaman.jumlah_peserta} orang
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
