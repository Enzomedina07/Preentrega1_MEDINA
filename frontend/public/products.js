// URL del servidor
import { addToCart } from './cart';

const BASE_URL = 'http://localhost:8080/api';
const productId = '65da5938900c67443673ac0a';
const cartId = '65da647963bd2c30100672f8';

// Función para cargar los productos desde el servidor
async function loadProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpiar la lista antes de agregar productos

        data.payload.forEach(product => {
            const productItem = document.createElement('div');
            productItem.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Categoría: ${product.category}</p>
                <p>Precio: ${product.price}</p>
                <button onclick="addToCart('${product._id}')">Agregar al Carrito</button>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

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

// Función para agregar un producto al carrito
async function addToCart(productId) {
    try {
        const response = await fetch(`${BASE_URL}/carts/:cid/products/${productId}`, {
            method: 'POST',
        });
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito o error
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
    }
}

// Cargar los productos cuando se cargue la página
window.onload = loadProducts;




  