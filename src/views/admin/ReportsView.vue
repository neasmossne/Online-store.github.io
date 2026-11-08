<script setup>
import { computed } from 'vue'
import { ArrowDownToLine } from 'lucide-vue-next'
import StatCard from '../../components/admin/StatCard.vue'
import { getOrders } from '../../services/orderService'
import { getProducts } from '../../services/productService'
const orders = computed(() => getOrders())
const products = computed(() => getProducts())
const revenue = computed(() => orders.value.reduce((sum, order) => sum + Number(order.total), 0))
const topProducts = computed(() => {
  const units = new Map()
  for (const order of orders.value) for (const item of order.items) units.set(item.name, (units.get(item.name) || 0) + item.quantity)
  return [...units.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
})
function download() {
  const rows = [['Order', 'Date', 'Customer', 'Items', 'Total', 'Status'], ...orders.value.map((order) => [order.id, order.date, order.customer?.email || '', order.items.length, order.total, order.status])]
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const link = document.createElement('a'); link.href = url; link.download = 'maison-orders-report.csv'; link.click(); URL.revokeObjectURL(url)
}
</script>
<template><div><div class="page-title"><div><span class="eyebrow">The bigger picture</span><h1 class="serif">Reports</h1></div><button class="btn export" @click="download"><ArrowDownToLine :size="14" /> Export orders</button></div><div class="stats"><StatCard label="Revenue" :value="`$${revenue.toFixed(2)}`" note="All recorded sales" /><StatCard label="Orders" :value="orders.length" note="All time" /><StatCard label="Average order" :value="`$${orders.length ? (revenue / orders.length).toFixed(2) : '0.00'}`" note="Per order" /><StatCard label="Catalog size" :value="products.length" note="Active products" /></div><div class="report-grid"><section><span class="eyebrow">Most loved</span><h2 class="serif">Top products</h2><div v-if="topProducts.length" class="table-wrap"><table><thead><tr><th>Product</th><th>Units sold</th></tr></thead><tbody><tr v-for="row in topProducts" :key="row[0]"><td>{{ row[0] }}</td><td>{{ row[1] }}</td></tr></tbody></table></div><div v-else class="empty">Sales will appear here once orders are placed.</div></section><section><span class="eyebrow">At a glance</span><h2 class="serif">Store health</h2><div class="health"><div><span>Products in catalog</span><strong>{{ products.length }}</strong></div><div><span>Items awaiting fulfilment</span><strong>{{ orders.filter((order) => order.status === 'Processing').length }}</strong></div><div><span>Completed deliveries</span><strong>{{ orders.filter((order) => order.status === 'Delivered').length }}</strong></div></div></section></div></div></template>
<style scoped>
.page-title{display:flex;align-items:end;justify-content:space-between;margin-bottom:25px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.export{font-size:9px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.report-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px}.report-grid h2{font-size:24px;font-weight:500;margin:7px 0 15px}.health{background:white;border:1px solid #ebeae5;padding:5px 18px}.health div{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #eee;font-size:11px}.health div:last-child{border:0}.health span{color:#777}.empty{padding:25px;background:white;font-size:11px;color:#777}
@media(max-width:900px){.stats{grid-template-columns:1fr 1fr}.report-grid{grid-template-columns:1fr}}
</style>
