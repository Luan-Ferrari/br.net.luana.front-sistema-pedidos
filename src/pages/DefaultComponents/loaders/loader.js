import api from '../../../services/api'
import headerAuthorization from '../authorization/authorization';


export async function carregarRecursosDaAPI() {
    await loadClasses();
    await loadColecoes();
    await loadStatusProduto();
    await loadTamanhos();
}

async function loadClasses() {
    await api.get('/classeProduto', headerAuthorization())
        .then(response => {
            sessionStorage.setItem('listaClassesProdutos', JSON.stringify(response.data));
        })
}

async function loadColecoes() {
    await api.get('/colecao', headerAuthorization())
        .then(response => {
            sessionStorage.setItem('listaColecoes', JSON.stringify(response.data));
        })
}

async function loadStatusProduto() {
    await api.get('/enums/statusProduto', headerAuthorization())
        .then(response => {
            sessionStorage.setItem('listaStatusProduto', JSON.stringify(response.data));
        })
}

async function loadTamanhos() {
    await api.get('/enums/tamanho', headerAuthorization())
        .then(response => {
            sessionStorage.setItem('listaTamanhos', JSON.stringify(response.data));
        })
}