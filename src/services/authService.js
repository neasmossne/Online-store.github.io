const SESSION_KEY = 'fashion_store'

export function login(email, password, role = 'customer') {
  if (!email || !password) throw new Error('Email and password are required.')
  if (role === 'admin' && (email !== 'admin@fashio.com' || password !== 'admin123')) {
    throw new Error('Invalid admin credentials.')
  }
  const user = { name: role === 'admin' ? 'fashion Admin' : email.split('@')[0], email, role }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  localStorage.setItem('fashion-token', `demo-${role}-${Date.now()}`)
  return user
}

export function register(name, email, password) {
  if (!name || !email || password.length < 6) throw new Error('Please provide your name, email, and a password of at least 6 characters.')
  const user = { name, email, role: 'customer' }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  localStorage.setItem('fashion-token', `demo-customer-${Date.now()}`)
  return user
}

export function currentUser() {
  const value = localStorage.getItem(SESSION_KEY)
  return value ? JSON.parse(value) : null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('fashion-token')
}
