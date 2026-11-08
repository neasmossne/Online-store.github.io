<script setup>
import { Boxes, ChartNoAxesCombined, CirclePercent, ClipboardList, LayoutDashboard, LogOut, MapPinned, Users } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()
const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/promotions', label: 'Promotions', icon: CirclePercent },
  { to: '/admin/delivery', label: 'Delivery', icon: MapPinned },
  { to: '/admin/reports', label: 'Reports', icon: ChartNoAxesCombined },
]
</script>
<template>
  <aside class="sidebar"><RouterLink to="/" class="brand">Fashion-store<span>.</span><small>STUDIO ADMIN</small></RouterLink><nav><RouterLink v-for="link in links" :key="link.to" :to="link.to" :exact="link.exact"><component :is="link.icon" :size="17" />{{ link.label }}</RouterLink></nav><button class="logout" @click="auth.signOut(); $router.push('/admin/login')"><LogOut :size="17" /> Sign out</button></aside>
</template>
<style scoped>
.sidebar{width:238px;min-height:100vh;background:#25251f;color:#f8f7f2;padding:27px 15px;display:flex;flex-direction:column;flex-shrink:0}.brand{font:600 27px "Playfair Display",serif;padding:0 14px 35px}.brand span{color:#c1775c}.brand small{display:block;font:600 9px "DM Sans",sans-serif;letter-spacing:.16em;color:#a7a89c;margin-top:7px}
nav{display:flex;flex-direction:column;gap:5px}nav a,.logout{display:flex;align-items:center;gap:12px;padding:12px 14px;color:#bcbdb3;font-size:12px;border:0;background:transparent;text-align:left}nav a.router-link-exact-active,nav a.router-link-active{background:#3a3b33;color:#fff}.logout{margin-top:auto;cursor:pointer}
@media(max-width:780px){.sidebar{width:68px;padding:20px 8px}.brand{font-size:0;padding:0 9px 26px}.brand small{font-size:7px}.brand:first-letter{font-size:23px}nav a,.logout{font-size:0;justify-content:center;padding:13px 0}.logout{font-size:0}.logout :deep(svg){flex:none}}
</style>
