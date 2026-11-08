<script setup>
import { Heart, Plus } from 'lucide-vue-next'
import { imageUrl } from '../../data/products'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'
const props = defineProps({ product: { type: Object, required: true } })
const cart = useCartStore()
const wishlist = useWishlistStore()
</script>
<template>
  <article class="product-card">
    <div class="product-image">
      <RouterLink :to="`/product/${product.id}`"><img :src="imageUrl(product.image)" :alt="product.name" loading="lazy"></RouterLink>
      <span v-if="product.badge" class="badge">{{ product.badge }}</span>
      <button class="heart" :class="{ active: wishlist.has(product.id) }" :aria-label="wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'" @click="wishlist.toggle(product.id)"><Heart :size="17" :fill="wishlist.has(product.id) ? 'currentColor' : 'none'" /></button>
      <button class="quick-add" @click="cart.add(product)"><Plus :size="15" /> Quick add</button>
    </div>
    <RouterLink class="product-info" :to="`/product/${product.id}`"><div><h3>{{ product.name }}</h3><span>{{ product.color }}</span></div><div class="price">${{ product.price }}<del v-if="product.compareAt">${{ product.compareAt }}</del></div></RouterLink>
  </article>
</template>
<style scoped>
.product-image{height:360px;position:relative;overflow:hidden;background:#f3f1ec}.product-image img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.product-card:hover .product-image img{transform:scale(1.035)}
.badge{position:absolute;top:13px;left:13px;background:#fff;padding:6px 9px;text-transform:uppercase;font-size:9px;letter-spacing:.09em}
.heart{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;border-radius:50%;background:#ffffffdf;display:grid;place-items:center}.heart.active{color:#c1775c}
.quick-add{position:absolute;bottom:0;left:0;right:0;height:44px;background:#fff;border:0;display:flex;justify-content:center;align-items:center;gap:8px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;transform:translateY(100%);transition:.25s}
.product-card:hover .quick-add{transform:translateY(0)}.product-info{display:flex;justify-content:space-between;gap:10px;padding-top:14px}.product-info h3{font-size:12px;font-weight:500;margin:0 0 6px}.product-info span{font-size:11px;color:#85867d}.price{white-space:nowrap;font-size:12px}.price del{display:block;color:#a1a198;font-size:10px;text-align:right}
@media(max-width:700px){.product-image{height:clamp(200px,58vw,330px)}.quick-add{transform:none;height:37px;font-size:9px}}
</style>
