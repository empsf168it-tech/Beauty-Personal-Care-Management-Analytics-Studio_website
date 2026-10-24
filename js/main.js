document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeButtons = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('luxury-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('luxury-theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            const label = btn.querySelector('.theme-label');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.replace('bi-moon', 'bi-sun');
                } else {
                    icon.classList.replace('bi-sun', 'bi-moon');
                }
            }
            if (label) {
                label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
            }
        });
    }

    // --- RTL Toggle Logic ---
    const rtlButtons = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    const htmlEl = document.documentElement;

    if (rtlButtons.length > 0) {
        // Check for saved direction
        const savedDir = localStorage.getItem('luxury-dir') || 'ltr';
        htmlEl.setAttribute('dir', savedDir);
        updateRtlIcons(savedDir);

        rtlButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentDir = htmlEl.getAttribute('dir') || 'ltr';
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

                htmlEl.setAttribute('dir', newDir);
                localStorage.setItem('luxury-dir', newDir);
                updateRtlIcons(newDir);
            });
        });
    } else {
        htmlEl.setAttribute('dir', 'ltr');
        localStorage.removeItem('luxury-dir');
    }

    function updateRtlIcons(dir) {
        rtlButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            const label = btn.querySelector('.rtl-label');
            if (icon) {
                if (dir === 'rtl') {
                    icon.classList.replace('bi-text-paragraph', 'bi-text-right');
                } else {
                    icon.classList.replace('bi-text-right', 'bi-text-paragraph');
                }
            }
            if (label) {
                label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
            }
        });
    }

    // --- Sidebar Menu Logic ---
    const menuBtn = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar-menu');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
        });

        const closeSidebar = () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scroll
        };

        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        // Auto-close on link click (only navigation links)
        const sidebarNavLinks = sidebar.querySelectorAll('nav a');
        sidebarNavLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // --- Active Link Sync (Desktop & Mobile/Tab Hamburger Menu) ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const cleanPath = currentPath.toLowerCase();
    const allMenuLinks = document.querySelectorAll('.nav-links-desktop a, .sidebar-menu nav a');
    allMenuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkFile = href.split('#')[0].split('?')[0].split('/').pop().toLowerCase();
        if (linkFile === cleanPath || (cleanPath === '' && linkFile === 'index.html') || (cleanPath === 'product-details.html' && linkFile === 'collections.html')) {
            link.classList.add('active');
        }
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar-luxury');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.75rem 0';
                navbar.style.background = 'var(--header-bg)';
            } else {
                navbar.style.padding = '1.25rem 0';
                navbar.style.background = 'var(--header-bg)';
            }
        });
    }

    // --- Filter Logic (Basic placeholder for UI) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // --- Wishlist Feedback ---
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-heart');
                icon.classList.toggle('bi-heart-fill');
                icon.style.color = icon.classList.contains('bi-heart-fill') ? 'var(--accent-gold)' : '';
            }
        });
    });

    // --- Password Visibility Toggle ---
    const passwordToggles = document.querySelectorAll('.password-toggle-btn');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    if (icon) icon.classList.replace('bi-eye', 'bi-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    if (icon) icon.classList.replace('bi-eye-slash', 'bi-eye');
                }
            }
        });
    });

    // --- Back To Top Button ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.type = 'button';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    const toggleBackToTop = () => {
        if (window.scrollY > 250) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
