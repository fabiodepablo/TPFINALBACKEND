// src/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a la base de datos MongoDB');
    } catch (err) {
        console.error('Error conectando a MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
