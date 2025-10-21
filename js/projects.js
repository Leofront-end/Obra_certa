document.addEventListener('DOMContentLoaded', () => {

    //  1. SELEÇÃO DE TODOS OS ELEMENTOS DO HTML (DOM)
    // --- Modal Principal (Criar/Editar) ---
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('project-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const projectForm = document.getElementById('project-form');
    const modalTitle = document.getElementById('modal-title');
    const projectIdInput = document.getElementById('project-id');

    // --- Modal de Exclusão ---
    const deleteModal = document.getElementById('delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const deleteProjectTitle = document.getElementById('delete-project-title');
    const projectIdToDeleteInput = document.getElementById('project-id-to-delete');

    // --- Área Principal ---
    const projectsGrid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search-input');

    //  2. DADOS E LOCALSTORAGE

    // Função para salvar a lista de projetos no armazenamento local do navegador
    const saveProjectsToLocalStorage = () => {
        localStorage.setItem('meusProjetos', JSON.stringify(projects));
    };

    // Lista de projetos inicial (usada somente se o usuário não tiver nada salvo)
    const initialProjects = [
        { id: 1, title: 'Edifício São Paulo', description: 'Acompanhamento de alvenaria e acabamentos do bloco A.', progress: 80 },
        { id: 2, title: 'Condomínio Ferraz de Vasconcelos', description: 'Fase de fundação. Próxima medição em 25/11.', progress: 15 },
        { id: 3, title: 'Galpão Industrial', description: 'Projeto concluído. Aguardando documentação final.', progress: 99 },
    ];

    // Carrega os projetos do localStorage. Se não houver, usa a lista inicial.
    let projects = JSON.parse(localStorage.getItem('meusProjetos'));
    if (!projects) {
        projects = initialProjects;
        saveProjectsToLocalStorage();
    }

    //  3. FUNÇÕES PRINCIPAIS

    /**
     * READ: Desenha os cards de projeto na tela.
     * @param {Array} projectList - A lista de projetos a ser exibida.
     */
    const renderProjects = (projectList = projects) => {
        projectsGrid.innerHTML = ''; // Limpa a área antes de redesenhar
        if (projectList.length === 0) {
            projectsGrid.innerHTML = `<p class="empty-message">Nenhum projeto encontrado.</p>`;
            return;
        }
        projectList.forEach(project => {
            const isCompleted = project.progress === 100;
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
                    <h3 class="card-title">${project.title}</h3>
                    <span class="project-status ${statusClass}">${statusText}</span>
                </div>
                <p class="card-text">${project.description}</p>
                <div class="card-progress">
                    <label>Progresso: ${project.progress}%</label>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${project.progress}%;"></div>
                    </div>
                </div>
                <div class="card-footer">
                     <div class="card-actions">
                        <button class="btn-action btn-edit">Editar</button>
                        <button class="btn-action btn-delete">Excluir</button>
                    </div>
                    <a href="#" class="btn-details">Ver Detalhes</a>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    };

    // --- Funções do Modal de Criar/Editar ---
    const openModalForCreate = () => {
        modalTitle.textContent = 'Criar Novo Projeto';
        projectForm.reset();
        projectIdInput.value = '';
        modal.showModal();
    };

    const openModalForEdit = (project) => {
        modalTitle.textContent = 'Editar Projeto';
        projectIdInput.value = project.id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-progress').value = project.progress;
        modal.showModal();
    };
    
    const closeModal = () => modal.close();

    // --- Funções do Modal de Exclusão ---
    const openDeleteModal = (project) => {
        deleteProjectTitle.textContent = project.title;
        projectIdToDeleteInput.value = project.id;
        deleteModal.showModal();
    };

    const closeDeleteModal = () => deleteModal.close();

    //  4. EVENT LISTENERS (AÇÕES DO USUÁRIO)
 
    // --- Listeners para o Modal de Criar/Editar ---
    openModalBtn.addEventListener('click', openModalForCreate);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Number(projectIdInput.value);
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const progress = Number(document.getElementById('project-progress').value);
        if (id) { // Se tem ID, estamos editando (UPDATE)
            const projectIndex = projects.findIndex(p => p.id === id);
            if (projectIndex !== -1) projects[projectIndex] = { ...projects[projectIndex], title, description, progress };
        } else { // Se não tem ID, estamos criando (CREATE)
            const newProject = { id: Date.now(), title, description, progress };
            projects.push(newProject);
        }
        saveProjectsToLocalStorage();
        renderProjects();
        closeModal();
    });

    // --- Listeners para os botões nos Cards (Editar e Excluir) ---
    projectsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        const projectId = Number(card.getAttribute('data-id'));
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        if (e.target.classList.contains('btn-edit')) {
            openModalForEdit(project);
        }
        if (e.target.classList.contains('btn-delete')) {
            openDeleteModal(project);
        }
    });

    // --- Listeners para o Modal de Exclusão ---
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
    confirmDeleteBtn.addEventListener('click', () => {
        const projectId = Number(projectIdToDeleteInput.value);
        projects = projects.filter(p => p.id !== projectId); // DELETE
        saveProjectsToLocalStorage();
        renderProjects();
        closeDeleteModal();
    });

    // --- Listener para a Barra de Busca ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projects.filter(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
        renderProjects(filteredProjects);
    });

    //  5. INICIALIZAÇÃO
    // Desenha os projetos na tela pela primeira vez que a página carrega.
    renderProjects();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const appNav = document.getElementById('app-nav');

    if (menuToggleBtn && appNav) {
        menuToggleBtn.addEventListener('click', () => {
            appNav.classList.toggle('active'); // bota/tira a classe active
        });
    }
});