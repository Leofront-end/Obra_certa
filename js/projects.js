// Aguarda o HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM) ---
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('project-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const projectForm = document.getElementById('project-form');
    const projectsGrid = document.getElementById('projects-grid');
    const modalTitle = document.getElementById('modal-title');
    const projectIdInput = document.getElementById('project-id');
    const searchInput = document.getElementById('search-input');

    // --- 2. "BANCO DE DADOS" SIMULADO ---
    let projects = [
        { id: 1, title: 'Edifício Burj Khalifa!', description: 'Acompanhamento de alvenaria e acabamentos do bloco A.', progress: 80 },
        { id: 2, title: 'Condomínio São Paulo', description: 'Fase de fundação. Próxima medição em 25/11.', progress: 15 },
        { id: 3, title: 'Galpão Industrial', description: 'Projeto concluído. Aguardando documentação final.', progress: 99 },
        { id: 4, title: 'Projeto Cliente X', description: 'Acesso somente leitura para acompanhamento do cliente.', progress: 100 },
        { id: 5, title: 'Obra Parceiro Y', description: 'Colaboração no planejamento orçamentário.', progress: 100 }
    ];

    // --- 3. FUNÇÕES DO CRUD ---

    /**
     * READ - Função para renderizar (desenhar) os projetos na tela.
     * Ela pode receber uma lista de projetos para renderizar (útil para a busca).
     */
    const renderProjects = (projectList = projects) => {
        projectsGrid.innerHTML = ''; // Limpa a grid

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

    /**
     * Funções para manipular o modal
     */
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

    // --- 4. EVENT LISTENERS ---

    openModalBtn.addEventListener('click', openModalForCreate);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Ações de Editar e Excluir
    projectsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        const projectId = Number(card.getAttribute('data-id'));
        
        if (e.target.classList.contains('btn-edit')) {
            const projectToEdit = projects.find(p => p.id === projectId);
            if (projectToEdit) openModalForEdit(projectToEdit);
        }
        
        if (e.target.classList.contains('btn-delete')) {
            if (confirm('Tem certeza que deseja excluir este projeto?')) {
                projects = projects.filter(p => p.id !== projectId);
                renderProjects();
            }
        }
    });

    // Lógica do formulário (Criar ou Atualizar)
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = Number(projectIdInput.value);
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const progress = Number(document.getElementById('project-progress').value);

        if (id) {
            // UPDATE
            const projectIndex = projects.findIndex(p => p.id === id);
            if (projectIndex !== -1) {
                projects[projectIndex] = { ...projects[projectIndex], title, description, progress };
            }
        } else {
            // CREATE
            const newProject = { id: Date.now(), title, description, progress };
            projects.push(newProject);
        }

        renderProjects();
        closeModal();
    });

    // Filtro de busca
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projects.filter(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
        renderProjects(filteredProjects);
    });

    // --- 5. INICIALIZAÇÃO ---
    renderProjects();
});