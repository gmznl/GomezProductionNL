

/*------Burger Button------*/
const toggleMenu = document.querySelector(".toggle__menu");
const headerNav = document.querySelector(".header__nav");

toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("open");
    headerNav.classList.toggle("open");
});






/*------Header Active------*/
document.addEventListener('DOMContentLoaded', () => {
    const headerNavItems = document.querySelectorAll('.header__nav ul li');
    const sections = document.querySelectorAll('section');

    function removeActiveClass() {
        headerNavItems.forEach(nav => nav.classList.remove('active'));
    }

    function addActiveClass(link) {
        link.classList.add('active');
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const sectionId = `#${entry.target.id}`;
            const link = document.querySelector(`.header__nav ul li a[href="${sectionId}"]`);

            if (entry.isIntersecting) {
                removeActiveClass();
                addActiveClass(link.parentElement);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    headerNavItems.forEach(li => {
        li.addEventListener('click', function (e) {
            const targetLink = this.querySelector('a');
            if (targetLink) {
                e.preventDefault();

                const targetSection = document.querySelector(targetLink.getAttribute('href'));
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }

                removeActiveClass();
                addActiveClass(this);


                if (window.innerWidth <= 800) {
                    toggleMenu.classList.remove('open');
                    headerNav.classList.remove('open');
                }
            }
        });
    });
});






/*------Motherfuckin Gallery------*/
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('.gallery__lightbox');
    const galleryItems = document.querySelectorAll('.gallery__item img');
    const lightboxImage = document.querySelector('.gallery__lightbox-image');
    const closeBtn = document.querySelector('.gallery__close');
    const navLeft = document.querySelector('.gallery__nav-button--left');
    const navRight = document.querySelector('.gallery__nav-button--right');

    let currentIndex = 0;

    function openLightbox(item) {
        console.log('Opening lightbox');
        lightbox.classList.add('show');
        lightboxImage.src = item.src;
        currentIndex = Array.from(galleryItems).indexOf(item);
        updateNavButtons();
    }

    function updateNavButtons() {
        if (navLeft && navRight) {
            console.log('Updating navigation buttons');
            navLeft.style.display = currentIndex === 0 ? 'none' : 'flex';
            navRight.style.display = currentIndex === galleryItems.length - 1 ? 'none' : 'flex';
        }
    }

    function showNextItem() {
        console.log('Showing next item');
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(galleryItems[currentIndex]);
    }

    function showPreviousItem() {
        console.log('Showing previous item');
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(galleryItems[currentIndex]);
    }

    function closeLightbox() {
        console.log('Closing lightbox');
        lightbox.classList.remove('show');
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });

    if (navLeft) navLeft.addEventListener('click', showPreviousItem);
    if (navRight) navRight.addEventListener('click', showNextItem);
    closeBtn.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPreviousItem();
            } else if (e.key === 'ArrowRight') {
                showNextItem();
            }
        }
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});






/*------Loading Screen------*/
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.add('fade-in');
        }, 500);
    }, 1000);
});





