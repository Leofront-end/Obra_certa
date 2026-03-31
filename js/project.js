import { id } from "./id.js";

const API_TAREFAS = 'https://obracerta-api.onrender.com/api/tarefas';

if (window.location.pathname.includes('project.html')) {
    const titulo = document.querySelector('h1');
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('ProjetoId');
    const butoes = document.querySelector('.buttons');

    adicionarId(butoes, projectId);

    fetch(`https://obracerta-api.onrender.com/api/projetos/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => { titulo.textContent = data.titulo; })
    .catch(err => console.error('Erro ao buscar projeto:', err));

} else if (window.location.pathname.includes('tasks.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('ProjetoId');
    const formulario = document.querySelector('form');
    const tituloInput = formulario.querySelector('#tarefa');
    const itensInput = formulario.querySelector('#itens');
    const selecao = formulario.querySelector('select');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // ← não tinha isso no original

        if (!tituloInput.value || !itensInput.value || !selecao.value) {
            alert('Preencha todos os campos');
            return;
        }

        const dados = {
            nome: tituloInput.value,
            itensAFazer: Number(itensInput.value),
            prioridade: selecao.value,
            projetoId: Number(projectId)
        };


        fetch(API_TAREFAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dados)
        })
        .then(res => {
            if (!res.ok) throw new Error('Falha ao criar tarefa');
            window.location.href = `project.html?id=${id}&ProjetoId=${projectId}`;
        })
        .catch(err => console.error('Erro ao criar tarefa:', err));
    });
}

function adicionarId(elemento, projectId) {
    elemento.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        e.preventDefault();
        const urlAtual = link.getAttribute('href');
        if (urlAtual && !urlAtual.includes('?id=')) {
            window.location.href = `${urlAtual}?id=${id}&ProjetoId=${projectId}`;
        } else {
            window.location.href = urlAtual;
        }
    });
}