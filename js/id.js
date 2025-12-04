const urlParametros = new URLSearchParams(window.location.search)
let idPessoa = urlParametros.get('id')
export let id = idPessoa

if (idPessoa == "null" || !id) {
    window.location.href = "/"
}

const nav = document.querySelector('header .container')
const botoes = document.querySelector('.buttons')
function AdicionarId(elemento) {
    elemento.addEventListener('click', (e) => {
        let link = e.target.closest('a')

        e.preventDefault()

        const urlAtual =  link.getAttribute('href')

        if (urlAtual && !urlAtual.includes('?id=')) {
            const novaUrl = `${urlAtual}?id=${id}`
            window.location.href = novaUrl
        } else {
            window.location.href = urlAtual
        }
    })
}
if (nav) AdicionarId(nav)
if (botoes) AdicionarId(botoes)