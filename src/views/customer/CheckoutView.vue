<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
const cart = useCartStore()
const router = useRouter()
const error = ref('')
const form = reactive({ name: '', email: '', phone: '', address: '', city: '', delivery: 'standard' })
function continueToPayment() {
  if (!cart.items.length) { router.push('/shop'); return }
  sessionStorage.setItem('maison-checkout', JSON.stringify(form))
  error.value = ''
  router.push('/payment')
}
</script>
<template>
  <div class="container checkout-page"><div class="checkout-head"><span class="eyebrow">Almost yours</span><h1 class="serif">Delivery details</h1><div class="steps"><span class="active">01 &nbsp; DELIVERY</span><span>02 &nbsp; PAYMENT</span><span>03 &nbsp; CONFIRMATION</span></div></div>
    <div class="checkout-grid"><form class="checkout-form" @submit.prevent="continueToPayment"><h2>Where should we send it?</h2><div class="form-grid"><label>Full name<input v-model.trim="form.name" class="field" required autocomplete="name"></label><label>Email address<input v-model.trim="form.email" type="email" class="field" required autocomplete="email"></label><label>Phone number<input v-model.trim="form.phone" type="tel" class="field" required autocomplete="tel"></label><label>City / Province<input v-model.trim="form.city" class="field" required></label><label class="wide">Street address<input v-model.trim="form.address" class="field" required autocomplete="street-address"></label></div><h2 class="delivery-title">Choose delivery</h2><label class="delivery-option"><input v-model="form.delivery" type="radio" value="standard"><span><strong>Standard delivery</strong><small>2–4 business days</small></span><b>$8.00</b></label><label class="delivery-option"><input v-model="form.delivery" type="radio" value="express"><span><strong>Express delivery</strong><small>Next business day</small></span><b>$15.00</b></label><p v-if="error" class="error">{{ error }}</p><button class="btn continue">Continue to payment →</button><RouterLink to="/cart" class="back">← Return to bag</RouterLink></form>
      <aside class="order-summary"><h2 class="serif">In your bag</h2><div v-for="item in cart.items" :key="`${item.id}-${item.size}`" class="mini-item"><span>{{ item.quantity }} × {{ item.name }} <small>({{ item.size }})</small></span><strong>${{ (item.price * item.quantity).toFixed(2) }}</strong></div><div class="mini-line"><span>Delivery</span><span>{{ form.delivery === 'express' ? '$15.00' : (cart.subtotal >= 100 ? 'Free' : '$8.00') }}</span></div><div class="mini-line total"><strong>Total</strong><strong>${{ (cart.subtotal + (form.delivery === 'express' ? 15 : cart.subtotal >= 100 ? 0 : 8)).toFixed(2) }}</strong></div><p>Taxes included · Secure checkout</p></aside></div>
  </div>
</template>
<style scoped>
.checkout-page{padding:50px 0 80px}.checkout-head{text-align:center}.checkout-head h1{font-size:40px;font-weight:500;margin:8px 0 22px}.steps{display:flex;justify-content:center;gap:38px;border-bottom:1px solid #e9e8e2;padding-bottom:17px;color:#aaa;font-size:9px;letter-spacing:.08em}.steps .active{color:#5e6650}.checkout-grid{display:grid;grid-template-columns:1fr 330px;gap:70px;max-width:1040px;margin:42px auto 0}.checkout-form h2{font-size:15px;font-weight:600;margin:0 0 18px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.form-grid label{font-size:10px;color:#777;display:flex;flex-direction:column;gap:7px}.form-grid .wide{grid-column:span 2}.field{font-size:12px}.delivery-title{margin-top:34px!important}.delivery-option{display:flex;align-items:center;gap:12px;border:1px solid #e5e4de;padding:13px;margin:9px 0;font-size:11px}.delivery-option input{accent-color:#5e6650}.delivery-option span{display:flex;flex-direction:column;gap:4px;flex:1}.delivery-option small{font-size:10px;color:#777}.delivery-option b{font-weight:500}.continue{width:100%;margin-top:17px}.back{display:block;text-align:center;margin:15px;font-size:11px}.order-summary{background:#f7f5f0;padding:23px;height:max-content}.order-summary h2{font-size:24px;font-weight:500;margin:0 0 20px}.mini-item,.mini-line{display:flex;justify-content:space-between;gap:12px;font-size:10px;margin:14px 0}.mini-item strong,.mini-line strong{white-space:nowrap}.mini-item small,.order-summary>p{color:#777;font-size:9px}.mini-line{padding-top:13px;border-top:1px solid #e2e1da}.mini-line.total{font-size:14px}.order-summary>p{text-align:center}
@media(max-width:800px){.checkout-grid{grid-template-columns:1fr;gap:27px;margin-top:30px}.steps{gap:10px;font-size:8px}.checkout-page{padding-top:35px}}
</style>
