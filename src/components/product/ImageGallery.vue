<script setup>
import { computed, ref } from 'vue'
import { imageUrl } from '../../data/products'
const props = defineProps({ product: { type: Object, required: true } })
const selected = ref(0)
const photos = computed(() => [props.product.image, props.product.image, props.product.image])
</script>
<template>
  <div class="gallery"><div class="thumbs"><button v-for="(photo, index) in photos" :key="index" :class="{ active: selected === index }" @click="selected = index"><img :src="imageUrl(photo, 240)" :alt="`${product.name} view ${index + 1}`"></button></div><div class="main-image">
    <img :src="imageUrl(photos[selected], 1100)" :alt="product.name"></div>
  </div>
</template>
<style scoped>
.gallery{display:grid;grid-template-columns:70px 1fr;gap:14px}.thumbs{display:flex;flex-direction:column;gap:10px}.thumbs button{padding:0;border:1px solid transparent;background:#f4f2ed;height:90px;overflow:hidden}.thumbs button.active{border-color:#5e6650}.thumbs img,.main-image img{width:100%;height:100%;object-fit:cover}.main-image{height:620px;background:#f4f2ed;overflow:hidden}
@media(max-width:750px){.gallery{display:flex;flex-direction:column-reverse}.thumbs{flex-direction:row}.thumbs button{height:70px;width:58px}.main-image{height:min(110vw,560px)}}
</style>
