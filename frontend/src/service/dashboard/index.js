// =====================================
// services/dashboardService.js
// =====================================

export const getDashboardStats = async (period, class_name, category) => {
  let params = {};

  if (period) {
    params.period = period;
  }

  if (class_name) {
    params.class_name = class_name;
  }

  if (category) {
    params.category = category;
  }

  const searchParams = new URLSearchParams(params);
  let url = `${import.meta.env.VITE_API_URL}/dashboards`;

  if (searchParams.toString()) {
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add authorization if needed
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

// Additional service functions if needed
export const getStudentsStats = async (period, class_name) => {
  let params = {};

  if (period) {
    params.period = period;
  }

  if (class_name) {
    params.class_name = class_name;
  }

  const searchParams = new URLSearchParams(params);
  let url = `${import.meta.env.VITE_API_URL}/dashboard/students`;

  if (searchParams.toString()) {
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const getAchievementsStats = async (period, category) => {
  let params = {};

  if (period) {
    params.period = period;
  }

  if (category) {
    params.category = category;
  }

  const searchParams = new URLSearchParams(params);
  let url = `${import.meta.env.VITE_API_URL}/dashboard/achievements`;

  if (searchParams.toString()) {
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    },
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};
