/**
 * KDE Plasma Ricing Guide - Showcase Filter (Home Page)
 * Handles filtering of showcase items on the home page
 */

(function() {
  'use strict';

  function initShowcaseFilter() {
    const filterBtns = document.querySelectorAll('.showcase-filter .filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item[data-tags]');

    if (filterBtns.length === 0 || showcaseItems.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        showcaseItems.forEach(item => {
          const tags = item.dataset.tags.split(',');
          const show = filter === 'all' || tags.includes(filter);

          if (show) {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.3s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize
  if (document.readyState !== 'loading') {
    initShowcaseFilter();
  } else {
    document.addEventListener('DOMContentLoaded', initShowcaseFilter);
  }
})();