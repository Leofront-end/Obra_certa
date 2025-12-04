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
            const targetModal = document.querySelector('#${targetId}');

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

function configurarCalculadoraIndex() {
    const formCalculadora = document.getElementById("materiaisForm")
    if (!formCalculadora) return;

    const btnCalcular = formCalculadora.querySelector('button');

    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault;

        const superficie = document.getElementById('superficie').value;
        const material = document.getElementById('material').value;
        const altura = document.getElementById('altura').value;
        const largura = document.getElementById('largura').value;

        if (!superficie || !material || !altura || !largura) {
            alert("Por favor, preencha todos os campos do cálculo.")
            return;
        }

        const calculoTemp = {
            titulo: 'Projeto: ${material} em ${superficie}',
            descricao: 'Cálculo automático: Altura ${altura}m x Largura ${largura}m.',
            progresso: 0
        }

        localStorage.setItem('projetoPendente', JSON.stringify(calculoTemp));

        const btnLogin = document.querySelector('[data-modal-target="modalLogin]');
        if (btnLogin) btnLogin.click();
     })

     Document.addEventListener('DOMContentLoaded', configurarCalculadoraIndex);
}