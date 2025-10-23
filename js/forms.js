import { abrirModal, fecharModal } from './script.js'; 

const loginForm = document.querySelector('#loginForm');
const cadastroForm = document.querySelector('#cadastroForm');
const materialForm = document.querySelector('#materiaisForm');
const superficie = materialForm ? materialForm.querySelector('#superficie') : null;
const material = materialForm ? materialForm.querySelector('#material') : null;
const invalido = document.querySelectorAll('.invalido');

const opcaoMateriais = {
    "piso": ["Porcelanato","Cerâmica","Madeira","Cimento queimado","Vinílico"],
    "parede": ["Bloco cerâmico","Drywall","Gesso","Reboco","Tijolo"],
    "teto": ["Gesso","PVC","Madeira"],
    "reboco": ["Cimento","Cal","Areia"],
    "contrapiso": ["Cimento","Areia","Argamassa"],
    "laje": ["Concreto armado","Bloco de concreto","Pre-moldada"],
    "forro": ["Gesso","PVC","Isopor"]
};

function handleSuperficieChange() {
    if (!superficie || !material) return;
    
    superficie.addEventListener('change', () => {  
        let opcoesRemover = material.querySelectorAll('option')
        opcoesRemover.forEach(opcaoRemover => {
            opcaoRemover.remove()
        })
        
        let materialEscolhido = opcaoMateriais[superficie.value] || []
        materialEscolhido.forEach(materialNovo => {
            let opcao = document.createElement('option')
            opcao.value = materialNovo
            opcao.innerText = materialNovo
            material.appendChild(opcao)
        })
    });
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
        
        let valorBotao = botaoCadastro[0].className == 'ativarBotao' ? "Trabalhador" : "Cliente";
        
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
        
        if (invalido[1].textContent == '') {
            const modal = event.target.closest('dialog');
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

        if (!emailInput || emailInput.value == '') {
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

export function setupForms() {
    handleSuperficieChange();
    handleCadastroSubmit();
    handleLoginSubmit();
}