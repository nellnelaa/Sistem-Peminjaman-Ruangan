export const login = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
};

// export const register = async (request) => {
//   const formData = new FormData();
//   formData.append("name", request.name);
//   formData.append("email", request.email);
//   formData.append("password", request.password);
//   formData.append("profile_picture", request.profilePicture);

//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/auth/register`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const result = await response.json();
//   return result;
// };

export const register = async (request) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  return await response.json();
};

export const profile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  return result;
};

export const forgotPassword = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result;
};