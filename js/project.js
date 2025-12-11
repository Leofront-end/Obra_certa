import { id } from "./id.js";
if(window.location.pathname == "/pages/projects/project.html") {
    let titulo = document.querySelector('h1')
    const queryString = window.location.search

    const urlParametros = new URLSearchParams(queryString)
    const projectId = urlParametros.get('ProjetoId');
    const butoes = document.querySelector('.buttons')
    AdicionarId(butoes,projectId)

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

} else if (window.location.pathname == "/pages/projects/tasks.html") {
    const queryString = window.location.search

    const urlParametros = new URLSearchParams(queryString)
    const projectId = urlParametros.get('ProjetoId');

    let formulario = document.querySelector('form')
    let titulo = formulario.querySelector('#tarefa')
    let itensFazer = formulario.querySelector('#itens')
    let selecao = formulario.querySelector('select')

    fetch(`https://obracerta-api.onrender.com/api/tarefas/projeto/${projectId}`, {
        method: "GET",
        headers: {
            "Content-Type":"Application/json"
        }
    }).then((dados) => {
        return dados.json()
    }).then((resposta) => {
        resposta.forEach(resposta => {
            const listaDeTarefas = document.querySelector("ul")
            const lista = document.createElement("li")
            lista.className = "tarefa"
            const titulo = document.createElement("p")
            titulo.textContent = resposta.nome

            const itensAFazer = document.createElement("p")
            itensAFazer.textContent = resposta.itensAFazer

            const prioridade = document.createElement("p")
            prioridade.textContent = resposta.prioridade

            const editar = document.createElement("button")
            editar.textContent = "Editar"
            editar.className = "btn-action btn-edit"

            const excluir = document.createElement("button")
            excluir.textContent = "Excluir"
            excluir.className = "btn-action btn-delete"
    
            lista.append(titulo, itensAFazer, prioridade, editar, excluir)
            listaDeTarefas.appendChild(lista)
        });
    })

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        if (titulo.value == ""|| itensFazer.value == ""|| selecao.options[selecao.selectedIndex].value == "") {
            alert()
            return
        }
        let dados = {
            "nome": `${titulo.value}`,
            "itensAFazer": `${itensFazer.value}`,
            "prioridade": `${selecao.options[selecao.selectedIndex].value}`,
            "projetoId": projectId
        }
        fetch(`https://obracerta-api.onrender.com/api/tarefas`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(dados)
        }).then(() => {
            const listaDeTarefas = document.querySelector("ul")
            const lista = document.createElement("li")
            lista.className = "tarefa"

            const titulo = document.createElement("p")
            titulo.textContent = dados.nome

            const itensAFazer = document.createElement("p")
            itensAFazer.textContent = dados.itensAFazer

            const prioridade = document.createElement("p")
            prioridade.textContent = dados.prioridade

            const editar = document.createElement("button")
            editar.textContent = "Editar"
            editar.className = "btn-action btn-edit"

            const excluir = document.createElement("button")
            excluir.textContent = "Excluir"
            excluir.className = "btn-action btn-delete"

            lista.append(titulo, itensAFazer, prioridade, editar, excluir)
            listaDeTarefas.appendChild(lista)
        })
    })
}

function AdicionarId(elemento,projectId) {
    elemento.addEventListener('click', (e) => {
        let link = e.target.closest('a')

        e.preventDefault()

        const urlAtual =  link.getAttribute('href')

        if (urlAtual && !urlAtual.includes('?id=')) {
            const novaUrl = `${urlAtual}?id=${id}&ProjetoId=${projectId}`
            window.location.href = novaUrl
        } else {
            window.location.href = urlAtual
        }
    })
}