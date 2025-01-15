document.addEventListener('DOMContentLoaded', function() {
    // Mencegah DevTools
    document.addEventListener('keydown', function(e) {
        // Mencegah F12
        if(e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Mencegah Ctrl+Shift+I dan Ctrl+Shift+J
        if((e.ctrlKey && e.shiftKey && e.key === 'I') || 
           (e.ctrlKey && e.shiftKey && e.key === 'J') ||
           (e.ctrlKey && e.shiftKey && e.key === 'C')) {
            e.preventDefault();
            return false;
        }
        // Mencegah Ctrl+U (View Source)
        if(e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });

    // Mencegah klik kanan
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Mencegah DevTools melalui shortcut Chrome
    document.addEventListener('keydown', function(e) {
        if((e.key === 123) || (e.ctrlKey && e.shiftKey && e.key === 73)) {
            e.preventDefault();
            return false;
        }
    });

    // Inisialisasi AOS
    AOS.init({
        duration: 800,
        offset: 50,
        once: true
    });

    // Navigasi Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    let navOverlay;

    // Buat overlay element
    function createOverlay() {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }
    createOverlay();

    // Toggle navigasi mobile
    function toggleNav() {
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenu.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', toggleNav);

    // Tutup navigasi saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // Header scroll effect yang sederhana
    const header = document.querySelector('.header');

    function handleScroll() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Inisialisasi posisi header saat pertama kali
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Event listener untuk tombol CTA di header
    const headerCTA = document.querySelector('.header .cta-button');
    headerCTA.addEventListener('click', function() {
        window.location.href = 'https://wa.me/6281315207117?text=Halo,%20saya%20tertarik%20dengan%20produk%20Maduta';
    });

    // Event listener untuk tombol order di product cards
    const orderButtons = document.querySelectorAll('.order-button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'https://wa.me/6281315207117?text=Halo,%20saya%20tertarik%20dengan%20produk%20Maduta';
        });
    });

    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link saat scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Tambahkan efek ripple pada tombol
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}); 