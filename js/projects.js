import { id } from "./id.js";
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://obracerta-api.onrender.com/api/projetos'; 

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
    

    // 2. DADOS E API
    let projects = []; 

    // 3. FUNÇÕES PRINCIPAIS (CRUD com Fetch)

    /**
     * READ: Busca projetos da API e desenha os cards.
     */
    const fetchAndRenderProjects = async (projectList = null) => {
        if (!projectList) {
            try {
                // GET: Busca todos os projetos
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`Falha ao carregar projetos (Status: ${response.status})`);
                
                projects = await response.json(); 
                
            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
                projectsGrid.innerHTML = `<p class="error-message">Erro ao carregar projetos. Verifique a API. Detalhe: ${error.message}</p>`;
                return;
            }
        }
        
        renderProjects(projectList || projects); 
    };

    /**
     * READ: Desenha os cards de projeto na tela. (Usa: project.titulo, project.descricao, project.progresso)
     */
    const renderProjects = (projectList) => {
        projectsGrid.innerHTML = ''; 
        if (projectList.length === 0) {
            projectsGrid.innerHTML = `<p class="empty-message">Nenhum projeto encontrado.</p>`;
            return;
        }
        
        projectList.forEach(project => {
            // Usa as chaves da API para renderizar
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
                    <a href="projects/project.html?id=${id}&ProjetoId=${project.id}" class="btn-details">Ver Detalhes</a>
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

    /**
     * Preenche o modal de edição. (Usa: project.titulo, project.descricao, project.progresso)
     */
    const openModalForEdit = (project) => {
        modalTitle.textContent = 'Editar Projeto';
        projectIdInput.value = project.id;
        document.getElementById('project-title').value = project.titulo;
        document.getElementById('project-description').value = project.descricao;
        document.getElementById('project-progress').value = project.progresso;
        modal.showModal();
    };
    
    const closeModal = () => modal.close();

    // --- Funções do Modal de Exclusão ---
    const openDeleteModal = (project) => {
        deleteProjectTitle.textContent = project.titulo;
        projectIdToDeleteInput.value = project.id;
        deleteModal.showModal();
    };

    const closeDeleteModal = () => deleteModal.close();

    const verificarEPreencherModal = () => {
        const dadosSalvos = localStorage.getItem('projetoPendente');
        if (!dadosSalvos) return;

        const projetoObj =JSON.parse(dadosSalvos);

        const titleInput = document.getElementById('project-title');
        const descInput = document.getElementById('project-description');

        if (titleInput && descInput) {
            titleInput.value = projetoObj.titulo;
            descInput.value = projetoObj.descricao;
            
            modalTitle.textContent = "Salvar cálculo em projeto";

            modal.showModal();

            localStorage.removeItem('projetoPendente');
        }
    };
        
    // 4. EVENT LISTENERS (AÇÕES DO USUÁRIO)

    /**
     * --- Listener para Submissão do Formulário (CREATE/UPDATE) ---
     * CORRIGIDO: Declarando 'method' e 'url' no escopo correto.
     * ENVIA: titulo, descricao, progresso.
     */
    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = projectIdInput.value; 
        
        const titleValue = document.getElementById('project-title').value;
        const descriptionValue = document.getElementById('project-description').value;
        const progressValue = document.getElementById('project-progress').value;

        const projectData = { 
            "titulo": titleValue,
            "descricao": descriptionValue,
            "progresso": Number(progressValue) // Garante o tipo numérico
        };
        
        // 💡 Variáveis declaradas antes do try/catch para evitar ReferenceError no bloco catch
        let response;
        let url;
        let method;

        if (id) { 
            // UPDATE: Método PUT. O ID é usado na URL.
            url = `${API_URL}/${id}`;
            method = 'PUT';
        } else { 
            // CREATE: Método POST. O ID não é usado na URL.
            url = API_URL;
            method = 'POST';
        }

        try {
            response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            
            if (!response.ok) {
                const errorDetail = await response.text(); 
                // Agora 'method' está acessível aqui e no catch
                throw new Error(`Falha ao ${id ? 'atualizar' : 'criar'} projeto. Status: ${response.status}. Detalhe: ${errorDetail.substring(0, 100)}...`);
            }
            
            await fetchAndRenderProjects(); 
            closeModal();

        } catch (error) {
            console.error(`Erro na operação CRUD (${method}):`, error); 
            alert(`Erro: Falha na requisição ${method}. Verifique as permissões da API (erro 403). Detalhe: ${error.message}`);
        }
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

    // --- Listener para Confirmação de Exclusão (DELETE) ---
    confirmDeleteBtn.addEventListener('click', async () => {
        const projectId = projectIdToDeleteInput.value;
        
        try {
            // DELETE: Excluir projeto
            const response = await fetch(`${API_URL}/${projectId}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) throw new Error(`Falha ao excluir projeto (Status: ${response.status}).`);
            
            await fetchAndRenderProjects(); 
            closeDeleteModal();
            
        } catch (error) {
            console.error('Erro na operação DELETE:', error);
            alert(`Erro: Falha na requisição DELETE. Verifique as permissões da API (erro 403). Detalhe: ${error.message}`);
        }
    });

    /**
     * --- Listener para a Barra de Busca ---
     * (Usa: project.titulo e project.descricao)
     */
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projects.filter(p => 
            p.titulo.toLowerCase().includes(searchTerm) || 
            p.descricao.toLowerCase().includes(searchTerm)
        );
        renderProjects(filteredProjects); 
    });
    
    // --- Listeners para Abertura e Fechamento de Modais (Mesmos de antes) ---
    openModalBtn.addEventListener('click', openModalForCreate);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });

    // 5. INICIALIZAÇÃO
    fetchAndRenderProjects();

    // 
    verificarEPreencherModal();
});

