export const validateDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/validation/validate` , 
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("Status Upload:", response.status);

  if (!response.ok) {
      throw new Error("Gagal upload ke backend");
  }

  const result = await response.json();
  return result;
};