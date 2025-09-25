const loginForm = document.querySelector('#loginForm');
let menu = document.querySelector('header span')
let navegacao = document.querySelector('header nav')
let lista = document.querySelectorAll('header li')
let header = document.querySelector('header')

function fecharMenu() {
    if (window.innerWidth < 744) {
        navegacao.style.display = 'none'
    }
    document.querySelector('body').style.overflow = 'scroll'
    menu.textContent = 'menu'
}

menu.addEventListener('click', () => {
    header.classList.toggle('menu')

    if (header.classList.contains('menu')) {
        navegacao.style.display = 'flex'
        document.querySelector('body').style.overflow = 'hidden'
        menu.textContent = 'close'
    } else {
        fecharMenu()
    }
})

lista.forEach(e => { e.addEventListener('click', () => fecharMenu())})

function abrirModal(modal) {
    if (modal) modal.showModal();
}

function fecharModal(modal) {
    if (modal) modal.close();
}

document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = btn.getAttribute('data-modal-target');
        const targetModal = document.querySelector(`#${targetId}`);

        const modalAberto = e.target.closest('dialog');
        if (modalAberto) {
            fecharModal(modalAberto);
        }
        abrirModal(targetModal);
    });
});

document.querySelectorAll('dialog .material-symbols-outlined').forEach(span => {
    if (span.textContent.trim() === 'close') {
        span.addEventListener('click', (e) => {
            const modal = e.target.closest('dialog');
            fecharModal(modal);
        });
    }
});
