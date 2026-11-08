<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
const router = useRouter()
const mode = ref('login')
const error = ref('')
const success = ref('')
const form = reactive({ name: '', email: '', password: '' })
function submit() {
  error.value = ''; success.value = ''
  try {
    if (mode.value === 'register') auth.signUp(form.name, form.email, form.password)
    else auth.signIn(form.email, form.password, 'customer')
    success.value = 'You are signed in.'
  } catch (issue) { error.value = issue.message }
}
</script>
<template>
  <div class="container account-page"><div v-if="auth.isLoggedIn" class="welcome"><span class="eyebrow">Your Maison account</span><h1 class="serif">Hello, {{ auth.user.name }}.</h1><p class="muted">We're glad you're here.</p><div class="account-links"><RouterLink to="/my-orders">My orders <span>→</span></RouterLink><RouterLink to="/wishlist">Saved pieces <span>→</span></RouterLink><RouterLink to="/support">Help & support <span>→</span></RouterLink></div><button class="btn btn-outline" @click="auth.signOut()">Sign out</button></div><div v-else class="auth-card"><span class="eyebrow">A place of your own</span><h1 class="serif">{{ mode === 'login' ? 'Welcome back.' : 'Make yourself at home.' }}</h1><p class="muted">{{ mode === 'login' ? 'Sign in to find your orders and saved pieces.' : 'Create an account to keep your favourites close.' }}</p><form @submit.prevent="submit"><label v-if="mode === 'register'">Your name<input v-model.trim="form.name" class="field" required autocomplete="name"></label><label>Email address<input v-model.trim="form.email" type="email" class="field" required autocomplete="email"></label><label>Password<input v-model="form.password" type="password" class="field" required :minlength="mode === 'register' ? 6 : 1" autocomplete="current-password"></label><p v-if="error" class="message error">{{ error }}</p><p v-if="success" class="message">{{ success }}</p><button class="btn">{{ mode === 'login' ? 'Sign in' : 'Create account' }}</button></form><p class="switch">{{ mode === 'login' ? 'New around here?' : 'Already have an account?' }} <button @click="mode = mode === 'login' ? 'register' : 'login'; error = ''; success = ''">{{ mode === 'login' ? 'Create an account' : 'Sign in' }}</button></p></div></div>
</template>
<style scoped>
.account-page{padding:68px 18px 90px;display:grid;place-items:center}.auth-card,.welcome{width:min(440px,100%);background:#f7f5f0;padding:38px}.auth-card h1,.welcome h1{font-size:37px;font-weight:500;margin:10px 0}.auth-card>p,.welcome>p{font-size:11px}.auth-card form{margin-top:24px}.auth-card label{display:block;font-size:10px;color:#777;margin:16px 0}.auth-card input{margin-top:7px}.auth-card .btn{width:100%;margin-top:8px}.switch{text-align:center;margin:20px 0 0!important}.switch button{border:0;background:none;text-decoration:underline;font-size:11px}.message{font-size:11px;color:#5e6650}.error{color:#a34835}.account-links{margin:28px 0}.account-links a{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #deddd6;font-size:12px}.welcome .btn{font-size:10px}
</style>
