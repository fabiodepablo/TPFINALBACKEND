// src/models/Cart.js

const mongoose = require('mongoose');

// Esquema de carritos
const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
