import { defineStore } from 'pinia'

const KEY = 'maison-cart'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: JSON.parse(localStorage.getItem(KEY) || '[]') }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    persist() { localStorage.setItem(KEY, JSON.stringify(this.items)) },
    add(product, size = product.sizes[0], quantity = 1) {
      const existing = this.items.find((item) => item.id === product.id && item.size === size)
      if (existing) existing.quantity += quantity
      else this.items.push({ ...product, size, quantity })
      this.persist()
    },
    setQuantity(id, size, quantity) {
      const item = this.items.find((entry) => entry.id === id && entry.size === size)
      if (item) item.quantity = Math.max(1, Number(quantity) || 1)
      this.persist()
    },
    remove(id, size) { this.items = this.items.filter((item) => item.id !== id || item.size !== size); this.persist() },
    clear() { this.items = []; this.persist() },
  },
})
