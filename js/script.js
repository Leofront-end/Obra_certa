const loginForm = document.querySelector('#loginForm');

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

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = "dashboard.html";
    });
}