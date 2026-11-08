<script setup>
import { computed } from 'vue'
import { PackageSearch } from 'lucide-vue-next'
import { getOrders } from '../../services/orderService'
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
const orders = computed(() => {
  const all = getOrders()
  return auth.user?.email ? all.filter((order) => order.customer?.email === auth.user.email) : all
})
</script>
<template>
  <div class="container orders-page"><header class="page-heading"><span class="eyebrow">Your Maison account</span><h1 class="serif">Order history</h1></header><div v-if="orders.length" class="table-wrap"><table><thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody><tr v-for="order in orders" :key="order.id"><td>{{ order.id }}</td><td>{{ new Date(order.date).toLocaleDateString() }}</td><td>{{ order.items.length }} pieces</td><td>${{ order.total.toFixed(2) }}</td><td><span class="pill">{{ order.status }}</span></td><td><RouterLink :to="`/track/${order.id}`" class="track">Track →</RouterLink></td></tr></tbody></table></div><div v-else class="empty-state"><PackageSearch :size="30" /><h2>Your story with us starts here.</h2><p class="muted">When you place an order, you'll find its details here.</p><RouterLink to="/shop" class="btn">Find your first favourite</RouterLink></div></div>
</template>
<style scoped>
.orders-page{padding-bottom:80px}.page-heading h1{font-size:40px;font-weight:500;margin:8px 0}.track{font-size:11px;text-decoration:underline}
</style>
