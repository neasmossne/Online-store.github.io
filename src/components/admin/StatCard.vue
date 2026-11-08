<script setup>
defineProps({ label: String, value: [String, Number], note: { type: String, default: '' } })
</script>
<template><article class="stat"><span>{{ label }}</span><strong>{{ value }}</strong><small>{{ note }}</small></article></template>
<style scoped>
.stat{background:white;border:1px solid #ebeae5;padding:20px}.stat span,.stat small{display:block;color:#77786e;font-size:11px}.stat strong{display:block;font:500 30px "Playfair Display",serif;margin:13px 0 7px}.stat small{font-size:10px}
</style>
