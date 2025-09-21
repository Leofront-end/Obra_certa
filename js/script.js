let botaoLogin = document.querySelector('nav button')
let modalLogin = document.querySelector('#modalLogin')
let modalCadastro = document.querySelector('#modalCadastro')
let botaoCadastro = document.querySelector('.hero button')
let fecharModal = document.querySelectorAll('dialog span')

// ---------------------------------------------------------------------
// direcionar pro dashboard após logar
let loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    window.location.href = "dashboard.html"
});
// ---------------------------------------------------------------------


fecharModal[0].addEventListener('click', () => modalLogin.close())
fecharModal[1].addEventListener('click', () => modalCadastro.close())

botaoCadastro.addEventListener('click', () => modalCadastro.showModal())

function modalCadastros(e) {
    e.preventDefault()
    modalCadastro.showModal()
}


botaoLogin.addEventListener('click', () => {
    modalLogin.showModal()
})