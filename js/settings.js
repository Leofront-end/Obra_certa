import { id } from "./id.js";

const nome = document.querySelector('.nome')
const email = document.querySelector('.email')

fetch(`https://obracerta-api.onrender.com/api/usuarios/${id}`, {
    method:"GET",
    headers: {
        'Content-Type': 'application/json'
    },
    // ADICIONE AQUI TAMBÉM:
    credentials: 'include' 
})
    .then((res) => {
        // DICA EXTRA: Tratamento de erro se a sessão cair
        if (res.status === 403 || res.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "../index.html"; // Volta pro login
        }
        return res.json();
    })
    .then((dado) => {
        nome.textContent = dado.nome
        email.textContent = dado.email
    })