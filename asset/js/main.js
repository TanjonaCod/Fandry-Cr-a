
// Menu toggle pour mobile
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    const spans = document.querySelectorAll('.menu-toggle span');
    if (navLinks.classList.contains('active')) {
spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
spans[1].style.opacity = '0';
spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
spans[0].style.transform = 'none';
spans[1].style.opacity = '1';
spans[2].style.transform = 'none';
    }
}

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('visible');
}
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Carrousel
const track = document.getElementById('projectsTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let slidesPerView = getSlidesPerView();
const totalSlides = document.querySelectorAll('.project-slide').length;

function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
}

function updateSlider() {
    slidesPerView = getSlidesPerView();
    const slideWidth = document.querySelector('.project-slide')?.offsetWidth || 0;
    const gap = 30;
    const maxIndex = totalSlides - slidesPerView;
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const translateX = -(currentIndex * (slideWidth + gap));
    track.style.transform = `translateX(${translateX}px)`;
    
    dots.forEach((dot, index) => {
if (index >= currentIndex && index < currentIndex + slidesPerView) {
    dot.classList.add('active');
} else {
    dot.classList.remove('active');
}
    });
}

function slideNext() {
    slidesPerView = getSlidesPerView();
    const maxIndex = totalSlides - slidesPerView;
    if (currentIndex < maxIndex) {
currentIndex++;
    } else {
currentIndex = 0;
    }
    updateSlider();
}

function slidePrev() {
    slidesPerView = getSlidesPerView();
    if (currentIndex > 0) {
currentIndex--;
    } else {
currentIndex = totalSlides - slidesPerView;
    }
    updateSlider();
}

function goToSlide(index) {
    slidesPerView = getSlidesPerView();
    const maxIndex = totalSlides - slidesPerView;
    currentIndex = Math.min(index, maxIndex);
    updateSlider();
}

// Événements
window.addEventListener('resize', () => {
    updateSlider();
});

window.addEventListener('load', () => {
    setTimeout(updateSlider, 100);
});

// Fermer le menu mobile au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
document.getElementById('navLinks').classList.remove('active');
    });
});
