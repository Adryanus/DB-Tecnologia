// src/utils/uploadImage.js
export default async function uploadImage(file) {
  const API_KEY = "16e5248d8c43323c4610b413985f5ff8"; // reemplazá con tu clave de ImgBB
  const UPLOAD_URL = "https://api.imgbb.com/1/upload";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${UPLOAD_URL}?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Error al subir la imagen");
    }

    console.log("Imagen subida correctamente:", result.data.url);
    return result.data.url; // URL directa de la imagen subida
  } catch (error) {
    console.error("Error subiendo la imagen:", error);
    throw error;
  }
}

