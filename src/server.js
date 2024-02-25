const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use(cors({
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
}));
// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "frontend/public"
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Ruta para servir la vista de productos
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'products.html'));
});

// Ruta para servir la vista de carritos
app.get('/cart/:cartId', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'carts.html'));
});

// Rutas para productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Conexión a MongoDB
const PORT = process.env.PORT || 8080;
const mongoURI = 'mongodb://127.0.0.1:27017/gamestore'; // Cambia "gamestore" por el nombre de tu base de datos

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
    // Iniciar el servidor una vez conectado a la base de datos
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});










