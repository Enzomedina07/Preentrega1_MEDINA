// Importar la función addToCart del archivo cart.js
import { addToCart } from './cart';

// Obtener el ID del producto y del carrito (reemplazar con los IDs reales)
const productId = 'ID_DEL_PRODUCTO';
const cartId = 'ID_DEL_CARRITO';

// Agregar un event listener al botón de "Agregar al carrito"
document.getElementById('addToCartButton').addEventListener('click', () => {
  // Llamar a la función addToCart al hacer clic en el botón
  addToCart(productId, cartId)
    .then(data => {
      // Manejar la respuesta del servidor si es necesario
      console.log('Producto agregado al carrito:', data);
      // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o actualizar la vista del carrito
    })
    .catch(error => {
      // Manejar errores si la solicitud falla
      console.error('Error al agregar el producto al carrito:', error);
      // Aquí puedes mostrar un mensaje de error al usuario o realizar otra acción apropiada
    });
});
