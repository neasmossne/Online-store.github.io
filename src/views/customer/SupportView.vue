<script setup>
import { ref } from 'vue'
const sent = ref(false)
const faqs = [
  ['How long does delivery take?', 'Standard delivery usually takes 2–4 business days. Express delivery is available at checkout.'],
  ['What is your return policy?', 'If something is not quite right, you can return unworn pieces within 30 days of delivery.'],
  ['How do I find my size?', 'Each product has a size guide. If you are between sizes, our team is happy to help you choose.'],
  ['How can I track my order?', 'Use the tracking link in your confirmation, or visit My Orders to see the latest update.'],
]
</script>
<template>
  <div class="support"><header class="support-hero"><span class="eyebrow">Here when you need us</span><h1 class="serif">A little help,<br><i>with a lot of care.</i></h1><p>Questions, curiosities, or just a hello — we're all ears.</p></header><div class="container support-grid"><section><span class="eyebrow">The helpful bits</span><h2 class="serif">Frequently asked</h2><details v-for="faq in faqs" :key="faq[0]"><summary>{{ faq[0] }}</summary><p>{{ faq[1] }}</p></details><div class="size-guide"><span class="eyebrow">A quick size guide</span><p>Our pieces are designed with a relaxed, true-to-size fit. When in doubt, size up for an easy feel or reach out and we’ll help.</p></div></section><section class="contact"><span class="eyebrow">A note to our team</span><h2 class="serif">Let's talk.</h2><p>We usually get back within one business day.</p><form @submit.prevent="sent = true"><label>Your name<input class="field" required></label><label>Email address<input class="field" type="email" required></label><label>What can we help with?<select class="field"><option>Order question</option><option>Returns & exchanges</option><option>Product question</option><option>Something else</option></select></label><label>Your message<textarea class="field" rows="4" required></textarea></label><button class="btn">{{ sent ? 'Message received — thank you' : 'Send your note' }}</button></form><a class="email" href="mailto:hello@maison.example">hello@maison.example</a></section></div></div>
</template>
<style scoped>
.support-hero{background:#f3f1eb;text-align:center;padding:65px 20px}.support-hero h1{font-size:46px;font-weight:500;margin:14px}.support-hero p{font-size:12px;color:#777}.support-grid{display:grid;grid-template-columns:1fr .8fr;gap:100px;padding-top:65px;padding-bottom:80px}.support-grid h2{font-size:30px;font-weight:500;margin:10px 0 25px}.support-grid details{border-bottom:1px solid #e7e6df;padding:16px 0}.support-grid details summary{font-size:12px;font-weight:600;cursor:pointer}.support-grid details p,.size-guide p{font-size:11px;line-height:1.8;color:#777}.size-guide{margin-top:36px;padding:22px;background:#f7f5f0}.size-guide p{margin-bottom:0}.contact>p{font-size:11px;color:#777}.contact form label{display:block;font-size:10px;color:#777;margin:14px 0}.contact form .field{display:block;margin-top:7px;font-size:11px}.contact form textarea{resize:vertical}.contact form .btn{width:100%;margin-top:8px;font-size:10px}.email{display:block;text-align:center;margin-top:16px;font-size:10px;text-decoration:underline}
@media(max-width:750px){.support-hero{padding:45px 18px}.support-hero h1{font-size:38px}.support-grid{grid-template-columns:1fr;gap:40px;padding-top:40px}}
</style>
