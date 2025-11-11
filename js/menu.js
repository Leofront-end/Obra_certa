function Menu() {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const appNav = document.getElementById('app-nav');

    if (menuToggleBtn && appNav) {
        menuToggleBtn.addEventListener('click', () => {
            appNav.classList.toggle('active'); 
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Menu()
});
