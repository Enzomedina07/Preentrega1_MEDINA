// URL del servidor
const BASE_URL = 'http://localhost:8080/api';

// Obtener el carrito desde el servidor
async function fetchCart(cartId) {
  try {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return null;
  }
}

// Actualizar el carrito en el servidor
async function updateCart(cartId, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    return null;
  }
}

// Agregar producto al carrito en el servidor
async function addToCart(productId, cartId) {
  try {
    const response = await fetch(`${BASE_URL}/cart/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    return null;
  }
}

// Ejemplo de uso de addToCart en el frontend
const productId = 'ID_DEL_PRODUCTO'; // Debes reemplazar esto con el ID del producto seleccionado
const cartId = '65da647963bd2c30100672f8'; // ID del carrito

// Llama a la función addToCart al hacer clic en un botón, por ejemplo
document.getElementById('addToCartButton').addEventListener('click', () => {
  addToCart(productId, cartId);
});

// Exportar las funciones para su uso en otros archivos
export { fetchCart, updateCart, addToCart };



