// src/controllers/cartController.js

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Obtener todos los carritos
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.product');
        res.render('cart', { carts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({
                products: [{ product: productId, quantity }]
            });
        } else {
            const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].quantity += parseInt(quantity);
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.redirect('/api/carts');
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Eliminar producto del carrito
exports.deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();

        res.json({ status: 'success', message: 'Producto eliminado del carrito' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Actualizar cantidad de producto en el carrito
exports.updateProductQuantityInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findById(cid);

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = parseInt(quantity);
            await cart.save();
            res.json({ status: 'success', message: 'Cantidad actualizada' });
        } else {
            res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Eliminar todos los productos del carrito
exports.clearCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid);

        cart.products = [];
        await cart.save();

        res.json({ status: 'success', message: 'Carrito vaciado' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
