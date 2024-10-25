// src/routes/products.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas de productos
router.get('/', productController.getProducts);
router.get('/add', productController.showAddProductForm);
router.post('/', productController.createProduct);
router.get('/:id/edit', productController.editProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
