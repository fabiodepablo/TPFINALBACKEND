// src/models/Product.js

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Esquema de productos
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

// Paginación
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
