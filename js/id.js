// id.js - Versão Final e Simplificada

// 1. Tenta recuperar o ID de dois lugares: URL (prioridade) ou Memória do Navegador
const params = new URLSearchParams(window.location.search);
const idUrl = params.get('id');
const idStorage = localStorage.getItem('usuarioId');

// A variável exportada será o que encontrar (URL vence Storage se existir)
export let id = idUrl || idStorage;

// 2. Lógica de Segurança
// Verifica se estamos na página de login (index ou raiz) para não criar loop infinito
const path = window.location.pathname;
const estouNoLogin = path.endsWith('/') || path.includes('index.html') || path === '/';

// Se NÃO tem ID e NÃO estou no login -> Chuta para fora
if (!id && !estouNoLogin) {
    console.warn("Usuário não autenticado. Redirecionando para login...");
    window.location.href = "/"; // Ou "../index.html" dependendo da sua estrutura de pastas
}

// 3. Persistência
// Se o ID veio pela URL (ex: logo após o login), salva ele no Storage para o futuro
if (idUrl && idUrl !== "null") {
    localStorage.setItem('usuarioId', idUrl);
}

// Se o ID for inválido ("null"), limpa tudo
if (id === "null") {
    localStorage.removeItem('usuarioId');
    if (!estouNoLogin) window.location.href = "/";
}