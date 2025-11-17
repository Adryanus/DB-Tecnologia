export const validateProducts = (products, fileRequired = true) => {
    const errors = {};
    if (!products.name || products.name.trim() === "") {
        errors.name = "El nombre es obligatorio";
    }
    if (!products.price || products.price <= 0) {
        errors.price = "El precio debe ser un número positivo";
    }
    if (!products.description || products.description.trim() === "") {
        errors.description = "La descripcion es obligatoria";
    }
    if (!products.category || products.category.trim() === "") {
        errors.category = "La categoria es obligatoria";
    }
    if (fileRequired && !products.file) {
        errors.file = "Debe seleccionar una imagen";
    }
    return errors;
};
