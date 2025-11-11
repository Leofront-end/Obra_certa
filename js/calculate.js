document.addEventListener('DOMContentLoaded', () => {

    // 1. SELETORES MÍNIMOS NECESSÁRIOS
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('project-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const projectForm = document.getElementById('project-form'); 

    // 2. FUNÇÕES MÍNIMAS
    const closeModal = () => modal.close();

    const openModal = () => {
        // Apenas reseta o formulário e abre
        if (projectForm) projectForm.reset(); 
        modal.showModal();
    };

    // 3. LISTENERS DO MODAL

    // Abre o modal
    openModalBtn.addEventListener('click', openModal);

    // Fecha ao clicar no "Cancelar"
    cancelBtn.addEventListener('click', closeModal);
    
    // Fechar ao clicar no backdrop (fora do modal)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ** A CORREÇÃO PRINCIPAL: Interceptar o envio do formulário! **
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); // IMPEDE QUE O NAVEGADOR RECARREGUE A PÁGINA
        
        // Coloque aqui a lógica de salvar/criar projeto (que está faltando)
        // Por enquanto, apenas fecha o modal
        closeModal();
    });

});