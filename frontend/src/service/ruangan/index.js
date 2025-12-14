
export const getRuangans = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.nama_ruangan) params.append("nama_ruangan", filters.nama_ruangan);
  if (filters.Gedung) params.append("Gedung", filters.Gedung);
  if (filters.lantai) params.append("lantai", filters.lantai); 
  if (filters.kapasitas) params.append("kapasitas", filters.kapasitas);
  if (filters.status) params.append("status", filters.status);
  if (filters.jenis) params.append("jenis", filters.jenis);
  if (filters.fasilitas) params.append("fasilitas", filters.fasilitas);
  if (filters.jumlah) params.append("jumlah", filters.jumlah);
  if (filters.kondisi) params.append("kondisi", filters.kondisi); 

  const url = `${import.meta.env.VITE_API_URL}/ruangan?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const getRuanganById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/ruangan/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data ruangan");
  }

  return result?.data;
};

export const createRuangan = async (request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/ruangan`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      nama_ruangan: request.nama_ruangan,
      Gedung: request.Gedung, 
      lantai: request.lantai,
      kapasitas: request.kapasitas,
      status: request.status,
      jenis: request.jenis,
      fasilitas: request.fasilitas || [], 
    }),
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const updateRuangan = async (id, request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/ruangan/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        nama_ruangan: request.nama_ruangan,
        Gedung: request.Gedung,
        lantai: request.lantai,
        kapasitas: request.kapasitas,
        status: request.status,
        jenis: request.jenis,
        fasilitas: request.fasilitas || [], 
      }),
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal memperbarui data ruangan");
  }

  return result?.data;
};

export const deleteRuangan = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/ruangan/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      method: "DELETE",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
