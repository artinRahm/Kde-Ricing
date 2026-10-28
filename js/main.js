/**
 * KDE Plasma Ricing Guide - Main JavaScript
 * Core functionality and initialization
 */

(function() {
  'use strict';

  // ========================================
  // DOM Ready
  // ========================================
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without scrolling
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // ========================================
  // Code Block Copy Buttons
  // ========================================
  function initCodeCopy() {
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.code-copy-btn')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
      wrapper.appendChild(btn);

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          btn.classList.add('copied');
          btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  // ========================================
  // Active Nav Link Highlighting
  // ========================================
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.split('/').pop();

      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Also handle sidebar links on guide pages
    document.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          // Will be handled by scroll spy in guide.js
        }
      }
    });
  }

  // ========================================
  // Lazy Load Images
  // ========================================
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.loading = 'lazy';
      });
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute('loading');
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // ========================================
  // Intersection Observer for Animations
  // ========================================
  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animatedElements = document.querySelectorAll(
      '.feature-card, .comparison-card, .checklist-column, .showcase-item, ' +
      '.tool-card, .theme-collection, .widget-category, .config-file, ' +
      '.resource-card, .gallery-item, .trouble-item, .help-card'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

  // ========================================
  // Keyboard Navigation Enhancement
  // ========================================
  function initKeyboardNav() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.open');
        if (openModal) {
          const closeBtn = openModal.querySelector('.modal-close');
          if (closeBtn) closeBtn.click();
        }

        // Close mobile nav
        const navLinks = document.querySelector('.nav-links.open');
        if (navLinks) {
          const navToggle = document.querySelector('.nav-toggle');
          if (navToggle) navToggle.click();
        }

        // Close sidebar
        const sidebar = document.querySelector('.guide-sidebar.open, .trouble-sidebar.open');
        if (sidebar) {
          const toggle = sidebar.querySelector('.sidebar-toggle');
          if (toggle) toggle.click();
        }
      }
    });
  }

  // ========================================
  // Initialize All
  // ========================================
  ready(() => {
    initSmoothScroll();
    initCodeCopy();
    initActiveNav();
    initLazyLoad();
    initScrollAnimations();
    initKeyboardNav();

    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('kderice:ready'));
  });

  // Export for other modules
  window.KDERice = {
    ready
  };
})();