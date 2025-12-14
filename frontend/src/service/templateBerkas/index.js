// GET ALL
export const getTemplates = async (nama) => {
  let params = {};
  if (nama) {
    params.nama = nama;
  }

  // Tambahkan '?' sebelum query string menggunakan URLSearchParams
  const qs = new URLSearchParams(params).toString();
  const url = `${import.meta.env.VITE_API_URL}/template${qs ? "?" + qs : ""}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data template berkas");
  }

  return result?.data;
};

// GET BY ID
export const getBerkasById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(
      result?.message || "Gagal mengambil detail template berkas"
    );
  }

  return result?.data;
};

// CREATE
export const createBerkas = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("nama_berkas", request.nama_berkas);
  formData.append("file_path", request.file_path); // File upload

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal menambah template berkas");
  }

  return result?.data;
};

// UPDATE
export const updateBerkas = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("nama_berkas", request.nama_berkas);
  formData.append("file_path", request.file_path); // File upload

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template/${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengubah template berkas");
  }

  return result?.data;
};

// DELETE
export const deleteTemplate = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal menghapus template berkas");
  }

  return result?.data;
};
