import { id } from "./id.js";

let nomeInput = document.querySelector('#name')
let emailInput = document.querySelector('#email')
let botaoEditar = document.querySelector('.btn-edit')
let botaoExcluir = document.querySelector('.btn-delete')
let modalEditar = document.querySelector('.modal-editar')
let modalExcluir = document.querySelector('.modal-excluir')

fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
    method:"GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((res) => res.json())
    .then((dado) => {
        nomeInput.value = dado.nome
        emailInput.value = dado.email
    })
    .catch(() => {
        console.error('HOuve um erro')
    })

botaoEditar.addEventListener('click', () => {
    modalEditar.showModal()
    let confirmarEdicao = modalEditar.querySelector('.btn-primary') 
    let sair = modalEditar.querySelector('.btn-secondary')
    sair.addEventListener('click', () => modalEditar.close())

    confirmarEdicao.addEventListener('click', () => {
        let dados = {
            nome: `${nomeInput.value}`,
            email: `${emailInput.value}`
        }
        fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(dados)
        })
            .then((response) => {
                response.json()
                modalEditar.close()
            })
    })
})

botaoExcluir.addEventListener('click', () => {
    modalExcluir.showModal()
    let confirmarExclusao = modalExcluir.querySelector('.btn-danger')
    let sair = modalExcluir.querySelector('.btn-secondary')
    sair.addEventListener('click', () => modalExcluir.close())

    confirmarExclusao.addEventListener('click', () => {
        fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.href = "/"
        })
    })
})