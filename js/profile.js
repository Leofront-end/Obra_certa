import { id } from "./id.js";

let nomeInput = document.querySelector('#name')
let emailInput = document.querySelector('#email')

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