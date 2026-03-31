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

        if (!inputs[4].checked) {
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
            fetch('https://obracerta-api.onrender.com/api/usuarios/cadastro', {
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


function handleLoginSubmit() {
    if (!loginForm || !invalido[0]) return;
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        invalido[0].textContent = '';
        
        const emailInput = document.getElementById('emailLogin');
        const senhaInput = document.getElementById('senhaLogin');

        if (!emailInput || invalidateEmail(emailInput.value)) {
            invalido.textContent = 'Preencha seu email';
            if (emailInput) emailInput.focus();
            return;
        }
        if (!senhaInput || senhaInput.value === '') {
            invalido.textContent = 'Preencha sua senha';
            senhaInput.focus();
            return;
        }


        fetch('https://obracerta-api.onrender.com/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: emailInput.value, senha: senhaInput.value })
        })
        .then(resposta => {
            if (resposta.ok) return resposta.text();
            return resposta.text().then(msg => { throw new Error(msg); });
        })
        .then(dado => {
            const resultado = JSON.parse(dado);
            if (!resultado.id) throw new Error('ID do usuário veio vazio');
            localStorage.setItem('usuarioId', resultado.id);
            window.location.href = `pages/home.html?id=${resultado.id}`;
        })
        .catch(erro => {
            invalido.textContent = 'Falha: ' + erro.message;
        });
    });
}

function invalidateEmail(email) {
    return !/^[^\s]+@[^\s]+\.[^\s]+$/.test(email);
}

function invalidarNome(nome) {
    if (nome.trim() === '') return true;
    return !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(nome);
}

export function setupForms() {
    const loginForm = document.querySelector('#loginForm');
    const cadastroForm = document.querySelector('#cadastroForm');
    if (!loginForm || !cadastroForm) return;

    const invalidos = document.querySelectorAll('.invalido');

    mudarPassword(loginForm, cadastroForm);
    handleCadastroSubmit(cadastroForm, invalidos[1]);
    handleLoginSubmit(loginForm, invalidos[0]);
}