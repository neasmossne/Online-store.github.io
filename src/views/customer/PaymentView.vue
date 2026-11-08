<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { createOrder } from '../../services/orderService'
const router = useRouter()
const cart = useCartStore()
const method = ref('cod')
const card = ref('')
const error = ref('')
const customer = JSON.parse(sessionStorage.getItem('maison-checkout') || '{}')
const total = computed(() => cart.subtotal + (customer.delivery === 'express' ? 15 : cart.subtotal >= 100 ? 0 : 8))
function placeOrder() {
  if (!cart.items.length) { router.push('/shop'); return }
  if (method.value === 'card' && card.value.replace(/\s/g, '').length < 12) { error.value = 'Please enter a valid card number.'; return }
  const order = createOrder({ items: [...cart.items], customer, total: total.value, payment: method.value === 'cod' ? 'Cash on delivery' : method.value === 'aba' ? 'ABA / KHQR' : 'Card' })
  cart.clear()
  sessionStorage.removeItem('maison-checkout')
  router.push(`/order-confirmation/${order.id}`)
}
</script>
<template>
  <div class="container payment-page"><div class="payment-head"><span class="eyebrow">Step 02 / 03</span><h1 class="serif">Payment</h1><p>A few final details and it's yours.</p></div><div class="payment-grid"><section><div class="methods"><button :class="{ selected: method === 'cod' }" @click="method = 'cod'"><span class="radio"></span><span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span><b>COD</b></button><button :class="{ selected: method === 'aba' }" @click="method = 'aba'"><span class="radio"></span><span><strong>ABA / KHQR</strong><small>Scan to pay with your banking app</small></span><b class="aba">ABA</b></button><button :class="{ selected: method === 'card' }" @click="method = 'card'"><span class="radio"></span><span><strong>Credit or debit card</strong><small>Visa, Mastercard and more</small></span><b>▰</b></button></div><div v-if="method === 'card'" class="card-input"><label>Card number<input v-model="card" class="field" inputmode="numeric" placeholder="0000 0000 0000 0000"></label></div><div v-if="method === 'aba'" class="khqr"><div class="qr">▦</div><span>KHQR payment is confirmed when your order is placed in this demo.</span></div><p v-if="error" class="error">{{ error }}</p><button class="btn place-order" @click="placeOrder">Place order · ${{ total.toFixed(2) }}</button><RouterLink to="/checkout" class="back">← Back to delivery details</RouterLink><p class="secure">🔒 Your information is protected and secure.</p></section><aside><span class="eyebrow">Your total</span><strong class="serif">${{ total.toFixed(2) }}</strong><span>{{ cart.count }} items · {{ customer.delivery === 'express' ? 'Express delivery' : 'Standard delivery' }}</span></aside></div></div>
</template>
<style scoped>
.payment-page{padding:50px 0 90px}.payment-head{text-align:center}.payment-head h1{font-size:42px;font-weight:500;margin:8px}.payment-head p{font-size:12px;color:#777;margin:0}.payment-grid{display:grid;grid-template-columns:1fr 280px;gap:70px;max-width:870px;margin:42px auto}.methods{border:1px solid #e5e4de}.methods button{display:flex;align-items:center;text-align:left;gap:13px;padding:17px;width:100%;background:#fff;border:0;border-bottom:1px solid #e9e8e2}.methods button:last-child{border-bottom:0}.methods button.selected{background:#f8f7f3}.radio{height:15px;width:15px;border:1px solid #bcbdb3;border-radius:50%;position:relative}.selected .radio:after{content:"";position:absolute;inset:3px;border-radius:50%;background:#5e6650}.methods button span:nth-child(2){display:flex;flex-direction:column;gap:5px;flex:1}.methods strong{font-size:12px;font-weight:600}.methods small{font-size:10px;color:#777}.methods b{font-size:11px}.methods .aba{color:#1767a9}.card-input{margin-top:20px}.card-input label{font-size:10px;color:#777}.card-input input{margin-top:7px}.khqr{display:flex;align-items:center;gap:15px;background:#f7f5f0;padding:15px;margin-top:15px;font-size:10px;color:#666}.qr{width:65px;height:65px;background:white;display:grid;place-items:center;font-size:48px}.place-order{width:100%;margin-top:22px}.back{display:block;text-align:center;font-size:11px;margin:15px}.secure{text-align:center;color:#777;font-size:9px}.payment-grid aside{background:#f7f5f0;padding:24px;height:max-content;display:flex;flex-direction:column;gap:12px}.payment-grid aside strong{font-size:34px;font-weight:500}.payment-grid aside span:last-child{font-size:10px;color:#777}.error{color:#a34835;font-size:11px}
@media(max-width:700px){.payment-page{padding-top:34px}.payment-grid{grid-template-columns:1fr;gap:25px;margin-top:28px}.payment-grid aside{order:-1}}
</style>
