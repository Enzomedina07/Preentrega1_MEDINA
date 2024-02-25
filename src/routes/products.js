const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Importa el modelo de producto

// Middleware para parsear JSON
router.use(express.json());

// Ruta GET / para obtener productos
router.get('/', async (req, res) => {
  try {
      const { limit = 10, page = 1, sort, query } = req.query;
      // Construir el objeto de opciones de búsqueda
      const options = {
          limit: parseInt(limit),
          page: parseInt(page),
          sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null
      };
      // Construir el objeto de consulta
      const filter = query ? { category: query } : {};
      // Realizar la búsqueda de productos con paginación
      const products = await Product.paginate(filter, options);
      // Construir el objeto de respuesta según el formato requerido
      const totalPages = Math.ceil(products.total / limit);
      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;
      const hasPrevPage = prevPage !== null;
      const hasNextPage = nextPage !== null;
      const prevLink = hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}` : null;
      const nextLink = hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}` : null;
      const response = {
          status: 'success',
          payload: products.docs,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink
      };

      res.json(response);
  } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
  }
});

// Ruta POST / para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
      const newProduct = await Product.create(req.body);
      res.status(201).json({ status: 'success', data: newProduct });
  } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ status: 'error', message: 'Error al crear producto' });
  }
});

// Ruta DELETE /:id para eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
          return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
  }
});

// Ruta PUT /:id para actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(200).json({ status: 'success', data: updatedProduct });
  } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ status: 'error', message: 'Error al actualizar producto' });
  }
});
// Ruta POST /add-to-cart para agregar un producto al carrito
router.post('/add-to-cart', async (req, res) => {
  const { productId, cartId } = req.body;
  try {
    const cart = await fetchCart(cartId); // Obtener el carrito
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    // Agregar el producto al carrito
    cart.products.push(productId);
    await updateCart(cartId, cart); // Actualizar el carrito
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
module.exports = router;

