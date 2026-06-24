// Mobile touch fix for product cards
// Ensures links work properly on touch devices
(function () {
  'use strict';

  // Fix for iOS double-tap and touch events
  document.addEventListener('DOMContentLoaded', function () {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Use touchstart for faster response on mobile
    productsGrid.addEventListener(
      'touchstart',
      function (e) {
        const card = e.target.closest('.product-card');
        if (!card) return;

        // Don't interfere with buttons inside card
        if (e.target.closest('.fav-btn') || e.target.closest('.buy-btn')) {
          return;
        }

        // Find the link inside the card
        const link = card.querySelector('a[href^="https://aliexpress.ru"]');
        if (link && link.href) {
          e.preventDefault();
          e.stopPropagation();
          // Open in new tab on mobile
          window.open(link.href, '_blank');
        }
      },
      { passive: false }
    );

    // Also handle click for non-touch devices
    productsGrid.addEventListener('click', function (e) {
      const card = e.target.closest('.product-card');
      if (!card) return;

      // Don't interfere with buttons
      if (e.target.closest('.fav-btn') || e.target.closest('.buy-btn')) {
        return;
      }

      // If clicking on a link, let it work normally
      if (e.target.closest('a')) {
        return;
      }

      // Otherwise find and click the main link
      const link = card.querySelector('a[href^="https://aliexpress.ru"]');
      if (link && link.href) {
        e.preventDefault();
        window.open(link.href, '_blank');
      }
    });
  });

  // Prevent zoom on double-tap for iOS
  let lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    function (e) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );
})();
