const loginForm = document.querySelector('#loginForm');
const cadastroForm = document.querySelector('#cadastroForm')
const materialForm = document.querySelector('#materiaisForm')
let superficie = materialForm.querySelector('#superficie')
let material = materialForm.querySelector('#material')
let menu = document.querySelector('header span')
let navegacao = document.querySelector('header nav')
let lista = document.querySelectorAll('header li')
let header = document.querySelector('header')
let invalido = document.querySelectorAll('.invalido')
let opcaoMateriais = {
    "piso": ["Porcelanato","Cerâmica","Madeira","Cimento queimado","Vinílico"],
    "parede": ["Bloco cerâmico","Drywall","Gesso","Reboco","Tijolo"],
    "teto": ["Gesso","PVC","Madeira"],
    "reboco": ["Cimento","Cal","Areia"],
    "contrapiso": ["Cimento","Areia","Argamassa"],
    "laje": ["Concreto armado","Bloco de concreto","Pre-moldada"],
    "forro": ["Gesso","PVC","Isopor"]
}

superficie.addEventListener('change', () => {  
    if (material.hasChildNodes()) {
        let opcoesRemover = material.querySelectorAll('option')
        opcoesRemover.forEach(opcaoRemover => {
            opcaoRemover.remove()
        })
    }
    
    let materialEscolhido = opcaoMateriais[superficie.value]
    materialEscolhido.forEach(materialNovo => {
        let opcao = document.createElement('option')
        opcao.value = materialNovo
        opcao.innerText = materialNovo
        material.appendChild(opcao)
    })
})

cadastroForm.addEventListener('submit', (event) => {
    event.preventDefault()
    invalido[1].textContent = ''
    let inputsCadastro = cadastroForm.querySelectorAll('input')
    if (inputsCadastro[2].value != inputsCadastro[3].value) {
        inputsCadastro[2].focus()
        inputsCadastro[3].focus()
        invalido[1].textContent = 'As senhas não correspondem'
        return
    }
    
    inputsCadastro.forEach((input) => {
        if (input.value.trim() == '') {
            invalido[1].textContent = 'Preencha todos os campos' 
            return
        }
    })
    if (invalido[1].textContent == '') {
        const modal = event.target.closest('dialog');
        fecharModal(modal)
        abrirModal(document.querySelector('#CadastroSucesso'))
    }
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.getElementById('emailLogin').value == '') {
        invalido[0].textContent = 'Seu email está invalido'
        document.getElementById('emailLogin').focus()        
    } else if (document.getElementById('senhaLogin').value == '') {
        invalido[0].textContent = 'Sua senha está invalida'
        document.getElementById('senhaLogin').focus()
    } else {
        window.location.href = "dashboard.html"
    }
});

function fecharMenu() {
    if (window.innerWidth < 744) {
        navegacao.style.display = 'none'
    }
    document.querySelector('body').style.overflow = 'scroll'
    menu.textContent = 'menu'
}

menu.addEventListener('click', () => {
    header.classList.toggle('menu')

    if (header.classList.contains('menu')) {
        navegacao.style.display = 'flex'
        document.querySelector('body').style.overflow = 'hidden'
        menu.textContent = 'close'
    } else {
        fecharMenu()
    }
})

lista.forEach(e => { e.addEventListener('click', () => fecharMenu())})

function abrirModal(modal) {
    if (modal) modal.showModal();
}

function fecharModal(modal) {
    if (modal) modal.close();
}

document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = btn.getAttribute('data-modal-target');
        const targetModal = document.querySelector(`#${targetId}`);

        const modalAberto = e.target.closest('dialog');
        if (modalAberto) {
            fecharModal(modalAberto);
        }
        abrirModal(targetModal);
    });
});

document.querySelectorAll('dialog .material-symbols-outlined').forEach(span => {
    if (span.textContent.trim() === 'close') {
        span.addEventListener('click', (e) => {
            const modal = e.target.closest('dialog');
            fecharModal(modal);
        });
    }
});