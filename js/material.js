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