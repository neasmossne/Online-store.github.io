<script setup>
import AdminSidebar from '../components/admin/AdminSidebar.vue'
</script>
<template><div class="admin-layout"><AdminSidebar /><main class="admin-main"><header class="admin-top"><span class="eyebrow"> fashion Studio / Admin</span><RouterLink to="/" target="_blank">View storefront ↗</RouterLink></header><RouterView /></main></div></template>
<style scoped>
.admin-layout{display:flex;min-height:100vh;background:#f7f7f4}.admin-main{flex:1;min-width:0;padding:0 36px 50px}.admin-top{height:76px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e6e5df;margin-bottom:32px}.admin-top a{font-size:11px;text-decoration:underline}
@media(max-width:780px){.admin-main{padding:0 18px 35px}.admin-top{margin-bottom:24px}}
</style>
