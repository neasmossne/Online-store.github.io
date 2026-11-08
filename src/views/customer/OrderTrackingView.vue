<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getOrders } from '../../services/orderService'
const route = useRoute()
const order = computed(() => getOrders().find((item) => item.id === route.params.id))
const stages = ['Placed', 'Processing', 'Shipped', 'Delivered']
const activeStage = computed(() => stages.indexOf(order.value?.status || 'Processing'))
</script>
<template>
  <div class="container tracking"><div v-if="order"><span class="eyebrow">Order {{ order.id }}</span><h1 class="serif">On its way to you.</h1><p class="muted">Thanks for letting us be part of your everyday.</p><div class="timeline"><div v-for="(stage, index) in stages" :key="stage" class="stage" :class="{ complete: index <= activeStage }"><span class="dot">{{ index < activeStage ? '✓' : String(index + 1).padStart(2, '0') }}</span><div><strong>{{ stage }}</strong><small>{{ index === 0 ? new Date(order.date).toLocaleDateString() : index === activeStage ? 'Your order is here' : 'Coming up next' }}</small></div></div></div><div class="track-info"><div><span class="eyebrow">Delivering to</span><p>{{ order.customer?.name }}<br>{{ order.customer?.address }}, {{ order.customer?.city }}</p></div><div><span class="eyebrow">Payment</span><p>{{ order.payment }}<br>${{ order.total.toFixed(2) }}</p></div></div></div><div v-else class="empty-state"><h2>We couldn't find that order.</h2><RouterLink to="/my-orders" class="btn">View my orders</RouterLink></div></div>
</template>
<style scoped>
.tracking{max-width:760px;padding:60px 20px 90px}.tracking h1{font-size:42px;font-weight:500;margin:10px 0}.tracking>div>p{font-size:12px}.timeline{display:flex;justify-content:space-between;margin:55px 0 45px;position:relative}.timeline:before{content:"";position:absolute;top:15px;left:8%;right:8%;height:1px;background:#ddd}.stage{z-index:1;display:flex;flex-direction:column;align-items:center;gap:12px;background:white;text-align:center;width:25%}.dot{width:31px;height:31px;border:1px solid #d5d5cd;border-radius:50%;display:grid;place-items:center;background:white;font-size:10px;color:#999}.stage.complete .dot{background:#5e6650;color:white;border-color:#5e6650}.stage strong{font-size:11px}.stage small{display:block;color:#777;font-size:9px;margin-top:5px}.track-info{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #e8e7e1;padding-top:20px}.track-info p{font-size:11px;line-height:1.9}
</style>
