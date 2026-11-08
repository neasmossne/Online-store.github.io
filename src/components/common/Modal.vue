<script setup>
defineProps({ modelValue: Boolean, title: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>
<template>
  <Teleport to="body"><div v-if="modelValue" class="overlay" @click.self="$emit('update:modelValue', false)" @keydown.esc="$emit('update:modelValue', false)">
    <section class="modal" role="dialog" aria-modal="true" :aria-label="title"><button class="close" aria-label="Close" @click="$emit('update:modelValue', false)">×</button><h2 v-if="title" class="serif">{{ title }}</h2><slot /></section>
  </div></Teleport>
</template>
<style scoped>
.overlay{position:fixed;inset:0;background:#17171199;z-index:20;display:grid;place-items:center;padding:18px}.modal{position:relative;background:white;width:min(520px,100%);padding:36px;max-height:90vh;overflow:auto}.modal h2{font-size:27px;margin:0 0 24px}.close{position:absolute;right:16px;top:12px;border:0;background:none;font-size:25px}
</style>
