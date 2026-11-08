import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import CustomerLayout from '../layouts/CustomerLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import HomeView from '../views/customer/HomeView.vue'
import ShopView from '../views/customer/ShopView.vue'
import ProductDetailView from '../views/customer/ProductDetailView.vue'
import CartView from '../views/customer/CartView.vue'
import CheckoutView from '../views/customer/CheckoutView.vue'
import PaymentView from '../views/customer/PaymentView.vue'
import OrderConfirmationView from '../views/customer/OrderConfirmationView.vue'
import MyOrdersView from '../views/customer/MyOrdersView.vue'
import OrderTrackingView from '../views/customer/OrderTrackingView.vue'
import AccountView from '../views/customer/AccountView.vue'
import SupportView from '../views/customer/SupportView.vue'
import WishlistView from '../views/customer/WishlistView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import DashboardView from '../views/admin/DashboardView.vue'
import ProductManageView from '../views/admin/ProductManageView.vue'
import OrderManageView from '../views/admin/OrderManageView.vue'
import CustomerManageView from '../views/admin/CustomerManageView.vue'
import PromotionManageView from '../views/admin/PromotionManageView.vue'
import DeliveryManageView from '../views/admin/DeliveryManageView.vue'
import ReportsView from '../views/admin/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: CustomerLayout, children: [
      { path: '', component: HomeView },
      { path: 'shop', component: ShopView },
      { path: 'product/:id', component: ProductDetailView },
      { path: 'cart', component: CartView },
      { path: 'checkout', component: CheckoutView },
      { path: 'payment', component: PaymentView },
      { path: 'order-confirmation/:id', component: OrderConfirmationView },
      { path: 'my-orders', component: MyOrdersView },
      { path: 'track/:id', component: OrderTrackingView },
      { path: 'account', component: AccountView },
      { path: 'support', component: SupportView },
      { path: 'wishlist', component: WishlistView },
    ] },
    { path: '/admin/login', component: AdminLoginView },
    { path: '/admin', component: AdminLayout, meta: { admin: true }, children: [
      { path: '', component: DashboardView },
      { path: 'products', component: ProductManageView },
      { path: 'orders', component: OrderManageView },
      { path: 'customers', component: CustomerManageView },
      { path: 'promotions', component: PromotionManageView },
      { path: 'delivery', component: DeliveryManageView },
      { path: 'reports', component: ReportsView },
    ] },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  if (to.matched.some((record) => record.meta.admin) && !useAuthStore().isAdmin) return '/admin/login'
})

export default router
