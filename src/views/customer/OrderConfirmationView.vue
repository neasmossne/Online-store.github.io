<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getOrders } from '../../services/orderService'
import { imageUrl } from '../../data/products'
const route = useRoute()
const order = computed(() => getOrders().find((item) => item.id === route.params.id))
</script>
<template>
  <div class="container confirmation"><div class="check">✓</div><span class="eyebrow">Thank you for choosing fashion</span><h1 class="serif">It's on its way<br><i>to becoming yours.</i></h1><p class="intro">We've received your order and will send a confirmation to {{ order?.customer?.email || 'your email' }}.</p><div v-if="order" class="invoice"><div class="invoice-top"><span>ORDER {{ order.id }}</span><span>{{ new Date(order.date).toLocaleDateString() }}</span></div><div v-for="item in order.items" :key="`${item.id}-${item.size}`" class="invoice-item"><img :src="imageUrl(item.image, 160)" :alt="item.name"><span>{{ item.name }} · {{ item.size }}<small>Qty {{ item.quantity }}</small></span><b>${{ (item.price * item.quantity).toFixed(2) }}</b></div><div class="invoice-total"><span>Total paid / due</span><strong>${{ order.total.toFixed(2) }}</strong></div><p class="payment-note">Payment: {{ order.payment }} · Delivery to {{ order.customer?.address }}, {{ order.customer?.city }}</p></div><div class="confirmation-actions"><RouterLink to="/shop" class="btn">Continue exploring</RouterLink><RouterLink v-if="order" :to="`/track/${order.id}`" class="btn btn-outline">Track your order</RouterLink></div></div>
</template>
<style scoped>
.confirmation{max-width:700px;text-align:center;padding:65px 20px 85px}.check{margin:0 auto 20px;width:44px;height:44px;border-radius:50%;background:#e8ebe2;color:#5e6650;display:grid;place-items:center;font-size:19px}.confirmation h1{font-size:48px;font-weight:500;line-height:1.13;margin:13px 0}.confirmation h1 i{font-weight:500}.intro{font-size:12px;color:#777;line-height:1.7}.invoice{border:1px solid #e8e7e1;text-align:left;margin:35px 0}.invoice-top{padding:15px;display:flex;justify-content:space-between;background:#f7f5f0;font-size:9px;letter-spacing:.1em}.invoice-item{display:flex;align-items:center;gap:13px;padding:13px 16px;border-bottom:1px solid #eee;font-size:11px}.invoice-item img{width:48px;height:58px;object-fit:cover}.invoice-item span{flex:1}.invoice-item small{display:block;color:#777;margin-top:5px}.invoice-item b{font-weight:500}.invoice-total{display:flex;justify-content:space-between;padding:18px;font-size:13px}.payment-note{font-size:10px;color:#777;border-top:1px solid #eee;padding:13px 18px;margin:0}.confirmation-actions{display:flex;justify-content:center;gap:10px}.confirmation-actions .btn{font-size:9px}
@media(max-width:550px){.confirmation{padding-top:45px}.confirmation h1{font-size:38px}.confirmation-actions{flex-direction:column}.invoice-top{font-size:8px}}
</style>
