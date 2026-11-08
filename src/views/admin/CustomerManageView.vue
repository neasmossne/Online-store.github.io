<script setup>
import { computed, ref } from 'vue'
import { getOrders } from '../../services/orderService'
const blockedEmails = ref(JSON.parse(localStorage.getItem('maison-blocked') || '[]'))
const customers = computed(() => {
  const byEmail = new Map()
  for (const order of getOrders()) {
    const email = order.customer?.email
    if (!email) continue
    const customer = byEmail.get(email) || { ...order.customer, orders: 0, spent: 0, lastOrder: order.date }
    customer.orders += 1
    customer.spent += order.total
    byEmail.set(email, customer)
  }
  return [...byEmail.values()]
})
function toggle(email) {
  blockedEmails.value = blockedEmails.value.includes(email) ? blockedEmails.value.filter((item) => item !== email) : [...blockedEmails.value, email]
  localStorage.setItem('maison-blocked', JSON.stringify(blockedEmails.value))
}
</script>
<template><div><div class="page-title"><div><span class="eyebrow">The people who make us</span><h1 class="serif">Customers</h1></div><span class="count">{{ customers.length }} customers</span></div><div v-if="customers.length" class="table-wrap"><table><thead><tr><th>Customer</th><th>Orders</th><th>Total spent</th><th>Last order</th><th>Account</th><th></th></tr></thead><tbody><tr v-for="customer in customers" :key="customer.email"><td>{{ customer.name }}<small>{{ customer.email }}</small></td><td>{{ customer.orders }}</td><td>${{ customer.spent.toFixed(2) }}</td><td>{{ new Date(customer.lastOrder).toLocaleDateString() }}</td><td><span class="pill" :class="{ blocked: blockedEmails.includes(customer.email) }">{{ blockedEmails.includes(customer.email) ? 'Blocked' : 'Active' }}</span></td><td><button class="action" @click="toggle(customer.email)">{{ blockedEmails.includes(customer.email) ? 'Unblock' : 'Block' }}</button></td></tr></tbody></table></div><div v-else class="empty-admin"><h2 class="serif">Your community is growing.</h2><p>Customer details will appear here after the first order.</p></div></div></template>
<style scoped>
.page-title{display:flex;justify-content:space-between;align-items:end;margin-bottom:25px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.count{font-size:10px;color:#777}td small{display:block;color:#888;font-size:9px;margin-top:4px}.pill.blocked{background:#f5eae5;color:#a34835}.action{background:none;border:0;text-decoration:underline;font-size:10px}.empty-admin{text-align:center;background:white;padding:55px 15px;border:1px solid #ebeae5}.empty-admin h2{font-weight:500;font-size:24px}.empty-admin p{font-size:11px;color:#777}
</style>
