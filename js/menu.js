// Função 1: Controla a abertura do Menu no celular (A que você já tinha)
function Menu() {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const appNav = document.getElementById('app-nav');

    if (menuToggleBtn && appNav) {
        menuToggleBtn.addEventListener('click', () => {
            appNav.classList.toggle('active'); 
        });
    }
}

// Função 2: Controla o Logout (A nova que estamos criando)
function setupLogout() {
    // Procura o link com id="btn-logout"
    const logoutBtn = document.getElementById('btn-logout'); 
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que o link tente carregar "#"
            
            // 1. Remove o ID do usuário (Logout)
            localStorage.removeItem('usuarioId');
            
            // 2. Remove dados temporários (Opcional)
            localStorage.removeItem('projetoPendente');

            // 3. Redireciona para o login (sai da pasta pages e vai pro index)
            window.location.href = '../index.html';
        });
    }
}

// Inicializa tudo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    Menu();       // Liga o menu sanduíche
    setupLogout(); // Liga o botão de sair
});