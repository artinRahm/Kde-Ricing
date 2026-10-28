/**
 * KDE Plasma Ricing Guide - Navigation
 * Handles mobile menu, sidebar toggles, and scroll spy
 */

(function() {
  'use strict';

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // Sidebar Toggle (Guide/Troubleshooting)
  // ========================================
  function initSidebarToggle() {
    const toggles = document.querySelectorAll('.sidebar-toggle');

    toggles.forEach(toggle => {
      const sidebar = toggle.closest('.guide-sidebar, .trouble-sidebar');
      if (!sidebar) return;

      toggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
          sidebar.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
          sidebar.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ========================================
  // Scroll Spy for Sidebar Links
  // ========================================
  function initScrollSpy() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');
    if (sidebarLinks.length === 0) return;

    const sections = Array.from(sidebarLinks).map(link => {
      const id = link.getAttribute('href');
      return document.querySelector(id);
    }).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-100px 0px -66% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // Header Shadow on Scroll
  // ========================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const threshold = 10;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > threshold) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initMobileNav();
    initSidebarToggle();
    initScrollSpy();
    initHeaderScroll();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Re-initialize on theme change (for sidebar)
  document.addEventListener('kderice:themechange', () => {
    // No specific action needed, but hook for future
  });
})();