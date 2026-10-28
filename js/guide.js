/**
 * KDE Plasma Ricing Guide - Guide Page JavaScript
 * Handles guide-specific functionality
 */

(function() {
  'use strict';

  // ========================================
  // Tab Switching (for driver tabs, option cards)
  // ========================================
  function initTabs() {
    document.querySelectorAll('.driver-tabs, .tab-container').forEach(container => {
      const tabs = container.querySelectorAll('.driver-tab, .tab-btn');
      const panels = container.querySelectorAll('.driver-panel, .tab-panel');

      if (tabs.length === 0 || panels.length === 0) return;

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.driver || tab.dataset.tab;

          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          panels.forEach(panel => {
            const isTarget = panel.dataset.driver === target || panel.dataset.tab === target;
            panel.classList.toggle('active', isTarget);
          });
        });

        // Keyboard support
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tab.click();
          }
        });
      });
    });
  }

  // ========================================
  // Copy Command Buttons
  // ========================================
  function initCommandCopy() {
    document.querySelectorAll('pre code').forEach(code => {
      const pre = code.parentElement;
      if (pre.classList.contains('command-block')) return;

      // Check if it's a command (starts with $ or #)
      const text = code.textContent.trim();
      if (text.startsWith('$') || text.startsWith('#')) {
        pre.classList.add('command-block');

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
          const cleanText = text.replace(/^[\$\#]\s*/gm, '');
          try {
            await navigator.clipboard.writeText(cleanText);
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
            console.error('Failed to copy command:', err);
          }
        });
      }
    });
  }

  // ========================================
  // Expandable Code Blocks
  // ========================================
  function initExpandableCode() {
    document.querySelectorAll('pre').forEach(pre => {
      const code = pre.querySelector('code');
      if (!code) return;

      const lines = code.textContent.split('\n').length;
      if (lines > 30) {
        pre.classList.add('expandable');
        pre.style.maxHeight = '400px';
        pre.style.overflow = 'hidden';

        const expandBtn = document.createElement('button');
        expandBtn.className = 'btn btn-sm btn-ghost expand-code-btn';
        expandBtn.textContent = 'Expand';
        expandBtn.style.marginTop = 'var(--space-sm)';

        expandBtn.addEventListener('click', () => {
          const isExpanded = pre.classList.toggle('expanded');
          expandBtn.textContent = isExpanded ? 'Collapse' : 'Expand';
          pre.style.maxHeight = isExpanded ? 'none' : '400px';
        });

        pre.parentNode.insertBefore(expandBtn, pre.nextSibling);
      }
    });
  }

  // ========================================
  // Keyboard Shortcuts Display
  // ========================================
  function initKeyboardShortcuts() {
    // Convert kbd elements to styled version
    document.querySelectorAll('kbd').forEach(kbd => {
      if (!kbd.classList.contains('styled')) {
        kbd.classList.add('styled');
      }
    });
  }

  // ========================================
  // Print Styles Enhancement
  // ========================================
  function initPrintSupport() {
    const printBtn = document.querySelector('.print-guide');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initTabs();
    initCommandCopy();
    initExpandableCode();
    initKeyboardShortcuts();
    initPrintSupport();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();