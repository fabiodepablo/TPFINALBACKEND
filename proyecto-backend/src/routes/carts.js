// src/routes/carts.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas de carritos
router.get('/', cartController.getAllCarts);
router.post('/add', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantityInCart);
router.delete('/:cid', cartController.clearCart);

module.exports = router;
