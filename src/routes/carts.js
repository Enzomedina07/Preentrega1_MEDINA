const express = require('express');
const cartsRouter = express.Router();
const Cart = require('../models/cart'); // Importa el modelo del carrito
const Product = require('../models/product'); // Importa el modelo de producto

// Ruta para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ user: req.body.user, products: [] });
    res.status(201).json({ status: 'success', data: newCart });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
  }
});

// Ruta para agregar un producto al carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    cart.products.push(product);
    await cart.save();
    res.status(200).json({ status: 'success', data: cart });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
  }
});

// Ruta para obtener la lista de carritos
cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ status: 'success', data: carts });
  } catch (error) {
    console.error('Error al obtener la lista de carritos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener la lista de carritos' });
  }
});

// Ruta para eliminar un carrito por ID
cartsRouter.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(cid);
    if (!deletedCart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.status(200).json({ status: 'success', message: 'Carrito eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el carrito' });
  }
});

// Agregar el endpoint DELETE para eliminar un producto específico del carrito
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    cart.products = cart.products.filter(product => product.toString() !== pid);
    await cart.save();
    res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
  }
});

// Agregar el endpoint PUT para actualizar el carrito con un arreglo de productos
cartsRouter.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    cart.products = products;
    await cart.save();
    res.status(200).json({ status: 'success', data: cart });
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito' });
  }
});

// Agregar el endpoint PUT para actualizar la cantidad de ejemplares del producto en el carrito
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    const productIndex = cart.products.findIndex(product => product.toString() === pid);
    if (productIndex === -1) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ status: 'success', message: 'Cantidad del producto actualizada en el carrito' });
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// Endpoint para eliminar todos los productos del carrito
cartsRouter.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    cart.products = [];
    await cart.save();
    res.status(200).json({ status: 'success', message: 'Todos los productos del carrito fueron eliminados' });
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar todos los productos del carrito' });
  }
});

module.exports = cartsRouter;















