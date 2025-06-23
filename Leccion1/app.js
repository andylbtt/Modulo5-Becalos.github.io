// app.js
const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
  const order = { id: orderId++, status: 'En Proceso' };
  addOrder(order);
  processOrder(order);
});

function addOrder(order) {
  const listItem = document.createElement('li');
  listItem.id = `order-${order.id}`;
  listItem.textContent = `☕ Pedido #${order.id}: ${order.status}`;
  orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
  const listItem = document.getElementById(`order-${order.id}`);
  if (listItem) {
    listItem.textContent = `☕ Pedido #${order.id}: ${status}`;
    if (status === 'Completado') {
      listItem.classList.add('completed');
    }
  }
}

async function processOrder(order) {
  // Simula tiempo de preparación aleatorio entre 2 y 5 segundos
  const prepTime = Math.floor(Math.random() * 3000) + 2000;

  await new Promise(resolve => setTimeout(resolve, prepTime));

  updateOrderStatus(order, 'Completado');
}
