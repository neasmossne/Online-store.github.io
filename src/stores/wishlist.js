import { defineStore } from 'pinia'

const KEY = 'maison-wishlist'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({ ids: JSON.parse(localStorage.getItem(KEY) || '[]') }),
  getters: { count: (state) => state.ids.length, has: (state) => (id) => state.ids.includes(id) },
  actions: {
    toggle(id) {
      this.ids = this.ids.includes(id) ? this.ids.filter((item) => item !== id) : [...this.ids, id]
      localStorage.setItem(KEY, JSON.stringify(this.ids))
    },
  },
})
