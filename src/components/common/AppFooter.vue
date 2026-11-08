<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand"><RouterLink to="/" class="wordmark">fashion<span>.</span></RouterLink><p>Thoughtful pieces for a life well lived. Made to be worn, loved, and lived in.</p><div class="socials">INSTAGRAM &nbsp; · &nbsp; PINTEREST</div></div>
      <div><h4>Explore</h4><RouterLink to="/shop">Shop all</RouterLink><RouterLink to="/shop?category=Clothing">Clothing</RouterLink><RouterLink to="/shop?category=Accessories">Accessories</RouterLink><RouterLink to="/support">Our story</RouterLink></div>
      <div><h4>We're here</h4><RouterLink to="/support">Help & FAQs</RouterLink><RouterLink to="/my-orders">Order tracking</RouterLink><RouterLink to="/support">Shipping & returns</RouterLink><RouterLink to="/account">My account</RouterLink></div>
      <div><h4>A note from us</h4><p>Get first looks, thoughtful reads, and 10% off your first order.</p><form class="subscribe" @submit.prevent="$event.target.reset()"><input type="email" placeholder="Your email address" required aria-label="Email address"><button aria-label="Subscribe">→</button></form></div>
    </div>
    <div class="container footer-bottom"><span>© 2025 fashion Studio. Made with care.</span><span>Privacy &nbsp; · &nbsp; Terms &nbsp; · &nbsp; Cambodia / USD $</span></div>
  </footer>
</template>

<style scoped>
.footer{background:#25251f;color:#f7f5f0;padding:60px 0 20px}
.footer-grid{display:grid;grid-template-columns:1.5fr .8fr .9fr 1.2fr;gap:56px;padding-bottom:58px}
.footer-grid>div{display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.footer-grid h4{font-size:11px;text-transform:uppercase;letter-spacing:.13em;margin:4px 0 8px}
.footer-grid a:not(.wordmark){font-size:12px;color:#b9b9ae}
.footer-grid p{font-size:12px;line-height:1.8;color:#b9b9ae;max-width:250px;margin:0}
.footer-brand .wordmark{font-size:29px}.footer-brand .wordmark span{color:#c1775c}
.socials{font-size:9px;letter-spacing:.1em;margin-top:8px;color:#b9b9ae}
.subscribe{display:flex;width:100%;border-bottom:1px solid #66675e;margin-top:5px}
.subscribe input{background:transparent;border:0;padding:12px 0;color:white;outline:none;width:100%;font-size:11px}
.subscribe button{background:transparent;color:white;border:0;font-size:20px}
.footer-bottom{border-top:1px solid #45463f;padding-top:18px;display:flex;justify-content:space-between;color:#999a91;font-size:10px}
@media(max-width:850px){.footer-grid{grid-template-columns:1fr 1fr;gap:38px}}
@media(max-width:520px){.footer{padding-top:42px}.footer-grid{grid-template-columns:1fr 1fr;gap:30px 20px}.footer-brand,.footer-grid>div:last-child{grid-column:span 2}.footer-bottom{gap:12px;flex-direction:column}}
</style>
