const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

const router = express.Router();

// Objeto para almacenar carritos en memoria
const carts = {};

// Ruta al archivo carts.json
const path = require('path');
const CARTS_FILE_PATH = './src/data/carts.json';



// Función para escribir carritos en el archivo
const writeCartsToFile = async () => {
  try {
    await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2), 'utf8');
    console.log(`Carts actualizados en el archivo ${CARTS_FILE_PATH}`);
    return true;
  } catch (error) {
    console.error(`Error al escribir en el archivo ${CARTS_FILE_PATH}:`, error);
    return false;
  }
};


// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCartId = uuidv4();
  carts[newCartId] = { id: newCartId, user: req.body.user, products: [] };
  await writeCartsToFile(); // Guarda el estado actual en el archivo
  res.status(201).json(carts[newCartId]);
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  if (!carts[cartId]) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  // Buscar el producto en el carrito
  const productIndex = carts[cartId].products.findIndex((product) => product.product === productId);

  if (productIndex !== -1) {
    // El producto ya existe en el carrito, actualizamos la cantidad
    carts[cartId].products[productIndex].quantity += quantity;
  } else {
    // El producto no existe en el carrito, lo agregamos
    carts[cartId].products.push({
      product: productId,
      quantity: quantity,
    });
  }

  // Guarda el estado actual en el archivo
  await writeCartsToFile();
  res.status(200).json({ message: 'Producto agregado al carrito correctamente', cart: carts[cartId] });
});
// Ruta para obtener la lista de carritos
router.get('/', (req, res) => {
  res.status(200).json(Object.values(carts));
});

module.exports = router;










