const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Definición del esquema de producto
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    // Otros campos de tu esquema de producto, si los tienes
});

// Agregar paginación al esquema de producto
productSchema.plugin(mongoosePaginate);

// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);

module.exports = Product;


