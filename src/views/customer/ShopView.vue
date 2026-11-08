<script setup>
import { computed, ref, watch } from 'vue'
import { Search, SlidersHorizontal } from 'lucide-vue-next'
import ProductCard from '../../components/product/ProductCard.vue'
import FilterSidebar from '../../components/product/FilterSidebar.vue'
import { getCategories, getProducts } from '../../services/productService'
import { useRoute } from 'vue-router'
const route = useRoute()
const products = ref(getProducts())
const query = ref('')
const sort = ref('featured')
const mobileFiltersOpen = ref(false)
const filters = ref({ category: route.query.category || '' })
const categories = getCategories()
watch(() => route.query.category, (category) => { filters.value = { ...filters.value, category: category || '' } })
const filtered = computed(() => {
  const found = products.value.filter((product) =>
    (!filters.value.category || product.category === filters.value.category) &&
    (!filters.value.color || product.color === filters.value.color) &&
    (!filters.value.size || product.sizes.includes(filters.value.size)) &&
    (!filters.value.maxPrice || product.price <= filters.value.maxPrice) &&
    (!query.value || product.name.toLowerCase().includes(query.value.toLowerCase())),
  )
  if (sort.value === 'low') return found.sort((a, b) => a.price - b.price)
  if (sort.value === 'high') return found.sort((a, b) => b.price - a.price)
  if (sort.value === 'name') return found.sort((a, b) => a.name.localeCompare(b.name))
  return found
})
</script>
<template>
  <div class="container">
    <header class="page-heading"><span class="eyebrow">The Maison collection</span><h1 class="serif">The things you'll reach for.</h1><p>Thoughtful pieces, made for wherever the day takes you.</p></header>
    <div class="toolbar"><label class="search"><Search :size="16" /><input v-model="query" placeholder="Search the collection" aria-label="Search products"></label><span class="result-count">{{ filtered.length }} pieces</span><label class="sort">Sort by <select v-model="sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></label></div>
    <div class="shop-layout"><FilterSidebar v-model="filters" :categories="categories" :class="{ 'mobile-open': mobileFiltersOpen }" /><button class="mobile-filter" @click="mobileFiltersOpen = !mobileFiltersOpen"><SlidersHorizontal :size="15" /> {{ mobileFiltersOpen ? 'Hide filters' : 'Filters' }}</button><div v-if="filtered.length" class="product-grid"><ProductCard v-for="product in filtered" :key="product.id" :product="product" /></div><div v-else class="empty-state shop-empty"><h2>Nothing here just yet.</h2><p class="muted">Try adjusting your filters to find your next favourite.</p><button class="btn btn-outline" @click="filters = {}; query = ''">Clear filters</button></div></div>
  </div>
</template>
<style scoped>
.page-heading h1{font-size:44px;font-weight:500;margin:10px 0}.page-heading p{font-size:13px;color:#77786e;margin:0}.toolbar{display:flex;align-items:center;gap:22px;border-bottom:1px solid #e9e8e2;padding:14px 0;margin-bottom:25px}.search{display:flex;gap:10px;align-items:center;flex:1;max-width:360px}.search input{border:0;outline:none;width:100%;font-size:12px}.result-count{font-size:11px;color:#77786e}.sort{font-size:11px;color:#77786e;display:flex;align-items:center;gap:8px}.sort select{border:0;background:white;font-size:11px;color:#25251f;outline:0}.shop-layout{display:grid;grid-template-columns:190px 1fr;gap:30px;padding-bottom:80px}.product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:35px 16px}.shop-empty{grid-column:2}.mobile-filter{display:none}
@media(max-width:750px){.page-heading h1{font-size:34px}.toolbar{gap:9px;flex-wrap:wrap}.search{max-width:none;flex-basis:100%;padding-bottom:10px}.result-count{margin-right:auto}.shop-layout{display:block}.filters{display:none}.filters.mobile-open{display:block;padding:0 0 18px}.mobile-filter{display:flex;align-items:center;gap:7px;font-size:11px;padding:0 0 18px;border:0;background:transparent}.product-grid{grid-template-columns:repeat(2,1fr);gap:27px 12px}.shop-empty{padding:40px 10px}.shop-empty h2{font-size:24px}}
</style>
