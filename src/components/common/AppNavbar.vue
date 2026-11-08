<script setup>
import { ref } from 'vue'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'
const cart = useCartStore()
const wishlist = useWishlistStore()
const menuOpen = ref(false)
</script>

<template>
  <header class="nav-shell">
    <div class="container nav-row">
      <button class="icon-button mobile-menu" aria-label="Toggle menu" @click="menuOpen = !menuOpen"><Menu v-if="!menuOpen" :size="20" /><X v-else :size="20" /></button>
      <RouterLink to="/" class="wordmark">Fashion-Store<span>.</span></RouterLink>
      <nav class="desktop-links">
        <RouterLink to="/shop">Shop all</RouterLink>
        <RouterLink to="/shop?category=Clothing">Clothing</RouterLink>
        <RouterLink to="/shop?category=Accessories">Accessories</RouterLink>
        <RouterLink to="/support">Our story</RouterLink>
      </nav>
      <div class="nav-actions">
        <RouterLink to="/shop" class="icon-button" aria-label="Search"><Search :size="19" /></RouterLink>
        <RouterLink to="/account" class="icon-button account-link" aria-label="Account"><UserRound :size="19" /></RouterLink>
        <RouterLink to="/wishlist" class="icon-button wishlist-link" aria-label="Wishlist"><Heart :size="19" /><span v-if="wishlist.count" class="nav-count">{{ wishlist.count }}</span></RouterLink>
        <RouterLink to="/cart" class="icon-button" aria-label="Shopping bag"><ShoppingBag :size="19" /><span v-if="cart.count" class="nav-count">{{ cart.count }}</span></RouterLink>
      </div>
    </div>
    <nav v-if="menuOpen" class="mobile-links">
      <RouterLink @click="menuOpen = false" to="/shop">Shop all</RouterLink><RouterLink @click="menuOpen = false" to="/shop?category=Clothing">Clothing</RouterLink>
      <RouterLink @click="menuOpen = false" to="/shop?category=Accessories">Accessories</RouterLink><RouterLink @click="menuOpen = false" to="/support">Our story</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.announcement{height:31px;background:#5e6650;color:#fff;text-align:center;padding:8px 12px;font-size:10px;letter-spacing:.07em}
.nav-shell{background:#fff;border-bottom:1px solid #eeede8;position:relative;z-index:5}
.nav-row{height:78px;display:flex;align-items:center;justify-content:space-between}
.wordmark{font:600 30px "Playfair Display",serif;letter-spacing:-1.5px}.wordmark span{color:#c1775c}
.desktop-links{display:flex;gap:34px;margin-left:66px}.desktop-links a,.mobile-links a{font-size:12px;color:#53544e}
.desktop-links a:hover,.router-link-active{color:#5e6650}
.nav-actions{display:flex;align-items:center;gap:3px}.nav-actions .icon-button{position:relative}
.nav-count{position:absolute;top:3px;right:2px;display:grid;place-items:center;min-width:15px;height:15px;border-radius:20px;background:#c1775c;color:white;font-size:9px}
.mobile-menu,.mobile-links{display:none}
@media(max-width:750px){.nav-row{height:66px}.mobile-menu{display:grid}.desktop-links{display:none}.mobile-links{display:flex;flex-direction:column;gap:0;padding:0 22px 14px}.mobile-links a{padding:13px 0;border-top:1px solid #eeede8}.account-link{display:none}}
</style>
