import { defineStore } from 'pinia'
import { currentUser, login, logout, register } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: currentUser() }),
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isLoggedIn: (state) => Boolean(state.user),
  },
  actions: {
    signIn(email, password, role) { this.user = login(email, password, role) },
    signUp(name, email, password) { this.user = register(name, email, password) },
    signOut() { logout(); this.user = null },
  },
})
