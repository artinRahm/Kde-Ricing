/**
 * KDE Plasma Ricing Guide - Theme Toggle
 * Handles light/dark theme switching with persistence
 */

(function() {
  'use strict';

  const THEME_KEY = 'kderice-theme';
  const THEME_ATTR = 'data-theme';

  // ========================================
  // Theme Management
  // ========================================
  function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const isDark = theme === 'dark';
      metaThemeColor.setAttribute('content', isDark ? '#1a1b26' : '#f8f9fa');
    }

    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('kderice:themechange', {
      detail: { theme }
    }));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute(THEME_ATTR) || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  // ========================================
  // Initialize Theme Toggle
  // ========================================
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Set initial theme
    const theme = getPreferredTheme();
    applyTheme(theme);

    // Add click listener
    toggle.addEventListener('click', toggleTheme);

    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't explicitly set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ========================================
  // Initialize
  // ========================================
  if (document.readyState !== 'loading') {
    initThemeToggle();
  } else {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  }

  // Export for other modules
  window.KDERice = window.KDERice || {};
  window.KDERice.theme = {
    get: () => document.documentElement.getAttribute(THEME_ATTR) || 'light',
    set: applyTheme,
    toggle: toggleTheme
  };
})();