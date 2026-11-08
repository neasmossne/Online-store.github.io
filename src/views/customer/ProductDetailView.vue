<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import ImageGallery from '../../components/product/ImageGallery.vue'
import ProductCard from '../../components/product/ProductCard.vue'
import { getProduct, getProducts } from '../../services/productService'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'
const route = useRoute()
const router = useRouter()
const product = computed(() => getProduct(route.params.id))
const cart = useCartStore()
const wishlist = useWishlistStore()
const size = ref('')
const quantity = ref(1)
const added = ref(false)
const related = getProducts().filter((item) => item.category === product.value?.category && item.id !== route.params.id).slice(0, 3)
function addToCart() {
  if (product.value.sizes.length > 1 && !size.value) return
  cart.add(product.value, size.value || product.value.sizes[0], quantity.value)
  added.value = true
  window.setTimeout(() => { added.value = false }, 1800)
}
</script>
<template>
  <div v-if="product" class="container detail">
    <RouterLink to="/shop" class="back"><ArrowLeft :size="14" /> Back to the collection</RouterLink>
    <div class="detail-grid"><ImageGallery :product="product" /><section class="product-copy"><span class="eyebrow">{{ product.category }} / {{ product.color }}</span><h1 class="serif">{{ product.name }}</h1><div class="price">${{ product.price }} <del v-if="product.compareAt">${{ product.compareAt }}</del></div><p class="description">{{ product.description }}</p><p class="stock">{{ product.stock > 0 ? 'In stock — ready to ship' : 'Currently out of stock' }}</p>
      <div v-if="product.sizes.length > 1" class="size-select"><div class="label-row"><span>Choose your size</span><RouterLink to="/support">Size guide</RouterLink></div><div class="sizes"><button v-for="option in product.sizes" :key="option" :class="{ active: size === option }" @click="size = option">{{ option }}</button></div><small v-if="!size" class="size-hint">Please select a size</small></div>
      <div class="purchase-row"><div class="quantity"><button aria-label="Decrease quantity" @click="quantity = Math.max(1, quantity - 1)"><Minus :size="14" /></button><span>{{ quantity }}</span><button aria-label="Increase quantity" @click="quantity++"><Plus :size="14" /></button></div><button class="btn add" :disabled="product.stock <= 0" @click="addToCart"><ShoppingBag :size="16" />{{ added ? 'Added to bag' : 'Add to bag — $' + product.price * quantity }}</button><button class="save" :class="{ saved: wishlist.has(product.id) }" aria-label="Save to wishlist" @click="wishlist.toggle(product.id)"><Heart :size="18" :fill="wishlist.has(product.id) ? 'currentColor' : 'none'" /></button></div>
      <div class="details-list"><details open><summary>A little more about it</summary><p>{{ product.description }} Designed with care and made to be part of your everyday rotation.</p></details><details><summary>Shipping & returns</summary><p>Complimentary shipping over $100. Easy returns within 30 days of delivery.</p></details><details><summary>Materials & care</summary><p>Thoughtfully sourced materials. Follow the care label to keep your piece lovely for longer.</p></details></div>
    </section></div>
    <section v-if="related.length" class="related"><span class="eyebrow">Keep exploring</span><h2 class="serif">You might also like</h2><div class="related-grid"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div></section>
  </div>
  <div v-else class="container empty-state missing"><h2>We couldn't find that piece.</h2><button class="btn" @click="router.push('/shop')">Shop the collection</button></div>
</template>
<style scoped>
.detail{padding-top:24px;padding-bottom:75px}.back{font-size:11px;color:#77786e;display:flex;align-items:center;gap:8px;margin-bottom:22px}.detail-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:62px}.product-copy{padding-top:32px}.product-copy h1{font-size:44px;line-height:1.1;font-weight:500;margin:13px 0}.price{font-size:16px;margin:0 0 25px}.price del{color:#999;font-size:12px;margin-left:8px}.description{font-size:13px;line-height:1.9;color:#707168;max-width:420px}.stock{font-size:11px;color:#5e6650;margin:23px 0}.size-select{margin:28px 0}.label-row{display:flex;justify-content:space-between;font-size:11px}.label-row a{text-decoration:underline;color:#777}.sizes{display:flex;gap:8px;margin-top:12px}.sizes button{width:43px;height:42px;border:1px solid #deded8;background:#fff;font-size:11px}.sizes button.active{border-color:#25251f;background:#25251f;color:white}.size-hint{display:block;color:#a35b45;margin-top:9px;font-size:10px}.purchase-row{display:flex;gap:10px}.quantity{display:flex;align-items:center;justify-content:space-around;border:1px solid #deded8;width:112px}.quantity button{border:0;background:white;display:grid;place-items:center}.quantity span{font-size:12px}.add{flex:1;font-size:10px;padding:12px 10px}.add:disabled{opacity:.5;cursor:not-allowed}.save{border:1px solid #deded8;background:white;width:48px;display:grid;place-items:center}.save.saved{color:#c1775c}.details-list{margin-top:30px;border-top:1px solid #e7e6df}.details-list details{border-bottom:1px solid #e7e6df;padding:15px 0}.details-list summary{font-size:11px;font-weight:600;cursor:pointer}.details-list p{font-size:11px;color:#777;line-height:1.8}.related{margin-top:80px}.related h2{font-weight:500;font-size:32px;margin:8px 0 25px}.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:17px}.missing{margin-top:30px}
@media(max-width:800px){.detail-grid{grid-template-columns:1fr;gap:24px}.product-copy{padding-top:4px}.product-copy h1{font-size:36px}.related-grid{grid-template-columns:repeat(2,1fr)}}
</style>
