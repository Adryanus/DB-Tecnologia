import React, { useState } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import uploadImage  from "../../../services/uploadImage";
import { createProduct } from "../../../services/product";

export const ProductFormContainer = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageURL: "",
    preview: null, // para mostrar la vista previa
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Manejo de cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Manejo del archivo y vista previa
  const handleFileChange = (file) => {
    setFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProduct((prev) => ({ ...prev, preview: previewUrl }));
    } else {
      setProduct((prev) => ({ ...prev, preview: null }));
    }
  };

  // ✅ Validaciones básicas
  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "El nombre es obligatorio.";
    if (!product.price) newErrors.price = "El precio es obligatorio.";
    if (!product.category) newErrors.category = "La categoría es obligatoria.";
    if (!product.description)
      newErrors.description = "La descripción es obligatoria.";
    if (!file) newErrors.file = "Debe seleccionar una imagen.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // 1️⃣ Subir imagen a ImgBB
      const imageURL = await uploadImage(file);

      // 2️⃣ Crear producto en MockAPI
      const newProduct = {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        imageURL, // campo que usa MockAPI
      };

      await createProduct(newProduct);
      alert("✅ Producto creado con éxito!");

      // 3️⃣ Limpiar formulario
      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        imageURL: "",
        preview: null,
      });
      setFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("❌ Ocurrió un error al crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
