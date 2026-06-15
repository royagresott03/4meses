const pages = document.querySelectorAll('.page');
const book = document.getElementById('book');
const bookViewport = document.querySelector('.book-viewport');

// Guardar los z-index originales de cada página
const initialZIndexes = Array.from(pages).map(p => parseInt(p.style.zIndex) || 0);

// Agregar funcionalidad de tap para cambiar de página
bookViewport.addEventListener('click', (e) => {
    // Obtener la posición del clic
    const rect = bookViewport.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const viewportWidth = rect.width;
    const midpoint = viewportWidth / 2;
    
    // Si hace clic a la derecha, ir a la siguiente página
    if (clickX > midpoint) {
        nextPage();
    } 
    // Si hace clic a la izquierda, retroceder
    else {
        prevPage();
    }
});

function nextPage() {
    // Encontrar la primera página no volteada
    for (let i = 0; i < pages.length; i++) {
        if (!pages[i].classList.contains('flipped')) {
            const page = pages[i];
            page.classList.add('flipped');
            setTimeout(() => {
                page.style.zIndex = 0;
            }, 150);
            updateBookPosition();
            break;
        }
    }
}

function prevPage() {
    // Encontrar la última página volteada
    for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i].classList.contains('flipped')) {
            const page = pages[i];
            page.classList.remove('flipped');
            setTimeout(() => {
                page.style.zIndex = initialZIndexes[i];
            }, 300);
            updateBookPosition();
            break;
        }
    }
}

function updateBookPosition() {
    setTimeout(() => {
        const anyFlipped = Array.from(pages).some(p => p.classList.contains('flipped'));
        const isMobile = window.innerWidth <= 600;

        if (!isMobile) {
            book.style.transform = anyFlipped ? "translateX(50%)" : "translateX(50%)";
        } else {
            book.style.transform = "translateX(0px)";
        }
    }, 50);
}

window.addEventListener('resize', updateBookPosition);
