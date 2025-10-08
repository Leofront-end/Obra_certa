export function setupCarrossel() {
    const slidesContainer = document.querySelector('.conteudoSlides');
    const cards = document.querySelectorAll('.conteudoSlides .card'); 
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicadores = document.querySelectorAll('.indicadores .indicador');

    if (!slidesContainer || cards.length === 0 || !prevBtn || !nextBtn) {
        return;
    }

    let currentSlide = 0;
    const totalSlides = cards.length;

    function updateCarrossel() {
        const offset = -currentSlide * 100; 
        slidesContainer.style.transform = `translateX(${offset}%)`;

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('ativo', index === currentSlide);
        });
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarrossel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1; 
        }
        updateCarrossel();
    });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            currentSlide = index;
            updateCarrossel();
        });
    });

    updateCarrossel(); 
}