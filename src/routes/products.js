const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Importa la función uuidv4 desde la librería uuid

const router = express.Router();

const PRODUCTS_FILE_PATH = './src/data/products.json';

// Función para leer productos desde el archivo
const readProductsFromFile = (callback) => {
  fs.readFile(PRODUCTS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

// Función para escribir productos en el archivo
const writeProductsToFile = (products, callback) => {
  fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  readProductsFromFile((products) => {
    res.json(products);
  });
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  readProductsFromFile((products) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const newProductData = req.body;
  const newProduct = {
    id: uuidv4(), // Genera un nuevo ID utilizando uuidv4
    ...newProductData,
  };

  readProductsFromFile((products) => {
    const updatedProducts = [...products, newProduct];
    writeProductsToFile(updatedProducts, (success) => {
      if (success) {
        res.status(201).json(newProduct);
      } else {
        res.status(500).json({ message: 'Error al agregar el producto' });
      }
    });
  });
});

// Ruta para actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProductData = req.body;

  readProductsFromFile((products) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        product.title = updatedProductData.title;
        product.description = updatedProductData.description;
        product.code = updatedProductData.code;
        product.price = updatedProductData.price;
        product.status = updatedProductData.status;
        product.stock = updatedProductData.stock;
        product.category = updatedProductData.category;
        product.thumbnails = updatedProductData.thumbnails;
      }
      return product;
    });

    writeProductsToFile(updatedProducts, (success) => {
      if (success) {
        res.status(200).json({ message: 'Producto actualizado correctamente' });
      } else {
        res.status(500).json({ message: 'Error al actualizar el producto' });
      }
    });
  });
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;

  readProductsFromFile((products) => {
    const updatedProducts = products.filter((product) => product.id !== productId);

    writeProductsToFile(updatedProducts, (success) => {
      if (success) {
        res.status(200).json({ message: 'Producto eliminado correctamente' });
      } else {
        res.status(500).json({ message: 'Error al eliminar el producto' });
      }
    });
  });
});

module.exports = router; // Exporta el router como middleware

