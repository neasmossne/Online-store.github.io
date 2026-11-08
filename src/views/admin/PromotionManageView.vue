<script setup>
import { ref } from 'vue'
import { Plus, Trash2 } from 'lucide-vue-next'
const KEY = 'maison-promotions'
const promotions = ref(JSON.parse(localStorage.getItem(KEY) || '[]'))
const form = ref({ code: '', discount: '', type: 'Percentage' })
function add() {
  promotions.value = [...promotions.value, { ...form.value, code: form.value.code.toUpperCase(), active: true }]
  localStorage.setItem(KEY, JSON.stringify(promotions.value))
  form.value = { code: '', discount: '', type: 'Percentage' }
}
function remove(code) { promotions.value = promotions.value.filter((item) => item.code !== code); localStorage.setItem(KEY, JSON.stringify(promotions.value)) }
</script>
<template><div><div class="page-title"><div><span class="eyebrow">A little something extra</span><h1 class="serif">Promotions</h1></div></div><section class="promo-form"><span class="eyebrow">Create a promo code</span><form @submit.prevent="add"><label>Code<input v-model.trim="form.code" class="field" placeholder="e.g. WELCOME10" required></label><label>Discount<input v-model.number="form.discount" class="field" type="number" min="1" required></label><label>Type<select v-model="form.type" class="field"><option>Percentage</option><option>Fixed amount</option></select></label><button class="btn"><Plus :size="14" /> Add code</button></form></section><h2 class="list-title serif">Your codes</h2><div v-if="promotions.length" class="table-wrap"><table><thead><tr><th>Code</th><th>Discount</th><th>Status</th><th></th></tr></thead><tbody><tr v-for="item in promotions" :key="item.code"><td><strong>{{ item.code }}</strong></td><td>{{ item.discount }}{{ item.type === 'Percentage' ? '%' : '$' }} off</td><td><span class="pill">{{ item.active ? 'Active' : 'Paused' }}</span></td><td><button class="delete" aria-label="Delete promotion" @click="remove(item.code)"><Trash2 :size="15" /></button></td></tr></tbody></table></div><div v-else class="empty-admin">No promo codes yet. Create a little something for your customers.</div><section class="banner-note"><span class="eyebrow">Store banners</span><p>Homepage story banners are edited in the storefront source. A visual banner editor can be connected when a content API is configured.</p></section></div></template>
<style scoped>
.page-title{margin-bottom:25px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.promo-form{background:white;border:1px solid #ebeae5;padding:20px}.promo-form form{display:grid;grid-template-columns:1fr 1fr 1fr auto;align-items:end;gap:12px;margin-top:12px}.promo-form label{font-size:10px;color:#777}.promo-form .field{display:block;margin-top:6px;font-size:11px}.promo-form .btn{font-size:9px}.list-title{font-size:24px;font-weight:500;margin:30px 0 14px}.delete{border:0;background:none;color:#a34835}.empty-admin{background:white;padding:24px;color:#777;font-size:11px}.banner-note{margin-top:25px;background:#e9ebe5;padding:20px}.banner-note p{font-size:11px;color:#666;line-height:1.7;margin-bottom:0}
@media(max-width:700px){.promo-form form{grid-template-columns:1fr 1fr}.promo-form .btn{grid-column:span 2}}
</style>
