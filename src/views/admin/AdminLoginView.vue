<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
const router = useRouter()
const form = reactive({ email: 'admin@maison.com', password: 'admin123' })
const error = ref('')
function submit() {
  try { auth.signIn(form.email, form.password, 'admin'); router.push('/admin') }
  catch (issue) { error.value = issue.message }
}
</script>
<template><main class="login-page"><RouterLink to="/" class="wordmark"><span>fashion-store.</span></RouterLink><form @submit.prevent="submit"><span class="eyebrow">Studio access</span><h1 class="serif">Welcome back.</h1><p>Sign in to manage your fashion store.</p><label>Email address<input v-model="form.email" class="field" type="email" required></label><label>Password<input v-model="form.password" class="field" type="password" required></label><p v-if="error" class="error">{{ error }}</p><button class="btn">Sign in to dashboard</button><small>Demo access: admin@fasion.com / admin123</small></form><RouterLink to="/" class="back">← Return to the store</RouterLink></main></template>
<style scoped>
.login-page{min-height:100vh;background:#f7f5f0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:25px}.wordmark{font:600 32px "Playfair Display",serif;margin-bottom:25px}.wordmark span{color:#c1775c}.login-page form{width:min(420px,100%);background:#fff;padding:36px}.login-page h1{font-size:34px;font-weight:500;margin:10px 0}.login-page form>p{font-size:11px;color:#777;margin-bottom:24px}.login-page label{display:block;font-size:10px;color:#777;margin:15px 0}.login-page input{margin-top:7px}.login-page .btn{width:100%;margin-top:8px}.login-page small{display:block;text-align:center;font-size:9px;color:#888;margin-top:16px}.login-page .back{font-size:10px;margin-top:20px;text-decoration:underline}.error{color:#a34835!important}
</style>
