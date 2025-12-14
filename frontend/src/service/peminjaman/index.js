// services/peminjaman.js

export const getPeminjamans = async (filters = {}) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();

  if (filters.user_id) params.append("user_id", filters.user_id);
  if (filters.ruangan_id) params.append("ruangan_id", filters.ruangan_id);
  if (filters.nama_kegiatan)
    params.append("nama_kegiatan", filters.nama_kegiatan);
  if (filters.tanggal_kegiatan)
    params.append("tanggal_kegiatan", filters.tanggal_kegiatan);
  if (filters.status_peminjaman)
    params.append("status_peminjaman", filters.status_peminjaman);

  const url = `${import.meta.env.VITE_API_URL}/peminjaman?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data peminjaman");
  }

  return result?.data;
};

export const getPeminjamanById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/peminjaman/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data peminjaman");
  }

  return result?.data;
};

export const createPeminjaman = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("ruangan_id", request.ruangan_id);
  formData.append("nama_kegiatan", request.nama_kegiatan);
  formData.append("jumlah_peserta", request.jumlah_peserta);
  formData.append("tanggal_kegiatan", request.tanggal_kegiatan);
  formData.append("jam_mulai", request.jam_mulai);
  formData.append("jam_selesai", request.jam_selesai);

  if (request.deskripsi_kegiatan) {
    formData.append("deskripsi_kegiatan", request.deskripsi_kegiatan);
  }
  if (request.dosen_pendamping) {
    formData.append("dosen_pendamping", request.dosen_pendamping);
  }
  if (request.cs_pendamping) {
    formData.append("cs_pendamping", request.cs_pendamping);
  }
  if (request.satpam_pendamping) {
    formData.append("satpam_pendamping", request.satpam_pendamping);
  }

  if (request.dokumen && request.dokumen.length > 0) {
    request.dokumen.forEach((file) => {
      formData.append("dokumen", file);
    });
  }

  if (request.dokumen_berkas_id && request.dokumen_berkas_id.length > 0) {
    formData.append(
      "dokumen_berkas_id",
      JSON.stringify(request.dokumen_berkas_id)
    );
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/peminjaman`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal membuat peminjaman");
  }

  return result?.data;
};

export const updatePeminjaman = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  if (request.ruangan_id) formData.append("ruangan_id", request.ruangan_id);
  if (request.nama_kegiatan)
    formData.append("nama_kegiatan", request.nama_kegiatan);
  if (request.deskripsi_kegiatan)
    formData.append("deskripsi_kegiatan", request.deskripsi_kegiatan);
  if (request.jumlah_peserta)
    formData.append("jumlah_peserta", request.jumlah_peserta);
  if (request.tanggal_kegiatan)
    formData.append("tanggal_kegiatan", request.tanggal_kegiatan);
  if (request.jam_mulai) formData.append("jam_mulai", request.jam_mulai);
  if (request.jam_selesai) formData.append("jam_selesai", request.jam_selesai);
  if (request.dosen_pendamping)
    formData.append("dosen_pendamping", request.dosen_pendamping);
  if (request.cs_pendamping)
    formData.append("cs_pendamping", request.cs_pendamping);
  if (request.satpam_pendamping)
    formData.append("satpam_pendamping", request.satpam_pendamping);
  if (request.status_peminjaman)
    formData.append("status_peminjaman", request.status_peminjaman);
  if (request.catatan_admin)
    formData.append("catatan_admin", request.catatan_admin);
  if (request.alasan_penolakan)
    formData.append("alasan_penolakan", request.alasan_penolakan);

  if (request.dokumen && request.dokumen.length > 0) {
    request.dokumen.forEach((file) => {
      formData.append("dokumen", file);
    });
  }

  if (request.dokumen_berkas_id && request.dokumen_berkas_id.length > 0) {
    formData.append(
      "dokumen_berkas_id",
      JSON.stringify(request.dokumen_berkas_id)
    );
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/peminjaman/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal memperbarui peminjaman");
  }

  return result?.data;
};

export const deletePeminjaman = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/peminjaman/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      method: "DELETE",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal menghapus peminjaman");
  }

  return result?.data;
};
