import api from '../../../services/api'

const accessToken = localStorage.getItem('accessToken');

const header = {
    headers: {
        Authorization: accessToken
    }
}

export function carregarRecursosDaAPI() {
    loadClasses();
    loadColecoes();
    loadStatusProduto();
    loadTamanhos();
}

async function loadClasses() {
    await api.get('/classeProduto', header)
        .then(response => {
            sessionStorage.setItem('listaClassesProdutos', JSON.stringify(response.data));
        })
}

async function loadColecoes() {
    await api.get('/colecao', header)
        .then(response => {
            sessionStorage.setItem('listaColecoes', JSON.stringify(response.data));
        })
}

async function loadStatusProduto() {
    await api.get('/enums/statusProduto', header)
        .then(response => {
            sessionStorage.setItem('listaStatusProduto', JSON.stringify(response.data));
        })
}

async function loadTamanhos() {
    await api.get('/enums/tamanho', header)
        .then(response => {
            sessionStorage.setItem('listaTamanhos', JSON.stringify(response.data));
        })
}