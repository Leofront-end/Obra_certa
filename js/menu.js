const menu = document.querySelector('header span');
const navegacao = document.querySelector('header nav');
const lista = document.querySelectorAll('header li');
const header = document.querySelector('header');
const body = document.querySelector('body');

function fecharMenu() {
    if (window.innerWidth < 744 && navegacao) {
        navegacao.style.display = 'none';
    }
    if (body) body.style.overflow = 'scroll';
    if (menu) menu.textContent = 'menu';
    if (header) header.classList.remove('menu');
}

export function setupMenu() {
    if (menu && header && navegacao && body) {
        menu.addEventListener('click', () => {
            header.classList.toggle('menu');

            if (header.classList.contains('menu')) {
                navegacao.style.display = 'flex';
                body.style.overflow = 'hidden';
                menu.textContent = 'close';
            } else {
                fecharMenu();
            }
        });
    }

    lista.forEach(e => { 
        e.addEventListener('click', fecharMenu);
    });

    fecharMenu();
}