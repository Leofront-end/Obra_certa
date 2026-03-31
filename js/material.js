const materialForm = document.querySelector('#materiaisForm');
const superficie = materialForm ? materialForm.querySelector('#superficie') : null;
const material = materialForm ? materialForm.querySelector('#material') : null;

const opcaoMateriais = {
    "piso": ["Porcelanato","Cerâmica","Laminado ","Cimentício","Vinílico", "Emborrachado", "Pedras"],
    "parede": ["Bloco cerâmico","Drywall","Bloco de concreto","Tijolo ecológico","Tijolinho"],
    "revestimento": ["Textura","Textura Projetada","Monocapa", "Textura com rolo"],
    "reboco": ["Tradicional","Projetado","Monocapa"],
    "contrapiso": ["Cimento","Argamassa"],
    "laje": ["Concreto armado","Lajota","Pré-moldada (treliçada)"],
    "forro": ["Gesso","PVC","Isopor", "Metálico"]
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

try {
    document.addEventListener("DOMContentLoaded", () => {

        handleSuperficieChange()
    })
} catch (error) {
    
}

export function listaMaterial() {
    handleSuperficieChange();
}


document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btnCalcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", enviarCalculo);
    }
});

async function enviarCalculo() {
    const superficieEl = document.getElementById('superficie');
    const materialEl = document.getElementById('material');
    const alturaEl = document.getElementById('altura');
    const larguraEl = document.getElementById('largura');

    if (!superficieEl.value || !materialEl.value || !alturaEl.value || !larguraEl.value) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = urlParams.get('ProjetoId');

    if (!projetoId) {
        alert('Nenhum projeto selecionado. Volte e selecione um projeto.');
        return;
    }

    const dadosCalculo = {
        projetoId: Number(projetoId),
        superficie: superficieEl.value,
        material: materialEl.value,
        altura: parseFloat(alturaEl.value),
        largura: parseFloat(larguraEl.value)
    };

    try {
        const response = await fetch('https://obracerta-api.onrender.com/api/calculadora', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dadosCalculo)
        });

        if (!response.ok) throw new Error('Erro na requisição: ' + response.statusText);

        const resultado = await response.json();
        exibirResultado(resultado);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao calcular. Verifique sua conexão e tente novamente.');
    }
}

function exibirResultado(data) {
    const divResultado = document.getElementById("resultadoCalculo");
    const msgEl = document.getElementById("msgResultado");
    const qtdEl = document.getElementById("qtdResultado");
    const unidadeEl = document.getElementById("unidadeResultado");
    const areaEl = document.getElementById("areaResultado");

    msgEl.innerText = data.mensagem || "Cálculo realizado com sucesso!";
    qtdEl.innerText = data.quantidadeNecessaria;
    unidadeEl.innerText = data.unidadeMedida;
    areaEl.innerText = data.areaTotal;

    divResultado.style.display = "block";
}