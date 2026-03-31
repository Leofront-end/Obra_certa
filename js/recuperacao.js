
function goToStep(currentId, nextId, stepNumber) {
    document.getElementById(currentId).classList.add('hidden');
    
    document.getElementById(nextId).classList.remove('hidden');

    const steps = document.querySelectorAll('.progress-steps .step');
    steps.forEach((step, index) => {
        step.classList.remove('ativo');
        if (index < stepNumber - 1) {
            step.classList.add('ativo');
        }
    });
    
    if (steps[stepNumber - 1]) {
        steps[stepNumber - 1].classList.add('ativo');
    }
}

document.querySelector('#step-email form').onsubmit = (e) => {
    e.preventDefault(); 
    goToStep('step-email', 'step-escolha', 2);
};

document.querySelectorAll('.choice-button').forEach(button => {
    button.onclick = () => {
        goToStep('step-escolha', 'step-token', 3);
    };
});

document.querySelector('#step-token form').onsubmit = (e) => {
    e.preventDefault(); 
    goToStep('step-token', 'step-nova-senha', 4);
};

document.querySelector('#step-nova-senha form').onsubmit = (e) => {
    e.preventDefault(); 
    window.location.href = '../index.html'; 
};

document.querySelector('.button-back').onclick = () => {
    goToStep('step-escolha', 'step-email', 1);
};

function voltarParaLogin() {
    window.location.href = '../index.html'; 
}