export const getTags = async (tag) => {
  let params = {};
  if (tag) {
    params.tag = tag;
  }

  let url =
    `${import.meta.env.VITE_API_URL}/tags` + new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getTagById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/tags/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data tag");
  }

  return result?.data;
};

export const createTag = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("tag", request.tag);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tags`, {
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

export const updateTag = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("tag", request.tag);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/tags/${id}`,
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
    throw new Error(result?.message || "Gagal memperbarui data tag");
  }

  return result?.data;
};

export const deleteTag = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/tags/${id}`;

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
