/* A Baker's Confession: explicit opt-in for optional browser services. */
(() => {
  'use strict';
  const KEY = 'abc_cookie_consent';
  const VERSION = 1;
  const LIFETIME = 180 * 24 * 60 * 60 * 1000;
  const categories = ['analytics', 'marketing', 'forms', 'media'];
  const empty = () => ({ analytics: false, marketing: false, forms: false, media: false });
  let saved = null;
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (value && value.version === VERSION && Number.isFinite(value.expires) && value.expires > Date.now() &&
        categories.every(key => typeof value[key] === 'boolean')) saved = value;
  } catch (_) { /* An unavailable store must never enable optional services. */ }
  let choice = saved || empty();
  const loaded = new Set();
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', personalization_storage: 'denied',
    functionality_storage: 'denied', security_storage: 'granted'
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);

  function script(name, src, attributes = {}) {
    if (loaded.has(name)) return;
    loaded.add(name);
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = src;
    tag.dataset.abcService = name;
    Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  function apply() {
    window.gtag('consent', 'update', {
      analytics_storage: choice.analytics ? 'granted' : 'denied',
      ad_storage: choice.marketing ? 'granted' : 'denied',
      ad_user_data: choice.marketing ? 'granted' : 'denied',
      ad_personalization: choice.marketing ? 'granted' : 'denied',
      functionality_storage: choice.forms ? 'granted' : 'denied',
      personalization_storage: 'denied'
    });
    // The existing GTM container is opaque: withhold the entire container unless
    // BOTH purposes are accepted. Never assume its custom tags respect Consent Mode.
    if (choice.analytics && choice.marketing) {
      if (!loaded.has('gtm')) window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      script('gtm', 'https://www.googletagmanager.com/gtm.js?id=GTM-W8K8ZRWF');
    }
    if (choice.analytics) {
      script('cloudflare-analytics', 'https://static.cloudflareinsights.com/beacon.min.js', {
        'data-cf-beacon': JSON.stringify({ token: '443e033d770e4131a4788a7939231473', spa: true })
      });
    }
    if (choice.marketing && document.querySelector('.ml-embedded')) {
      if (!window.ml) {
        window.ml = function () { (window.ml.q = window.ml.q || []).push(arguments); };
        window.ml('account', '1063999');
      }
      script('mailerlite', 'https://assets.mailerlite.com/js/universal.js');
    }
    document.querySelectorAll('iframe[data-consent-src]').forEach(frame => {
      const allowed = choice[frame.dataset.consentCategory] === true;
      const placeholder = frame.previousElementSibling;
      if (allowed && !frame.hasAttribute('src')) frame.src = frame.dataset.consentSrc;
      frame.hidden = !allowed;
      if (placeholder && placeholder.classList.contains('abc-embed-notice')) placeholder.hidden = allowed;
    });
    document.querySelectorAll('[data-abc-marketing-notice]').forEach(el => { el.hidden = choice.marketing; });
    updateStatus();
  }
  function clearOptionalCookies() {
    const names = document.cookie.split(';').map(part => part.trim().split('=')[0]);
    const domains = ['', location.hostname, '.' + location.hostname, '.abakersconfession.co.uk'];
    const paths = new Set(['/']);
    const parts = location.pathname.split('/');
    while (parts.length > 1) { parts.pop(); paths.add(parts.join('/') + '/'); }
    names.filter(name => /^(?:_ga|_gid|_gat|_gcl_|_fbp|_fbc|_hj|ml_|mailerlite)/i.test(name)).forEach(name => {
      domains.forEach(domain => paths.forEach(path => {
        document.cookie = encodeURIComponent(name) + '=; Max-Age=0; path=' + path +
          (domain ? '; domain=' + domain : '') + '; SameSite=Lax; Secure';
      }));
    });
  }
  let banner, dialog, settingsButton, returnFocus;
  function save(next) {
    const withdrawal = categories.some(key => choice[key] && !next[key]);
    choice = { ...empty(), ...next, version: VERSION, updated: new Date().toISOString(), expires: Date.now() + LIFETIME };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (_) { /* Applies for this page only. */ }
    saved = choice;
    if (!choice.analytics || !choice.marketing) clearOptionalCookies();
    banner.hidden = true;
    if (dialog.open) dialog.close();
    if (withdrawal) { location.reload(); return; }
    apply();
    settingsButton.focus({ preventScroll: true });
  }
  function updateStatus() {
    document.querySelectorAll('[data-abc-consent-status]').forEach(el => {
      el.textContent = saved ? 'Your choices: ' + categories.map(key => key + ' ' + (choice[key] ? 'on' : 'off')).join(', ') + '.' :
        'You have not chosen yet. Optional services are off.';
    });
  }
  function open() {
    returnFocus = document.activeElement;
    categories.forEach(key => { dialog.querySelector('[name="' + key + '"]').checked = !!choice[key]; });
    dialog.showModal();
    dialog.querySelector('[data-abc-close]').focus();
  }
  function init() {
    const shell = document.createElement('div');
    shell.id = 'abc-consent';
    shell.innerHTML = `
      <section class="abc-cookie-banner" aria-label="Cookie choices" hidden>
        <div class="abc-cookie-brand">A BAKER’S CONFESSION</div>
        <h2>Your privacy, your choice</h2>
        <p>We use essential storage to remember your choice. Optional analytics, marketing, enquiry forms and videos only load when you allow them. You can still browse and contact us by email or phone if you reject optional services.</p>
        <p><a href="/cookie-declaration">Cookie declaration</a> · <a href="/privacy-policy">Privacy policy</a></p>
        <div class="abc-cookie-actions">
          <button type="button" data-abc-reject>Reject optional</button>
          <button type="button" data-abc-open>Customise</button>
          <button type="button" data-abc-accept>Accept all</button>
        </div>
      </section>
      <button type="button" class="abc-cookie-settings" data-abc-open aria-haspopup="dialog">Cookie settings</button>
      <dialog class="abc-cookie-dialog" aria-labelledby="abc-cookie-title" aria-describedby="abc-cookie-intro">
        <div class="abc-cookie-dialog-head"><span class="abc-cookie-brand">YOUR COOKIE CHOICES</span><button type="button" data-abc-close aria-label="Close cookie settings">×</button></div>
        <h2 id="abc-cookie-title">Choose what you allow</h2>
        <p id="abc-cookie-intro">Optional services are off until you opt in. Your choice is remembered for up to six months. You can change it at any time using Cookie settings.</p>
        <form method="dialog" id="abc-cookie-form">
          <div class="abc-cookie-category"><div><strong>Necessary</strong><p>Remembers your consent choice and supports site security. Always active.</p></div><span class="abc-cookie-always">Always on</span></div>
          <label class="abc-cookie-category"><span><strong>Analytics</strong><span class="abc-cookie-description">Optional Cloudflare browser analytics. Google Tag Manager only loads if both Analytics and Marketing are allowed.</span></span><input type="checkbox" name="analytics"></label>
          <label class="abc-cookie-category"><span><strong>Marketing</strong><span class="abc-cookie-description">MailerLite brochure/newsletter form and, together with Analytics consent, Google Tag Manager. This does not subscribe you to emails.</span></span><input type="checkbox" name="marketing"></label>
          <label class="abc-cookie-category"><span><strong>Enquiry forms</strong><span class="abc-cookie-description">Allows embedded Tally forms to load. Loading a form connects to Tally; details are sent when you submit the form.</span></span><input type="checkbox" name="forms"></label>
          <label class="abc-cookie-category"><span><strong>External videos</strong><span class="abc-cookie-description">Allows YouTube video players to load and connect to Google/YouTube.</span></span><input type="checkbox" name="media"></label>
          <p><a href="/cookie-declaration">Read the cookie declaration and provider details</a></p>
          <div class="abc-cookie-actions"><button type="button" data-abc-reject>Reject optional</button><button type="submit">Save choices</button><button type="button" data-abc-accept>Accept all</button></div>
        </form>
      </dialog>`;
    document.body.appendChild(shell);
    banner = shell.querySelector('.abc-cookie-banner');
    dialog = shell.querySelector('dialog');
    settingsButton = shell.querySelector('.abc-cookie-settings');
    banner.hidden = !!saved;
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-abc-open], [data-abc-accept], [data-abc-reject], [data-abc-close], [data-abc-allow]');
      if (!button) return;
      event.preventDefault();
      if (button.hasAttribute('data-abc-open')) open();
      else if (button.hasAttribute('data-abc-accept')) save(Object.fromEntries(categories.map(key => [key, true])));
      else if (button.hasAttribute('data-abc-reject')) save(empty());
      else if (button.hasAttribute('data-abc-close')) dialog.close();
      else if (categories.includes(button.dataset.abcAllow)) save({ ...choice, [button.dataset.abcAllow]: true });
    });
    dialog.addEventListener('close', () => {
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    });
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      save(Object.fromEntries(categories.map(key => [key, dialog.querySelector('[name="' + key + '"]').checked])));
    });
    window.ABCCookieConsent = { open, get: () => ({ ...choice }) };
    window.addEventListener('storage', event => {
      if (event.key === KEY) location.reload();
    });
    if (!choice.analytics || !choice.marketing) clearOptionalCookies();
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
