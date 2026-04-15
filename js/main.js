/* ============================================================
   CASSY IS WARY — main.js
   ============================================================ */

// ── Nav scroll behavior ──
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ──
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Scroll-in animations ──
const animateEls = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
animateEls.forEach(el => observer.observe(el));

// ── Hero bg parallax ──
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  heroBg.classList.add('loaded'); // triggers scale animation
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.3;
    heroBg.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}

// ── Product filters ──
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
      card.style.opacity = show ? '' : '0';
    });
  });
});

// ── Add to cart (CartSnip placeholder) ──
// CARTSNIP INTEGRATION:
// Replace this stub with CartSnip's addToCart API when integrating.
// CartSnip docs: https://cartsnip.com/docs
const cartCount = { value: 0 };
const cartBadge = document.querySelector('.cart-count');

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card?.querySelector('.product-name')?.textContent;
    const price = card?.querySelector('.product-price')?.textContent;

    // TODO: Replace with CartSnip addItem() call:
    // CartSnip.addItem({ id: btn.dataset.productId, name, price, qty: 1 });

    cartCount.value++;
    if (cartBadge) {
      cartBadge.textContent = cartCount.value;
      cartBadge.style.display = 'flex';
    }

    // Visual feedback
    btn.textContent = '✓ Added';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--bark-abyss)';
    setTimeout(() => {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Add to Cart`;
      btn.style.background = '';
      btn.style.color = '';
    }, 1800);
  });
});

// ── Newsletter form ──
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('.newsletter-input');
  const btn = newsletterForm.querySelector('button[type="submit"]');
  if (!input?.value) return;
  btn.textContent = 'You\'re in the woods now...';
  btn.disabled = true;
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Join the Forest';
    btn.disabled = false;
  }, 3000);
});

// ── CartSnip Init Placeholder ──
// When CartSnip is ready, initialize it here:
// document.addEventListener('DOMContentLoaded', () => {
//   CartSnip.init({
//     shopId: 'YOUR_CARTSNIP_SHOP_ID',
//     theme: 'custom',
//     primaryColor: '#C9A84C',
//     container: '#cartsnip-floating-cart',
//   });
// });
