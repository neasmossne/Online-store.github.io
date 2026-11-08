<script setup>
import { computed, ref } from 'vue'
import { Plus, Search, Trash2 } from 'lucide-vue-next'
import Modal from '../../components/common/Modal.vue'
import { getProducts, saveProducts } from '../../services/productService'
const products = ref(getProducts())
const search = ref('')
const modalOpen = ref(false)
const editing = ref('')
const form = ref(blank())
const filtered = computed(() => products.value.filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase())))
function blank() { return { name: '', category: 'Clothing', price: 0, color: '', stock: 0, image: 'photo-1598554747436-c9293d6a588f', sizes: ['S', 'M', 'L'], description: '' } }
function open(product) { editing.value = product?.id || ''; form.value = product ? { ...product, sizes: [...product.sizes] } : blank(); modalOpen.value = true }
function save() {
  const product = { ...form.value, id: editing.value || `p-${Date.now()}`, price: Number(form.value.price), stock: Number(form.value.stock) }
  products.value = editing.value ? products.value.map((item) => item.id === editing.value ? product : item) : [...products.value, product]
  saveProducts(products.value); modalOpen.value = false
}
function remove(product) { if (window.confirm(`Remove "${product.name}" from the catalog?`)) { products.value = products.value.filter((item) => item.id !== product.id); saveProducts(products.value) } }
</script>
<template>
  <div class="manage"><div class="page-title"><div><span class="eyebrow">Your collection</span><h1 class="serif">Products</h1></div><button class="btn" @click="open()"><Plus :size="15" /> Add product</button></div><div class="toolbar"><label><Search :size="15" /><input v-model="search" placeholder="Search products"></label><span>{{ filtered.length }} products</span></div><div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr v-for="product in filtered" :key="product.id"><td><button class="product-name" @click="open(product)">{{ product.name }}</button></td><td>{{ product.category }}</td><td>${{ Number(product.price).toFixed(2) }}</td><td>{{ product.stock }}</td><td><span class="pill" :class="{ low: product.stock < 5 }">{{ product.stock ? 'Active' : 'Out of stock' }}</span></td><td><button class="action" @click="open(product)">Edit</button><button class="action delete" @click="remove(product)"><Trash2 :size="13" /></button></td></tr></tbody></table></div>
    <Modal v-model="modalOpen" :title="editing ? 'Edit product' : 'Add a product'"><form class="product-form" @submit.prevent="save"><label>Product name<input v-model.trim="form.name" class="field" required></label><div class="two"><label>Category<select v-model="form.category" class="field"><option>Clothing</option><option>Accessories</option><option>Home</option></select></label><label>Color<input v-model.trim="form.color" class="field" required></label></div><div class="two"><label>Price (USD)<input v-model.number="form.price" class="field" type="number" min="0" step=".01" required></label><label>Stock<input v-model.number="form.stock" class="field" type="number" min="0" required></label></div><label>Image ID<input v-model.trim="form.image" class="field" required></label><label>Description<textarea v-model.trim="form.description" class="field" rows="3"></textarea></label><button class="btn">Save product</button></form></Modal>
  </div>
</template>
<style scoped>
.page-title{display:flex;justify-content:space-between;align-items:end;margin-bottom:23px}.page-title h1{font-size:36px;font-weight:500;margin:7px 0}.page-title .btn{font-size:9px}.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.toolbar label{display:flex;align-items:center;gap:9px;background:white;border:1px solid #e8e7e1;padding:10px;width:min(330px,70%)}.toolbar input{border:0;outline:0;font-size:11px;width:100%}.toolbar>span{font-size:10px;color:#777}.product-name{background:none;border:0;padding:0;text-align:left;font-size:12px}.action{border:0;background:none;text-decoration:underline;font-size:10px;margin-right:10px}.delete{color:#a34835;display:inline-flex}.pill.low{background:#f5eae5;color:#a34835}.product-form label{display:block;font-size:10px;color:#777;margin:13px 0}.product-form .field{margin-top:6px;font-size:11px}.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.product-form .btn{width:100%;margin-top:10px}
</style>
