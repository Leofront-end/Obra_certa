import { abrirModal, fecharModal } from './script.js'; 

const loginForm = document.querySelector('#loginForm');
const cadastroForm = document.querySelector('#cadastroForm');
const passwordLogin = loginForm.querySelector('.icon-button');
const passwordsCadastro = cadastroForm.querySelectorAll('.icon-button')
const invalido = document.querySelectorAll('.invalido');

function mudarPassword() {
    passwordLogin.addEventListener('click', () => {
        if (loginForm.querySelector('#senhaLogin').type == "password") {
            loginForm.querySelector('#senhaLogin').type = "text"
            passwordLogin.textContent = "visibility"
        } else {
            loginForm.querySelector('#senhaLogin').type = "password"
            passwordLogin.textContent = "visibility_off"
        }
    })

    passwordsCadastro[0].addEventListener('click', () => {
        if (cadastroForm.querySelector('#senhaCadastro').type == "password") {
            cadastroForm.querySelector('#senhaCadastro').type = "text"
            passwordsCadastro[0].textContent = "visibility"
        } else {
            cadastroForm.querySelector('#senhaCadastro').type = "password"
            passwordsCadastro[0].textContent = "visibility_off"
        }
    })

    passwordsCadastro[1].addEventListener('click', () => {
        if (cadastroForm.querySelector('#confirmarSenha').type == "password") {
            cadastroForm.querySelector('#confirmarSenha').type = "text"
            passwordsCadastro[1].textContent = "visibility"
        } else {
            cadastroForm.querySelector('#confirmarSenha').type = "password"
            passwordsCadastro[1].textContent = "visibility_off"
        }
    })
}

function botaoAtivo (botaoCadastro, botao) {
    botaoCadastro.forEach(inativar => inativar.classList.remove('ativarBotao'))
    return botao.classList.add('ativarBotao')
}

function handleCadastroSubmit() {
    if (!cadastroForm || !invalido[1]) return;

    let botaoCadastro = cadastroForm.querySelectorAll('div button')
    botaoCadastro.forEach((botao) => {
        botao.addEventListener('click', () =>  botaoAtivo(botaoCadastro,botao))
    })
    
    cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault()
        invalido[1].textContent = ''
        let inputsCadastro = cadastroForm.querySelectorAll('input')
        
        if (!(botaoCadastro[0].className == 'ativarBotao' || botaoCadastro[1].className == 'ativarBotao') ) {
            invalido[1].textContent = 'Clique em um dos botões'
            return
        }
        
        if (invalidarNome(inputsCadastro[0].value)) {
            invalido[1].textContent = 'Digite um nome valido'
            inputsCadastro[0].focus()
            return
        }
        
        if (invalidateEmail(inputsCadastro[1].value)) {
            invalido[1].textContent = 'Digite um email valido'
            inputsCadastro[1].focus()
            return
        }

        if (inputsCadastro[2].value != inputsCadastro[3].value) {
            invalido[1].textContent = 'As senhas não correspondem'
            inputsCadastro[2].focus()
            return
        }
        
        for (let input of inputsCadastro) {
            if (input.value.trim() == '') {
                invalido[1].textContent = 'Preencha todos os campos' 
                input.focus()
                return
            }
        }

        if (!inputsCadastro[4].checked) {
            invalido[1].textContent = 'Aceite os termos' 
            input.focus()
            return
        }
        
        if (invalido[1].textContent == '') {
            const modal = event.target.closest('dialog');
            let dados = {
                "nome": inputsCadastro[0].value,
                "email": inputsCadastro[1].value,
                "senha":inputsCadastro[2].value
            }
            fetch('http://localhost:8080/api/usuarios/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }).then(response => response.json())
                .then(json => console.log(json))
                .catch(error => console.error('Erro:', error));
            fecharModal(modal)
            abrirModal(document.querySelector('#CadastroSucesso'))
        }
    })
}

function invalidateEmail (email) {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    return !regex.test(email)
}

function invalidarNome (nome) {
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    if (nome.trim() === "") {
        return true; 
    }

    return !regex.test(nome)
}

function handleLoginSubmit() {
    if (!loginForm || !invalido[0]) return;
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        invalido[0].textContent = '';
        
        const emailInput = document.getElementById('emailLogin');
        const senhaInput = document.getElementById('senhaLogin');

        if (!emailInput || invalidateEmail(emailInput.value)) {
            invalido[0].textContent = 'Preencha seu email'
            if (emailInput) emailInput.focus()
        } else if (!senhaInput || senhaInput.value == '') {
            invalido[0].textContent = 'Preencha sua senha'
            if (senhaInput) senhaInput.focus()
        } else {
            let dados = {
                "email": emailInput.value,
                "senha": senhaInput.value
            }

            fetch('http://https://obracerta-api.onrender.com/api/usuarios/login', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
                .then(resposta => {
                    if (resposta.ok) {
                        return resposta.text()
                    }
                    return resposta.text().then(erroBody => {
                        throw new Error(erroBody);
                    })
                })
                .then(() => {
                    window.location.href = "pages/home.html"
                })
                .catch(() => {
                    invalido[0].textContent = 'Email ou senha invalidos'
                })
        }
    });
}

export function setupForms() {
    mudarPassword()
    handleCadastroSubmit();
    handleLoginSubmit();
}