
// --- Função Principal para Mudar de Etapa ---
// Recebe o ID da etapa atual e o ID da próxima etapa.
function goToStep(currentId, nextId, stepNumber) {
    // 1. Oculta a etapa atual, adicionando a classe 'hidden'.
    document.getElementById(currentId).classList.add('hidden');
    
    // 2. Mostra a próxima etapa, removendo a classe 'hidden'.
    document.getElementById(nextId).classList.remove('hidden');

    // 3. Atualiza os indicadores de progresso...
    const steps = document.querySelectorAll('.progress-steps .step');
    steps.forEach((step, index) => {
        step.classList.remove('ativo');
        if (index < stepNumber - 1) {
            step.classList.add('ativo');
        }
    });
    
    // Ativa o passo atual
    if (steps[stepNumber - 1]) {
        steps[stepNumber - 1].classList.add('ativo');
    }
}


// --- 1. EMAIL -> ESCOLHA DE ENVIO (Ao clicar em 'Continuar') ---
document.querySelector('#step-email form').onsubmit = (e) => {
    e.preventDefault(); 
    goToStep('step-email', 'step-escolha', 2);
};


// --- 2. ESCOLHA DE ENVIO -> TOKEN (Ao escolher 'E-mail' ou 'Telefone') ---
document.querySelectorAll('.choice-button').forEach(button => {
    button.onclick = () => {
        goToStep('step-escolha', 'step-token', 3);
    };
});


// --- 3. TOKEN -> NOVA SENHA (Ao clicar em 'Confirmar Código') ---
document.querySelector('#step-token form').onsubmit = (e) => {
    e.preventDefault(); 
    goToStep('step-token', 'step-nova-senha', 4);
};


// --- 4. NOVA SENHA -> LOGIN (Ao clicar em 'Redefinir Senha') ---
document.querySelector('#step-nova-senha form').onsubmit = (e) => {
    e.preventDefault(); 
    window.location.href = '../index.html'; 
};

// --- BOTÃO VOLTAR (Da Escolha para o Email) ---
document.querySelector('.button-back').onclick = () => {
    goToStep('step-escolha', 'step-email', 1);
};

// --- FUNÇÃO PARA REDIRECIONAR PARA A PÁGINA DE LOGIN/INICIAL ---
function voltarParaLogin() {
    // Redireciona o usuário para a página de login (index.html, ou o nome da sua página de login)
    window.location.href = '../index.html'; 
}


// --- BOTÃO VOLTAR (Da Escolha para o Email) ---
document.querySelector('.button-back').onclick = () => {
    goToStep('step-escolha', 'step-email', 1);
};