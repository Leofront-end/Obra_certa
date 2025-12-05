let titulo = document.querySelector('h1')
const queryString = window.location.search
const urlParametros = new URLSearchParams(queryString)
const projectId = urlParametros.get('ProjetoId');

fetch(`https://obracerta-api.onrender.com/api/projetos/${projectId}`, {
    method: "GET",
    headers: {
        "Content-Type": "Application/json"
    }
}).then((resposta) => {
    return resposta.json()
}).then((data) => {
    titulo.textContent = data.titulo
})