/**
 * KDE Plasma Ricing Guide - Gallery Page JavaScript
 * Handles filtering, pagination, and modal display
 */

(function() {
  'use strict';

  // Gallery data for modal details
  const riceData = {
    'rice-1': {
      title: 'Nordic Minimal',
      distro: 'Arch Linux',
      theme: 'Nordic',
      style: 'Minimal',
      date: '2024-01-15',
      author: '@linuxrice',
      description: 'Clean Nordic theme with Latte Dock, minimal panel, and krohnkite tiling. This setup focuses on productivity with a distraction-free environment.',
      details: {
        'Global Theme': 'Nordic',
        'Color Scheme': 'Nordic',
        'Plasma Theme': 'Nordic',
        'Window Decoration': 'Nordic',
        'KWin Script': 'Krohnkite',
        'Dock': 'Latte Dock',
        'Fonts': 'Noto Sans, JetBrains Mono',
        'Icons': 'Papirus-Dark'
      },
      links: [
        { text: 'View Dotfiles', url: '#', icon: 'github' },
        { text: 'KDE Store', url: 'https://store.kde.org/p/1315146/', icon: 'external' }
      ]
    },
    'rice-2': {
      title: 'Catppuccin Mocha Tiling',
      distro: 'NixOS',
      theme: 'Catppuccin Mocha',
      style: 'Tiling',
      date: '2024-01-20',
      author: '@nixosrice',
      description: 'Declarative NixOS configuration with Bismuth tiling, Catppuccin Mocha theme, and Home Manager for user-level configuration management.',
      details: {
        'Global Theme': 'Catppuccin Mocha',
        'Color Scheme': 'Catppuccin Mocha',
        'Plasma Theme': 'Catppuccin',
        'Window Decoration': 'Catppuccin',
        'KWin Script': 'Bismuth',
        'Config': 'NixOS Flakes + Home Manager',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Terminal': 'Kitty with Catppuccin'
      },
      links: [
        { text: 'View Config', url: '#', icon: 'github' },
        { text: 'Catppuccin KDE', url: 'https://github.com/catppuccin/kde', icon: 'external' }
      ]
    },
    'rice-3': {
      title: 'Gruvbox Material',
      distro: 'Arch Linux',
      theme: 'Gruvbox',
      style: 'Dock-based',
      date: '2024-02-01',
      author: '@gruvboxfan',
      description: 'Warm Gruvbox colors with custom Latte Dock layout, Kvantum theming for Qt applications, and consistent GTK theming via kde-gtk-config.',
      details: {
        'Global Theme': 'Gruvbox Material Dark',
        'Color Scheme': 'Gruvbox Dark',
        'Plasma Theme': 'Gruvbox',
        'Window Decoration': 'Gruvbox',
        'Kvantum Theme': 'Gruvbox',
        'Dock': 'Latte Dock (custom layout)',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Icons': 'Gruvbox-Material'
      },
      links: [
        { text: 'View Dotfiles', url: '#', icon: 'github' },
        { text: 'Gruvbox KDE', url: 'https://github.com/gruvbox-community/gruvbox-kde', icon: 'external' }
      ]
    },
    'rice-4': {
      title: 'Tokyo Night Wayland',
      distro: 'NixOS',
      theme: 'Tokyo Night',
      style: 'Wayland',
      date: '2024-02-10',
      author: '@waylandrice',
      description: 'Pure Wayland session with Tokyo Night theme, custom KWin effects, and optimized for fractional scaling on HiDPI displays.',
      details: {
        'Global Theme': 'Tokyo Night',
        'Color Scheme': 'Tokyo Night',
        'Plasma Theme': 'Tokyo Night',
        'Window Decoration': 'Tokyo Night',
        'Session': 'Wayland',
        'Scaling': '150% fractional',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Compositor': 'KWin (Wayland)'
      },
      links: [
        { text: 'View Config', url: '#', icon: 'github' },
        { text: 'Tokyo Night KDE', url: 'https://github.com/faustomorales/tokyo-night-kde-theme', icon: 'external' }
      ]
    },
    'rice-5': {
      title: 'Dracula Minimal',
      distro: 'Arch Linux',
      theme: 'Dracula',
      style: 'Minimal',
      date: '2024-02-15',
      author: '@dracularice',
      description: 'Classic Dracula theme with hidden panel, KRunner-only workflow for maximum screen real estate and keyboard-driven navigation.',
      details: {
        'Global Theme': 'Dracula',
        'Color Scheme': 'Dracula',
        'Plasma Theme': 'Dracula',
        'Window Decoration': 'Dracula',
        'Panel': 'Hidden (Meta+D for launcher)',
        'Launcher': 'KRunner (Alt+Space)',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Icons': 'Dracula'
      },
      links: [
        { text: 'View Dotfiles', url: '#', icon: 'github' },
        { text: 'Dracula KDE', url: 'https://draculatheme.com/kde', icon: 'external' }
      ]
    },
    'rice-6': {
      title: 'Rose Pine Dawn',
      distro: 'NixOS',
      theme: 'Rose Pine Dawn',
      style: 'Traditional',
      date: '2024-02-20',
      author: '@pineuser',
      description: 'Light Rose Pine variant with traditional panel layout, showcasing the Dawn flavor of Rose Pine for a bright, warm aesthetic.',
      details: {
        'Global Theme': 'Rose Pine Dawn',
        'Color Scheme': 'Rose Pine Dawn',
        'Plasma Theme': 'Rose Pine',
        'Window Decoration': 'Rose Pine',
        'Panel': 'Traditional bottom panel',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Icons': 'Rose Pine',
        'Variant': 'Dawn (light)'
      },
      links: [
        { text: 'View Config', url: '#', icon: 'github' },
        { text: 'Rose Pine KDE', url: 'https://github.com/rose-pine/kde', icon: 'external' }
      ]
    },
    'rice-7': {
      title: 'Custom Nord Build',
      distro: 'Arch Linux',
      theme: 'Custom Nord Variant',
      style: 'Tiling',
      date: '2024-03-01',
      author: '@customricer',
      description: 'Hand-crafted Nord variant with custom color scheme adjustments, Krohnkite tiling, and personalized keybindings for development workflow.',
      details: {
        'Global Theme': 'Custom (Nord-based)',
        'Color Scheme': 'Custom Nord Variant',
        'Plasma Theme': 'Nordic (modified)',
        'Window Decoration': 'Custom',
        'KWin Script': 'Krohnkite',
        'Keybindings': 'Custom (i3-like)',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Terminal': 'Alacritty with custom theme'
      },
      links: [
        { text: 'View Dotfiles', url: '#', icon: 'github' }
      ]
    },
    'rice-8': {
      title: 'Everforest NixOS',
      distro: 'NixOS',
      theme: 'Everforest',
      style: 'Dock-based',
      date: '2024-03-05',
      author: '@forestrice',
      description: 'Everforest theme ported to KDE with Latte Dock, fully declarative NixOS configuration, and Home Manager for user packages.',
      details: {
        'Global Theme': 'Everforest (ported)',
        'Color Scheme': 'Everforest Dark',
        'Plasma Theme': 'Everforest (custom)',
        'Window Decoration': 'Everforest',
        'Dock': 'Latte Dock',
        'Config': 'NixOS Flakes + Home Manager',
        'Fonts': 'JetBrains Mono, Noto Sans',
        'Terminal': 'Kitty with Everforest'
      },
      links: [
        { text: 'View Config', url: '#', icon: 'github' }
      ]
    }
  };

  // ========================================
  // Gallery Filtering
  // ========================================
  function initGalleryFilter() {
    const filterSelects = document.querySelectorAll('#distroFilter, #themeFilter, #styleFilter, #sortFilter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterSelects.length === 0 || galleryItems.length === 0) return;

    function applyFilters() {
      const distroFilter = document.getElementById('distroFilter').value;
      const themeFilter = document.getElementById('themeFilter').value;
      const styleFilter = document.getElementById('styleFilter').value;
      const sortFilter = document.getElementById('sortFilter').value;

      galleryItems.forEach(item => {
        const distro = item.dataset.distro;
        const theme = item.dataset.theme;
        const style = item.dataset.style;

        const distroMatch = distroFilter === 'all' || distro === distroFilter;
        const themeMatch = themeFilter === 'all' || theme === themeFilter;
        const styleMatch = styleFilter === 'all' || style === styleFilter;

        const show = distroMatch && themeMatch && styleMatch;
        item.classList.toggle('hidden', !show);
      });

      // Sort items
      const container = document.getElementById('galleryGrid');
      const itemsArray = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));

      itemsArray.sort((a, b) => {
        switch (sortFilter) {
          case 'newest':
            return new Date(b.dataset.date) - new Date(a.dataset.date);
          case 'oldest':
            return new Date(a.dataset.date) - new Date(b.dataset.date);
          case 'popular':
            return b.dataset.popularity - a.dataset.popularity;
          default:
            return 0;
        }
      });

      itemsArray.forEach(item => container.appendChild(item));
    }

    filterSelects.forEach(select => {
      select.addEventListener('change', applyFilters);
    });
  }

  // ========================================
  // Modal Handling
  // ========================================
  function initModal() {
    const modal = document.getElementById('riceModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const viewButtons = document.querySelectorAll('.view-details');

    if (!modal || !modalBody || !modalClose) return;

    function openModal(riceId) {
      const data = riceData[riceId];
      if (!data) return;

      modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <div class="gallery-meta">
          <span class="tag tag-${data.distro.toLowerCase().replace(' ', '-')}">${data.distro}</span>
          <span class="tag tag-theme">${data.theme}</span>
          <span class="tag tag-style">${data.style}</span>
        </div>
        <p class="gallery-desc">${data.description}</p>
        <div class="rice-details">
          ${Object.entries(data.details).map(([key, value]) => `
            <div class="detail-item">
              <h4>${key}</h4>
              <p>${value}</p>
            </div>
          `).join('')}
        </div>
        <div class="rice-links">
          ${data.links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener" class="btn btn-${link.icon === 'github' ? 'outline' : 'primary'} btn-sm">
              ${link.text}
            </a>
          `).join('')}
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        openModal(btn.dataset.rice);
      });
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ========================================
  // Pagination (placeholder for future)
  // ========================================
  function initPagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    if (!prevBtn || !nextBtn) return;

    // For now, disable since we have all items on one page
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initGalleryFilter();
    initModal();
    initPagination();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();