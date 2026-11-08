<script setup>
import { ref } from 'vue'
import { getOrders, updateOrder } from '../../services/orderService'
const orders = ref(getOrders())
const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']
function change(order, status) { updateOrder(order.id, { status }); orders.value = getOrders() }
</script>
<template><div><div class="page-title"><div><span class="eyebrow">Fulfilment</span><h1 class="serif">Orders</h1></div><span class="count">{{ orders.length }} total</span></div><div v-if="orders.length" class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody><tr v-for="order in orders" :key="order.id"><td>{{ order.id }}</td><td>{{ order.customer?.name }}<small>{{ order.customer?.email }}</small></td><td>{{ order.items.length }} pieces</td><td>{{ order.payment }}</td><td>${{ order.total.toFixed(2) }}</td><td><select class="status" :value="order.status" @change="change(order, $event.target.value)"><option v-for="status in statuses" :key="status">{{ status }}</option></select></td><td>{{ new Date(order.date).toLocaleDateString() }}</td></tr></tbody></table></div><div v-else class="empty-admin"><h2 class="serif">The first order is just around the corner.</h2><p>Orders placed by your customers will show up here.</p></div></div></template>
<style scoped>
.page-title{display:flex;justify-content:space-between;align-items:end;margin-bottom:25px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.count{font-size:10px;color:#777}.table-wrap small{display:block;color:#888;font-size:9px;margin-top:4px}.status{border:1px solid #e0dfd9;padding:7px;background:white;font-size:10px}.empty-admin{text-align:center;background:white;border:1px solid #ebeae5;padding:55px 15px}.empty-admin h2{font-weight:500;font-size:24px}.empty-admin p{font-size:11px;color:#777}
</style>
