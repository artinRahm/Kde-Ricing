/**
 * KDE Plasma Ricing Guide - Troubleshooting Page JavaScript
 * Handles troubleshooting-specific functionality
 */

(function() {
  'use strict';

  // ========================================
  // Expandable Trouble Items
  // ========================================
  function initExpandableTroubles() {
    document.querySelectorAll('.trouble-item').forEach(item => {
      const header = item.querySelector('h3');
      const solution = item.querySelector('.trouble-solution');

      if (!header || !solution) return;

      // Initially collapse long solutions
      const contentHeight = solution.scrollHeight;
      if (contentHeight > 300) {
        solution.style.maxHeight = '300px';
        solution.style.overflow = 'hidden';
        solution.classList.add('collapsed');

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-sm btn-ghost toggle-solution';
        toggleBtn.textContent = 'Show More';
        toggleBtn.style.marginTop = 'var(--space-sm)';

        toggleBtn.addEventListener('click', () => {
          const isExpanded = solution.classList.toggle('expanded');
          solution.style.maxHeight = isExpanded ? 'none' : '300px';
          toggleBtn.textContent = isExpanded ? 'Show Less' : 'Show More';
        });

        solution.parentNode.insertBefore(toggleBtn, solution.nextSibling);
      }
    });
  }

  // ========================================
  // Copy Command with Explanation
  // ========================================
  function initTroubleshootingCopy() {
    document.querySelectorAll('.trouble-solution pre').forEach(pre => {
      const code = pre.querySelector('code');
      if (!code) return;

      // Check if it has a comment explaining the command
      const text = code.textContent;
      const lines = text.split('\n');
      const hasComments = lines.some(line => line.trim().startsWith('#'));

      if (hasComments) {
        pre.classList.add('has-comments');
      }

      // Add copy button if not already present
      if (!pre.querySelector('.code-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.setAttribute('aria-label', 'Copy command');
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;

        pre.style.position = 'relative';
        pre.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });
      }
    });
  }

  // ========================================
  // Search/Filter Troubles
  // ========================================
  function initTroubleSearch() {
    // Create search input if not present
    const troubleContent = document.querySelector('.trouble-content');
    if (!troubleContent) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'trouble-search';
    searchContainer.style.marginBottom = 'var(--space-xl)';
    searchContainer.innerHTML = `
      <label for="troubleSearch" class="sr-only">Search troubleshooting</label>
      <input type="search" id="troubleSearch" placeholder="Search troubleshooting..." class="search-input">
    `;

    const searchInput = searchContainer.querySelector('#troubleSearch');
    const troubleItems = document.querySelectorAll('.trouble-item');

    // Insert after page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader && pageHeader.nextSibling) {
      pageHeader.parentNode.insertBefore(searchContainer, pageHeader.nextSibling);
    } else if (pageHeader) {
      pageHeader.parentNode.appendChild(searchContainer);
    }

    // Style the search input
    const style = document.createElement('style');
    style.textContent = `
      .trouble-search { max-width: 500px; }
      .search-input {
        width: 100%;
        padding: var(--space-sm) var(--space-md);
        font-family: var(--font-sans);
        font-size: var(--text-base);
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        color: var(--color-text);
        transition: all var(--transition-fast);
      }
      .search-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px var(--color-primary-light);
      }
      .trouble-item.hidden { display: none; }
      .trouble-section.hidden { display: none; }
      .no-results {
        text-align: center;
        padding: var(--space-xl);
        color: var(--color-text-muted);
      }
    `;
    document.head.appendChild(style);

    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();

        if (query === '') {
          troubleItems.forEach(item => item.classList.remove('hidden'));
          document.querySelectorAll('.trouble-section').forEach(s => s.classList.remove('hidden'));
          document.querySelector('.no-results')?.remove();
          return;
        }

        let visibleCount = 0;

        troubleItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          const match = text.includes(query);
          item.classList.toggle('hidden', !match);
          if (match) visibleCount++;
        });

        // Hide empty sections
        document.querySelectorAll('.trouble-section').forEach(section => {
          const visibleItems = section.querySelectorAll('.trouble-item:not(.hidden)');
          section.classList.toggle('hidden', visibleItems.length === 0);
        });

        // Show no results message
        let noResults = document.querySelector('.no-results');
        if (visibleCount === 0) {
          if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = `No results found for "${searchInput.value}"`;
            troubleContent.appendChild(noResults);
          }
        } else {
          noResults?.remove();
        }
      }, 150);
    });
  }

  // ========================================
  // Anchor Link Highlighting
  // ========================================
  function initAnchorHighlight() {
    // Highlight target section when navigating via anchor
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.style.animation = 'highlightPulse 2s ease';
        const style = document.createElement('style');
        style.textContent = `
          @keyframes highlightPulse {
            0% { background-color: var(--color-primary-light); }
            100% { background-color: transparent; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initExpandableTroubles();
    initTroubleshootingCopy();
    initTroubleSearch();
    initAnchorHighlight();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();