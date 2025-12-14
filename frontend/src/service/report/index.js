export const getReports = async ( name, email, text, search) => {
  let params = {};
  if (search) {
    params.search = search;
  }
  if (name) {
    params.name = name;
  }
  if (email) {
    params.email = email;
  }
  if (text) {
    params.text = text;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/reports` + new URLSearchParams(params);

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getReportById = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/reports/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const createReport = async (request) => {

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("text", request.text);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const updateReport = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("text", request.text);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reports/${id}`,
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
    throw new Error(result?.message);
  }

  return result?.data;
};

export const deleteReport = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/reports/${id}`;

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


// export const getReports = async () => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
//     method: "GET",
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };

// export const getDetailReport = async (id) => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/reports/${id}`, {
//     method: "GET",
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };

// export const createReport = async (request) => {
//   const formData = new FormData();
//   formData.append("name", request.name);
//   formData.append("email", request.email);
//   formData.append("text", request.text);

//   const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
//     method: "POST",
//     body: formData,
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };

// export const updateReport = async (id, request) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("name", request.name);
//   formData.append("email", request.email);
//   formData.append("text", request.text);

//   const response = await fetch(`${import.meta.env.VITE_API_URL}/reports/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//     method: "PUT",
//     body: formData,
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };

// export const deleteReport = async (id) => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(`${import.meta.env.VITE_API_URL}/reports/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//     method: "DELETE",
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };