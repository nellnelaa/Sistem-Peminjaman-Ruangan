export const getTemplates = async (nama) => {
  let params = {};
  if (nama) {
    params.nama = nama;
  }

  const queryString = new URLSearchParams(params).toString();
  let url = `${import.meta.env.VITE_API_URL}/template`;
  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getTemplateById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data template");
  }

  return result?.data;
};

export const createTemplate = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("nama_berkas", request.nama_berkas);
  formData.append("file_path", request.file_path);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const updateTemplate = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("nama_berkas", request.nama_berkas);
  formData.append("file_path", request.file_path);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/template/${id}`,
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
    throw new Error(result?.message || "Gagal memperbarui data template");
  }

  return result?.data;
};

export const deleteTemplate = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/template/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
