export const getLeaderboard = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/leaderboards`,
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result?.data?.data;
};