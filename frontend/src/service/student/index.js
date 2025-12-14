export const getStudents = async (NIS, full_name) => {
  
  let params = {};
  if (NIS) {
    params.NIS = NIS;
  }
  if (full_name) {
    params.full_name = full_name;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/students` + new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  } 
  return result?.data;
};

export const getStudentById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal mengambil data siswa");
  }

  return result?.data;
};

export const createStudent = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("full_name", request.full_name); 
  formData.append("NIS", request.NIS);
  formData.append("class_name", request.class_name);
  formData.append("graduation_year", request.graduation_year);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
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

export const updateStudent = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("full_name", request.full_name);
  formData.append("NIS", request.NIS);
  formData.append("class_name", request.class_name);
  formData.append("graduation_year", request.graduation_year);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message || "Gagal memperbarui data siswa");
  }

  return result?.data;
};

export const deleteStudent = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};
