import { id } from "./id.js";

const nomeInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const botaoEditar = document.querySelector('.btn-edit');
const botaoExcluir = document.querySelector('.btn-delete');
const modalEditar = document.querySelector('.modal-editar');
const modalExcluir = document.querySelector('.modal-excluir');

fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
})
.then(res => res.json())
.then(dado => {
    nomeInput.value = dado.nome;
    emailInput.value = dado.email;
})
.catch(() => console.error('Erro ao carregar perfil'));

const confirmarEdicao = modalEditar.querySelector('.btn-primary');
const sairEditar = modalEditar.querySelector('.btn-secondary');
const confirmarExclusao = modalExcluir.querySelector('.btn-danger');
const sairExcluir = modalExcluir.querySelector('.btn-secondary');

botaoEditar.addEventListener('click', () => modalEditar.showModal());
sairEditar.addEventListener('click', () => modalEditar.close());

confirmarEdicao.addEventListener('click', () => {
    fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        credentials: 'include',
        body: JSON.stringify({ nome: nomeInput.value, email: emailInput.value })
    })
    .then(res => {
        if (!res.ok) throw new Error('Falha ao atualizar');
        return res.json();
    })
    .then(() => modalEditar.close())
    .catch(err => console.error('Erro ao atualizar perfil:', err));
});

botaoExcluir.addEventListener('click', () => modalExcluir.showModal());
sairExcluir.addEventListener('click', () => modalExcluir.close());

confirmarExclusao.addEventListener('click', () => {
    fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(() => {
        localStorage.removeItem('usuarioId');
        window.location.href = '/';
    })
    .catch(err => console.error('Erro ao excluir conta:', err));
});