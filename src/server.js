const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Middleware para parsear JSON
app.use(express.json());

// Rutas para productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
