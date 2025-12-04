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

// ... (seu código existente de mudança de select continua acima) ...

// 1. Configurar o evento de clique no botão Calcular
document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btnCalcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", enviarCalculo);
    }
});

async function enviarCalculo() {
    // A. Capturar os valores dos inputs
    const superficieEl = document.getElementById('superficie');
    const materialEl = document.getElementById('material');
    const alturaEl = document.getElementById('altura');
    const larguraEl = document.getElementById('largura');

    // Validação básica
    if (!superficieEl.value || !materialEl.value || !alturaEl.value || !larguraEl.value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // B. Definir o ID do Projeto
    // IMPORTANTE: Como estamos testando, vamos "chumbar" o ID 1.
    // Em produção, você pegaria isso da URL (ex: ?id=1) ou do localStorage.
    const projetoId = 1; 

    // C. Montar o Objeto JSON (Igual ao do Thunder Client)
    const dadosCalculo = {
        projetoId: projetoId,
        superficie: superficieEl.value,
        material: materialEl.value,
        altura: parseFloat(alturaEl.value), // Converter texto para número decimal
        largura: parseFloat(larguraEl.value)
    };

    try {
        // D. Enviar para o Back-end (Fetch API)
        const response = await fetch('http://localhost:8080/api/calculadora', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCalculo)
        });

        // E. Verificar se deu certo
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        // F. Receber a resposta do Java
        const resultado = await response.json();
        
        // G. Mostrar na tela
        exibirResultado(resultado);

    } catch (error) {
        console.error('Erro:', error);
        alert("Erro ao calcular. Verifique se o Back-end está rodando e se o Projeto ID 1 existe.");
    }
}

function exibirResultado(data) {
    const divResultado = document.getElementById("resultadoCalculo");
    const msgEl = document.getElementById("msgResultado");
    const qtdEl = document.getElementById("qtdResultado");
    const unidadeEl = document.getElementById("unidadeResultado");
    const areaEl = document.getElementById("areaResultado");

    // Preencher os dados
    msgEl.innerText = data.mensagem || "Cálculo realizado com sucesso!";
    qtdEl.innerText = data.quantidadeNecessaria;
    unidadeEl.innerText = data.unidadeMedida;
    areaEl.innerText = data.areaTotal;

    // Mostrar a div
    divResultado.style.display = "block";
}