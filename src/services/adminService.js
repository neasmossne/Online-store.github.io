import { getOrders } from './orderService'
import { getProducts } from './productService'

export function getDashboardStats() {
  const orders = getOrders()
  return {
    revenue: orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    orders: orders.length,
    products: getProducts().length,
    customers: new Set(orders.map((order) => order.customer?.email).filter(Boolean)).size,
  }
}
