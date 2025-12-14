// export const getAchievements = async ({
//   full_name,
//   grade,
//   tag,
//   title,
//   category_type,
//   organizer_name,
//   search,
// } = {}) => {
//   let params = {};
//   if (search) {
//     params.search = search;
//   }
//   if (full_name) {
//     params.full_name = full_name;
//   }
//   if (grade) {
//     params.grade = grade;
//   }
//   if (tag) {
//     params.tag = tag;
//   }
//   if (title) {
//     params.title = title;
//   }
//   if (category_type) {
//     params.category_type = category_type;
//   }
//   if (organizer_name) {
//     params.organizer_name = organizer_name;
//   }
//   let url =
//     `${import.meta.env.VITE_API_URL}/achievements?` +
//     new URLSearchParams(params).toString();

//   const response = await fetch(url, {
//     method: "GET",
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }
//   return result?.data;
// };

// // export const getAchievements = async (params = {}) => {
// //   const query = new URLSearchParams();
// //   Object.entries(params).forEach(([key, value]) => {
// //     if (value) query.append(key, value);
// //   });

// //   const url = `${import.meta.env.VITE_API_URL}/achievements?${query.toString()}`;
// //   const response = await fetch(url, {
// //     method: "GET",
// //   });

// //   const result = await response.json();
// //   if (!result?.success) {
// //     throw new Error(result?.message);
// //   }

// //   return result?.data;
// // };

// export const getDetailAchievement = async (id) => {

//   let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

//   const response = await fetch(url, {
//     method: "GET",
//   });

//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }

//   return result?.data;
// };

// export const createStudent = async (request) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("name", request.name);
//   formData.append("nick_name", request.nickName);
//   formData.append("class_id", request.classId);
//   formData.append("university_id", request.universityId);
//   if (request.profilePicture) {
//     formData.append("profile_picture", request.profilePicture);
//   }

//   const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//     method: "POST",
//     body: formData,
//   });

//   // get the data if fetching succeed!
//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }

//   return result?.data;
// };

// export const updateStudent = async (id, request) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("name", request.name);
//   formData.append("nick_name", request.nickName);
//   formData.append("class_id", request.classId);
//   formData.append("university_id", request.universityId);
//   if (request.profilePicture) {
//     formData.append("profile_picture", request.profilePicture);
//   }

//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/students/${id}`,
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//       method: "PUT",
//       body: formData,
//     }
//   );

//   // get the data if fetching succeed!
//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }

//   return result?.data;
// };

// export const deleteStudent = async (id) => {
//   const token = localStorage.getItem("token");

//   let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

//   const response = await fetch(url, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//     method: "DELETE",
//   });

//   // get data
//   const result = await response.json();
//   if (!result?.success) {
//     throw new Error(result?.message);
//   }

//   return result?.data;
// };

// Fungsi yang sudah ada (dari kode Anda)
export const getAchievements = async ({
  full_name,
  grade,
  tag,
  title,
  category_type,
  organizer_name,
  search,
} = {}) => {
  let params = {};
  if (search) {
    params.search = search;
  }
  if (full_name) {
    params.full_name = full_name;
  }
  if (grade) {
    params.grade = grade;
  }
  if (tag) {
    params.tag = tag;
  }
  if (title) {
    params.title = title;
  }
  if (category_type) {
    params.category_type = category_type;
  }
  if (organizer_name) {
    params.organizer_name = organizer_name;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/achievements?` +
    new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getAchievementById = async (id) => {
  let url = `${import.meta.env.VITE_API_URL}/achievements/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const createAchievement = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("student_id", request.student_id);
  formData.append("category_type", request.category_type);
  formData.append("title", request.title);
  formData.append("organizer_name", request.organizer_name);
  formData.append("date", request.date);
  formData.append("points", request.points);
  formData.append("grade", request.grade);
  if (request.image) {
    formData.append("image", request.image);
  }
  if (request.tag_details_id && request.tag_details_id.length > 0) {
    request.tag_details_id.forEach((tagId) => {
      formData.append("tag_details_id", tagId);
    });
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/achievements`, {
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

export const updateAchievement = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("student_id", request.student_id);
  formData.append("category_type", request.category_type);
  formData.append("title", request.title);
  formData.append("organizer_name", request.organizer_name);
  formData.append("date", request.date);
  formData.append("points", request.points);
  formData.append("grade", request.grade);

  if (request.image) {
    formData.append("image", request.image);
  }
  if (request.tag_details_id && request.tag_details_id.length > 0) {
    request.tag_details_id.forEach((tagId) => {
      formData.append("tag_details_id", tagId);
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/achievements/${id}`,
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

export const deleteAchievement = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/achievements/${id}`;

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
