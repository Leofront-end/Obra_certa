import { abrirModal, fecharModal } from './script.js'; 

const loginForm = document.querySelector('#loginForm');
const cadastroForm = document.querySelector('#cadastroForm');
const invalido = document.querySelectorAll('.invalido');

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
        
        // let valorBotao = botaoCadastro[0].className == 'ativarBotao' ? "Trabalhador" : "Cliente";
        console.log(invalidarNome(inputsCadastro[0].value));
        console.log(inputsCadastro[0].value);
        
        
        
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
            invalido[0].textContent = 'Seu email está inválido'
            if (emailInput) emailInput.focus()
        } else if (!senhaInput || senhaInput.value == '') {
            invalido[0].textContent = 'Sua senha está inválida'
            if (senhaInput) senhaInput.focus()
        } else {
            window.location.href = "pages/home.html"
        }
    });
}

export function materiais() {
    handleSuperficieChange();
};

export function setupForms() {
    handleSuperficieChange();
    handleCadastroSubmit();
    handleLoginSubmit();
}