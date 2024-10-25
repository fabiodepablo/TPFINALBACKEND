// src/app.js

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./db');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // Permitir métodos PUT y DELETE en formularios

// Configuración de Handlebars con layouts
app.engine('handlebars', engine({
    defaultLayout: 'main', // Define el layout principal
    layoutsDir: path.join(__dirname, 'views/layouts'), // Directorio de layouts
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

// Ruta principal: Página de inicio
app.get('/', (req, res) => {
    res.render('index');
});

// Usar rutas con prefijo /api
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Puerto y servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
