const KEY = 'maison-orders'

export function getOrders() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function createOrder(order) {
  const orders = getOrders()
  const created = { ...order, id: `MS-${Date.now().toString().slice(-7)}`, status: 'Processing', date: new Date().toISOString() }
  localStorage.setItem(KEY, JSON.stringify([created, ...orders]))
  return created
}

export function updateOrder(id, updates) {
  const orders = getOrders()
  const index = orders.findIndex((order) => order.id === id)
  if (index < 0) throw new Error('Order not found.')
  orders[index] = { ...orders[index], ...updates }
  localStorage.setItem(KEY, JSON.stringify(orders))
  return orders[index]
}
