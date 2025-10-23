const adSlides = [ // textos dos slides
    {content: 'Anúncio 1: Planeje sua obra com precisão!'},
    {content: 'Anúncio 2: As melhores ferramentas para sua construção.'},
    {content: 'Anúncio 3: Economize até 30% em materiais.'}
];

// setar índice inicial
let currentSlideIndex = 0;

const adContent = document.querySelector('.ad-content');
const arrows = document.querySelectorAll('.arrow');
const dots = document.querySelectorAll('.dot');

console.log('Elemento do conteúdo encontrado:', adContent);

function showSlide(index) {

    console.log('Tentando exibir o texto:', adSlides[index].content);
    // att texto do slide
    adContent.textContent = adSlides[index].content;

    // att pontinho ativo
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // muda pro indice atual
    currentSlideIndex = index;
};

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.textContent.includes('arrow_back_ios')) {
            // indica q a seta pra esquerda volta um slide
            currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : adSlides.length - 1;
        } else {
            // seta pra direita = passa um slide
            currentSlideIndex = (currentSlideIndex < adSlides.length - 1) ? currentSlideIndex + 1 : 0;
        }
        showSlide(currentSlideIndex);
    })
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

showSlide(0);

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const appNav = document.getElementById('app-nav');

    if (menuToggleBtn && appNav) {
        menuToggleBtn.addEventListener('click', () => {
            appNav.classList.toggle('active'); // bota/tira a classe active
        });
    }
});