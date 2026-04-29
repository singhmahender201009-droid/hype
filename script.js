let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const fullscreenButton = document.getElementById('fullscreen');
const speakerNotes = document.getElementById('speaker-notes');
const audioElements = document.querySelectorAll('audio, video');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + totalSlides) % totalSlides; // Wraps around
    slides[currentSlide].classList.add('active');

    // Pause all audio/video on transition
    audioElements.forEach(el => el.pause());

    // Display speaker notes
    speakerNotes.textContent = slides[currentSlide].getAttribute('data-notes');
} 

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function startPresentation() {
    showSlide(0);
    setInterval(nextSlide, 10000); // Automatic transition every 10 seconds
}

function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
            nextSlide();
            break;
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'f': // F for fullscreen
            toggleFullscreen();
            break;
    }
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('blur', pausePresentation);
window.addEventListener('focus', resumePresentation);

function pausePresentation() {
    clearInterval(); // Clear timeout to stop automatic transitions
}

function resumePresentation() {
    startPresentation();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
fullscreenButton.addEventListener('click', toggleFullscreen);

document.addEventListener('DOMContentLoaded', startPresentation);