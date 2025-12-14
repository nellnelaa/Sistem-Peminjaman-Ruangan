export const getFasilitas = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/fasilitas`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data fasilitas");
  }

  return result?.data;
};

export const getFasilitasById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/fasilitas/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data fasilitas");
  }

  return result?.data;
};

export const createFasilitas = async (request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/fasilitas`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(request),
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal membuat fasilitas");
  }

  return result?.data;
};

export const updateFasilitas = async (id, request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/fasilitas/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(request),
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal memperbarui data fasilitas");
  }

  return result?.data;
};

export const deleteFasilitas = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/fasilitas/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal menghapus fasilitas");
  }

  return result?.data;
};

export const getRuanganList = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/ruangan`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data ruangan");
  }

  return result?.data;
};

export const getFasilitasDetailsList = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/fasilitas-details`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(
      result?.message || "Gagal mengambil data fasilitas details"
    );
  }

  return result?.data;
};
