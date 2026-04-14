/*
 * MailerLite local fallback placeholder.
 *
 * The real script is synced at build time by scripts/sync-mailerlite.mjs.
 * Keeping this file in-repo ensures first-party script loading succeeds even
 * when third-party networks are blocked during development or CI.
 */
window.ml = window.ml || function (...args) {
  (window.ml.q = window.ml.q || []).push(args);
};
