import { id } from "./id.js";

const nome = document.querySelector('.nome')
const email = document.querySelector('.email')

fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
    method:"GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((res) => res.json())
    .then((dado) => {
        nome.textContent = dado.nome
        email.textContent = dado.email
    })