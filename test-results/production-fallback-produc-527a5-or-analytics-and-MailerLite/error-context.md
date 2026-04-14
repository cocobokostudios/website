# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-fallback.spec.ts >> production HTML ships third-party fallback behaviour for analytics and MailerLite
- Location: tests\production-fallback.spec.ts:3:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "const MAILERLITE_SCRIPT_URL = 'https://assets.mailerlite.com/js/universal.js';"
Received string:    "
  <site-navigation><nav class=\"w-full z-50 bg-slate-900/90 backdrop-blur-sm\">
  <div class=\"max-w-6xl mx-auto px-4\">
    <div class=\"flex justify-between items-center h-16\">
      <div class=\"flex items-center\">
        <img src=\"/images/logo.webp\" alt=\"Cocoboko Studios logo\" class=\"w-8 h-8 rounded-full\">
        <span class=\"ml-2 text-xl text-white font-semibold\">Cocoboko Studios</span>
      </div>
      <div class=\"hidden md:flex space-x-8\">
        <a href=\"/\" class=\"text-gray-300 hover:text-white transition-colors\">Home</a>
        <a href=\"/#get-notified\" class=\"text-gray-300 hover:text-white transition-colors\">Get Notified</a>
        <a href=\"/#about\" class=\"text-gray-300 hover:text-white transition-colors\">About</a>
        <a href=\"/#games\" class=\"text-gray-300 hover:text-white transition-colors\">Games</a>
      </div>
      <button aria-expanded=\"false\" aria-controls=\"mobile-menu\" data-menu-toggle class=\"md:hidden text-gray-300 hover:text-white\">
        <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" class=\"h-6 w-6\">
          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h16M4 18h16\"></path>
        </svg>
      </button>
    </div>
  </div>·
  <div id=\"mobile-menu\" class=\"hidden md:hidden\">
    <div class=\"px-2 pt-2 pb-3 space-y-1\">
      <a href=\"/\" class=\"block px-3 py-2 text-gray-300 hover:text-white transition-colors\">Home</a>
      <a href=\"/#get-notified\" class=\"block px-3 py-2 text-gray-300 hover:text-white transition-colors\">Get Notified</a>
      <a href=\"/#about\" class=\"block px-3 py-2 text-gray-300 hover:text-white transition-colors\">About</a>
      <a href=\"/#games\" class=\"block px-3 py-2 text-gray-300 hover:text-white transition-colors\">Games</a>
    </div>
  </div>
</nav>·
<script>
  (() => {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');·
    if (!menuButton || !mobileMenu) {
      return;
    }·
    menuButton.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', (!isHidden).toString());
    });
  })();
</script>
</site-navigation>
  <section class=\"relative min-h-[calc(100vh-64px)] bg-slate-800 text-white flex items-center justify-center py-16\">
  <div class=\"absolute inset-0 z-0 bg-[url('/images/background.svg')] bg-cover bg-center opacity-20\"></div>
  <div class=\"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20\">
    <div class=\"text-center max-w-3xl mx-auto\">
      <h1 class=\"text-4xl sm:text-5xl md:text-6xl font-bold mb-6\">Dream. Discover. Defy.</h1>
      <p class=\"text-lg sm:text-xl text-gray-300 mb-12 px-4\">
        Cocoboko Studios is an independent game studio focused on exploration, storytelling, and simulation. Currently in development.
      </p>
    </div>
  </div>
</section>·
  <section id=\"get-notified\" class=\"bg-slate-800 min-h-[60vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center py-16\">
    <div class=\"max-w-7xl w-full flex justify-center\">
      <site-get-notified><div class=\"w-full max-w-xl flex justify-center\">
  <div data-mailerlite-root class=\"w-full space-y-4\">
    <div data-form=\"b5oxmp\" data-mailerlite-embed class=\"ml-embedded w-full\"></div>·
    <div data-mailerlite-fallback aria-live=\"polite\" hidden class=\"rounded-lg border border-slate-600 bg-slate-900/70 p-6 text-slate-100\">
      <h3 class=\"text-lg font-semibold\">Get notified about releases</h3>
      <p class=\"mt-2 text-sm text-slate-300\">
        Newsletter is coming soon! Come back soon for updates, or follow us on
        <a href=\"https://bsky.app/profile/cocobokostudios.bsky.social\" target=\"_blank\" rel=\"noreferrer\" class=\"underline underline-offset-2 transition hover:text-white\">
          BlueSky
        </a>
        or
        <a href=\"https://www.youtube.com/@cocobokostudios\" target=\"_blank\" rel=\"noreferrer\" class=\"underline underline-offset-2 transition hover:text-white\">
          YouTube
        </a>
      </p>
    </div>
  </div>
</div>·
<script>
  (() => {
    const root = document.querySelector('[data-mailerlite-root]');
    if (!root) return;·
    const embed = root.querySelector('[data-mailerlite-embed]');
    const fallback = root.querySelector('[data-mailerlite-fallback]');·
    if (!embed || !fallback) return;·
    const showFallback = () => {
      fallback.hidden = false;
    };·
    const hideFallback = () => {
      fallback.hidden = true;
    };·
    const observeEmbedState = () => {
      const observer = new MutationObserver(() => {
        if (embed.childElementCount > 0) {
          hideFallback();
          observer.disconnect();
        }
      });·
      observer.observe(embed, { childList: true, subtree: true });·
      setTimeout(() => {
        if (embed.childElementCount === 0) {
          showFallback();
        }
      }, 3000);
    };·
    window.addEventListener('mailerlite:ready', observeEmbedState, { once: true });
    window.addEventListener('mailerlite:unavailable', showFallback, { once: true });
  })();
</script>
</site-get-notified>
    </div>
  </section>
  <section class=\"bg-gray-900 py-20\">
  <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
    <h2 id=\"about\" class=\"text-4xl font-bold text-white text-center mb-16\">About</h2>·
    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-12 items-center\">
      <div class=\"bg-slate-800 aspect-[3/2] rounded-lg overflow-hidden\">
        <img src=\"/images/dw_controller-coffee-desk.jpg\" alt=\"Cocoboko Studios Team\" class=\"w-full h-full object-cover brightness-110 contrast-105 sepia-[0.05]\">
      </div>·
      <div class=\"space-y-8\">
        <h3 class=\"text-2xl font-bold text-purple-500 mb-4\">The Goal</h3>
        <p class=\"text-gray-300 leading-relaxed\">
          Cocoboko Studios is a passion-driven attempt to chase dreams and spark that same drive in others.
        </p>·
        <p class=\"text-gray-300 leading-relaxed\">
          Started in 2024 after nearly twenty years of quiet persistence-a creative space carved out to make commercial games that blend exploration, storytelling, simulation, and economics. Built outside ideal conditions, the studio exists not to chase trends, but to make space for the kinds of games that deserve more light.
        </p>
      </div>
    </div>
  </div>
</section>·
  <section id=\"games\" class=\"py-16 bg-slate-800 text-white\">
  <div class=\"container mx-auto px-4\">
    <h2 class=\"text-4xl font-bold mb-8 text-center\">Games</h2>
    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto\">
      [object Object]
    </div>
  </div>
</section>·
  <footer class=\"bg-slate-900 text-white py-12\">
  <div class=\"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8\">
    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-10 md:place-items-center text-center\">
      <div class=\"space-y-4\">
        <h3 class=\"text-purple-500 font-semibold text-lg\">Cocoboko Studios</h3>
        <p class=\"text-gray-400 text-sm max-w-xl mx-auto\">
          Dedicated to proving that anyone can chase their passions, spark creativity, and never forget what insprires us.
        </p>
      </div>·
      <div>
        <h4 class=\"text-white font-semibold mb-4\">Quick Links</h4>
        <ul class=\"space-y-2 flex flex-col items-center\">
          <li><a href=\"/privacy-policy\" class=\"text-gray-400 hover:text-purple-400\">Privacy Policy</a></li>
          <li><a href=\"/code-of-conduct\" class=\"text-gray-400 hover:text-purple-400\">Code of Conduct</a></li>
        </ul>
      </div>
    </div>·
    <div class=\"border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm\">
      <p>© <span>2026</span> Cocoboko Studios. All Rights Reserved.</p>
    </div>
  </div>
</footer>··
"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('production HTML ships third-party fallback behaviour for analytics and MailerLite', async ({ request }) => {
  4  |   const response = await request.get('/');
  5  |   expect(response.ok()).toBeTruthy();
  6  | 
  7  |   const html = await response.text();
  8  | 
> 9  |   expect(html).toContain("const MAILERLITE_SCRIPT_URL = 'https://assets.mailerlite.com/js/universal.js';");
     |                ^ Error: expect(received).toContain(expected) // indexOf
  10 |   expect(html).toContain('mailerlite:unavailable');
  11 |   expect(html).toContain('data-mailerlite-fallback');
  12 |   expect(html).toContain('Newsletter is coming soon!');
  13 |   expect(html).toContain('https://bsky.app/profile/cocobokostudios.bsky.social');
  14 |   expect(html).toContain('https://www.youtube.com/@cocobokostudios');
  15 |   expect(html).toContain('target="_blank"');
  16 | 
  17 |   expect(html).toContain("const ANALYTICS_URL = 'https://scripts.simpleanalyticscdn.com/latest.js';");
  18 |   expect(html).toContain("await fetch(ANALYTICS_URL, { mode: 'no-cors'");
  19 | });
  20 | 
```