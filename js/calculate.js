import { id } from "./id.js";
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('project-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const projectForm = document.getElementById('project-form'); 
    let projetosSelect = document.getElementById('projetos')

    const closeModal = () => modal.close();

    const openModal = () => {
        if (projectForm) projectForm.reset(); 

        modal.showModal();
    };

    openModalBtn.addEventListener('click', openModal);

    cancelBtn.addEventListener('click', closeModal);

    projetosSelect.addEventListener('change', () => {
        let idProjeto = projetosSelect.value
        window.location.href = `calculate2.html?id=${id}`
    })

    projetosSelect.addEventListener('click', () => {
        fetch("https://obracerta-api.onrender.com/api/projetos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((result) => {
            return result.json()
        }).then((projects) => {
            projects.forEach(project => {
                let option = document.createElement('option')
                option.value = project.id
                option.textContent = project.titulo
                projetosSelect.append(option)
            });
        })
    })
    
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        let titulo = modal.querySelector('#project-title').value
        let descricao = modal.querySelector("#project-description").value
        let dado = {
            "titulo": titulo,
            "descricao": descricao,
            "progresso": 0
        }
        if (titulo.trim() == ""|| descricao.trim() == "") {
            let invalido = document.querySelector('.invalido')
            invalido.textContent = "Titulo ou descrição invalida"
            return
        }

        fetch("https://obracerta-api.onrender.com/api/projetos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dado)
        }).then(() => {
            window.location.href = `calculate2.html?id=${id}`
        })

        closeModal();
    });

});