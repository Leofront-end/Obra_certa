const materialForm = document.querySelector('#materiaisForm');
const superficie = materialForm ? materialForm.querySelector('#superficie') : null;
const material = materialForm ? materialForm.querySelector('#material') : null;

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

try {
    document.addEventListener("DOMContentLoaded", () => {

        handleSuperficieChange()
    })
} catch (error) {
    
}

    




export function listaMaterial() {
    handleSuperficieChange();
}