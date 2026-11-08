# Maison storefront

Responsive Vue 3 storefront and admin dashboard, built with Vite, Vue Router, Pinia, and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Demo behavior

This workspace contains the frontend only; there is no backend configured. Products, cart, wishlist, orders, demo account, and admin changes are stored in the browser's local storage. Checkout records a local demo order and does not charge a payment method.

Admin demo: `admin@maison.com` / `admin123` at `/admin/login`.

Set `VITE_API_URL` to point the Axios client at an API when a backend is available. Product images are loaded from Unsplash.
