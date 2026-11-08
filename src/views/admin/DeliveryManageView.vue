<script setup>
import { ref } from 'vue'
const KEY = 'maison-delivery'
const defaults = [{ area: 'Phnom Penh', standard: 8, express: 15 }, { area: 'Outside Phnom Penh', standard: 12, express: 20 }]
const areas = ref(JSON.parse(localStorage.getItem(KEY) || 'null') || defaults)
const newArea = ref('')
const standard = ref(8)
const express = ref(15)
function persist() { localStorage.setItem(KEY, JSON.stringify(areas.value)) }
function add() {
  if (!newArea.value.trim()) return
  areas.value = [...areas.value, { area: newArea.value.trim(), standard: Number(standard.value), express: Number(express.value) }]
  newArea.value = ''; persist()
}
function remove(index) { areas.value.splice(index, 1); areas.value = [...areas.value]; persist() }
</script>
<template><div><div class="page-title"><div><span class="eyebrow">Getting it to their door</span><h1 class="serif">Delivery</h1></div></div><section class="delivery-panel"><span class="eyebrow">Shipping areas & fees</span><p>Set the standard and express delivery fees for each area.</p><div class="table-wrap"><table><thead><tr><th>Delivery area</th><th>Standard</th><th>Express</th><th></th></tr></thead><tbody><tr v-for="(item, index) in areas" :key="item.area"><td>{{ item.area }}</td><td>${{ Number(item.standard).toFixed(2) }}</td><td>${{ Number(item.express).toFixed(2) }}</td><td><button class="remove" @click="remove(index)">Remove</button></td></tr></tbody></table></div><form class="add-area" @submit.prevent="add"><label>Area<input v-model="newArea" class="field" placeholder="New delivery area" required></label><label>Standard fee<input v-model.number="standard" class="field" type="number" min="0" step=".5"></label><label>Express fee<input v-model.number="express" class="field" type="number" min="0" step=".5"></label><button class="btn">Add area</button></form></section><div class="delivery-tip"><strong>Complimentary delivery</strong><span>Customers receive free standard delivery on orders over $100.</span></div></div></template>
<style scoped>
.page-title{margin-bottom:25px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.delivery-panel{background:white;border:1px solid #ebeae5;padding:20px}.delivery-panel>p{font-size:11px;color:#777}.remove{border:0;background:none;text-decoration:underline;font-size:10px;color:#a34835}.add-area{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:12px;align-items:end;margin-top:22px}.add-area label{font-size:10px;color:#777}.add-area .field{display:block;margin-top:6px;font-size:11px}.add-area .btn{font-size:9px}.delivery-tip{margin-top:20px;background:#e9ebe5;padding:18px;display:flex;flex-direction:column;gap:6px}.delivery-tip strong{font-size:11px}.delivery-tip span{font-size:10px;color:#777}
@media(max-width:700px){.add-area{grid-template-columns:1fr 1fr}.add-area .btn{grid-column:span 2}}
</style>
