import { seedProducts } from '../data/products'

const KEY = 'fashion-products'

export function getProducts() {
  const saved = localStorage.getItem(KEY)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(KEY, JSON.stringify(seedProducts))
  return [...seedProducts]
}

export function saveProducts(products) {
  localStorage.setItem(KEY, JSON.stringify(products))
  return products
}

export function getProduct(id) {
  return getProducts().find((product) => product.id === id)
}

export function getCategories() {
  return [...new Set(getProducts().map((product) => product.category))]
}
