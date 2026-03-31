import { id as usuarioIdImportado } from "./id.js";

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://obracerta-api.onrender.com/api/projetos';
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('project-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const projectForm = document.getElementById('project-form');
    const modalTitle = document.getElementById('modal-title');
    const projectIdInput = document.getElementById('project-id');
    const deleteModal = document.getElementById('delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const deleteProjectTitle = document.getElementById('delete-project-title');
    const projectIdToDeleteInput = document.getElementById('project-id-to-delete');
    const projectsGrid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search-input');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id') || usuarioIdImportado;

    let projects = [];

    const fetchAndRenderProjects = async (projectList = null) => {
        if (!projectList) {
            try {
                const response = await fetch(`${API_URL}/usuario/${userId}`, {
                    credentials: 'include'
                });

                if (!response.ok) throw new Error(`Erro API: ${response.status}`);

                projects = await response.json();

            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
                projectsGrid.innerHTML = `<p class="error-message">Erro ao carregar projetos. Tente recarregar a página.</p>`;
                return;
            }
        }

        renderProjects(projectList || projects);
    };

    const renderProjects = (projectList) => {
        projectsGrid.innerHTML = '';
        if (projectList.length === 0) {
            projectsGrid.innerHTML = '<p class="empty-message">Nenhum projeto encontrado.</p>';
            return;
        }

        projectList.forEach(project => {
            const isCompleted = project.progresso === 100;
            const cardClass = isCompleted ? 'project-card status-completed' : 'project-card';
            const statusText = isCompleted ? 'Concluído' : 'Em Andamento';
            const statusClass = isCompleted ? '' : 'in-progress';
            const icon = isCompleted ? 'storefront' : 'apartment';

            const projectCard = document.createElement('div');
            projectCard.className = cardClass;
            projectCard.setAttribute('data-id', project.id);
            projectCard.innerHTML = `
                <div class="card-header">
                    <span class="material-symbols-outlined card-icon">${icon}</span>
                    <h3 class="card-title">${project.titulo}</h3>
                    <span class="project-status ${statusClass}">${statusText}</span>
                </div>
                <p class="card-text">${project.descricao}</p>
                <div class="card-progress">
                    <label>Progresso: ${project.progresso}%</label>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${project.progresso}%;"></div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-actions">
                        <button class="btn-action btn-edit">Editar</button>
                        <button class="btn-action btn-delete">Excluir</button>
                    </div>
                    <a href="projects/project.html?id=${usuarioIdImportado}&ProjetoId=${project.id}" class="btn-details">Ver Detalhes</a>
                </div>`;
            projectsGrid.appendChild(projectCard);
        });
    };

    const openModalForCreate = () => {
        modalTitle.textContent = 'Criar Novo Projeto';
        projectForm.reset();
        projectIdInput.value = '';
        modal.showModal();
    };

    const openModalForEdit = (project) => {
        modalTitle.textContent = 'Editar Projeto';
        projectIdInput.value = project.id;
        document.getElementById('project-title').value = project.titulo;
        document.getElementById('project-description').value = project.descricao;
        document.getElementById('project-progress').value = project.progresso;
        modal.showModal();
    };

    const closeModal = () => modal.close();

    const openDeleteModal = (project) => {
        deleteProjectTitle.textContent = project.titulo;
        projectIdToDeleteInput.value = project.id;
        deleteModal.showModal();
    };

    const closeDeleteModal = () => deleteModal.close();

    const verificarEPreencherModal = () => {
        const dadosSalvos = localStorage.getItem('projetoPendente');
        if (!dadosSalvos) return;
        const projetoObj = JSON.parse(dadosSalvos);
        const titleInput = document.getElementById('project-title');
        const descInput = document.getElementById('project-description');
        if (titleInput && descInput) {
            titleInput.value = projetoObj.titulo;
            descInput.value = projetoObj.descricao;
            modalTitle.textContent = 'Salvar cálculo em projeto';
            modal.showModal();
            localStorage.removeItem('projetoPendente');
        }
    };

    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idProjeto = projectIdInput.value;
        const titleValue = document.getElementById('project-title').value;
        const descriptionValue = document.getElementById('project-description').value;
        const progressValue = document.getElementById('project-progress').value;

        const projectData = {
            titulo: titleValue,
            descricao: descriptionValue,
            progresso: Number(progressValue),
            usuarioId: Number(userId)
        };

        const url = idProjeto ? `${API_URL}/${idProjeto}` : API_URL;
        const method = idProjeto ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Falha na requisição. Status: ${response.status}. Detalhe: ${errorDetail.substring(0, 100)}...`);
            }

            await fetchAndRenderProjects();
            closeModal();
        } catch (error) {
            console.error(`Erro na operação CRUD (${method}):`, error);
            alert(`Erro: Falha na requisição. Detalhe: ${error.message}`);
        }
    });

    projectsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        const projectId = Number(card.getAttribute('data-id'));
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        if (e.target.classList.contains('btn-edit')) openModalForEdit(project);
        if (e.target.classList.contains('btn-delete')) openDeleteModal(project);
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        const projectId = projectIdToDeleteInput.value;
        try {
            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Falha ao excluir (Status: ${response.status}).`);
            await fetchAndRenderProjects();
            closeDeleteModal();
        } catch (error) {
            console.error('Erro na operação DELETE:', error);
            alert(`Erro: Falha na requisição DELETE. Detalhe: ${error.message}`);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projects.filter(p =>
            p.titulo.toLowerCase().includes(searchTerm) ||
            p.descricao.toLowerCase().includes(searchTerm)
        );
        renderProjects(filteredProjects);
    });

    openModalBtn.addEventListener('click', openModalForCreate);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => { if (e.target === deleteModal) closeDeleteModal(); });

    fetchAndRenderProjects();
    verificarEPreencherModal();
});
