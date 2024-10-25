// src/controllers/productController.js

const Product = require('../models/Product');

// Mostrar formulario para agregar producto
exports.showAddProductForm = (req, res) => {
    res.render('addProduct');
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, stock } = req.body;
        const newProduct = new Product({ title, description, price, stock });
        await newProduct.save();
        res.redirect('/api/products');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Obtener productos con paginación, filtros y ordenamiento
exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
        const sortOrder = sort === 'asc' ? 1 : -1;

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sortOrder } : {},
            lean: true
        };

        const result = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? result.prevPage : null,
            nextPage: result.hasNextPage ? result.nextPage : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Editar producto
exports.editProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('editProduct', { product });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
    try {
        const { title, description, price, stock } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { title, description, price, stock });
        res.redirect('/api/products');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/api/products');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
