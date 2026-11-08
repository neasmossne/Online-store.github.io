<script setup>
import { computed } from 'vue'
import ProductCard from '../../components/product/ProductCard.vue'
import { getProducts } from '../../services/productService'
import { useWishlistStore } from '../../stores/wishlist'
const wishlist = useWishlistStore()
const products = computed(() => getProducts().filter((product) => wishlist.ids.includes(product.id)))
</script>
<template><div class="container wishlist-page"><header class="page-heading"><span class="eyebrow">Kept close</span><h1 class="serif">Your saved pieces</h1></header><div v-if="products.length" class="product-grid"><ProductCard v-for="product in products" :key="product.id" :product="product" /></div><div v-else class="empty-state"><h2>A little list of things you love.</h2><p class="muted">Tap the heart on any piece to save it here.</p><RouterLink to="/shop" class="btn">Explore the collection</RouterLink></div></div></template>
<style scoped>.wishlist-page{padding-bottom:80px}.page-heading h1{font-size:40px;font-weight:500;margin:8px 0}.product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}@media(max-width:700px){.product-grid{grid-template-columns:repeat(2,1fr);gap:26px 12px}}</style>
