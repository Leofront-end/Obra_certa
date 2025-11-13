export function abrirModal(modal) {
    if (modal) modal.showModal();
}

export function fecharModal(modal) {
    if (modal) modal.close();
}

function setupModalTriggers() {
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
}

import { setupCarrossel } from './carrossel.js'; 
import { setupForms } from './forms.js';
import { listaMaterial } from "./material.js";

document.addEventListener('DOMContentLoaded', () => {
    setupModalTriggers();
    setupForms();
    listaMaterial();
    setupCarrossel();
});