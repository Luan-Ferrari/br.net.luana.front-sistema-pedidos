import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
    BiMessageSquareAdd, BiMessageSquareCheck, BiMessageSquareDots,
    BiMessageSquareDetail, BiMessageSquareEdit, BiMessageSquareX, BiMessageSquareError
} from 'react-icons/bi';

import "../../DefaultComponents/consultas.css";
import '../../DefaultComponents/janelas.css';
import './styles.css';
import '../../DefaultComponents/listagens.css';
import '../../DefaultComponents/modal.css';

import { createDefaultHeader } from '../../DefaultComponents/header/header';

import { pesquisadorComplexo, pesquisadorSimples } from '../../DefaultComponents/manipuladores/pesquisador';

import api from '../../../services/api';
import { criarListaItensSelecionados, formatadorPreco, selectAllCheckbox, ordenarPorCodigoProduto } from '../../DefaultComponents/manipuladores/manipuladorArraysEObjetos';
import { booleanSearchField, buttonSearchField, filtroSearchField, inputSearchField, selectSearchField } from '../../DefaultComponents/fields/search-fields/search-fields';
import { booleanButtonField, defaultField } from '../../DefaultComponents/fields/form-fields/form-fields';
import headerAuthorization from '../../DefaultComponents/authorization/authorization';
import { pdfListaPrecos, testeGeracaoPdf } from '../../DefaultComponents/pdf/geradorPdf';

export default function Produtos() {

    const [listaCompleta, setListaCompleta] = useState([]);

    const listaClassesProdutos = JSON.parse(sessionStorage.getItem('listaClassesProdutos'));
    const listaColecoes = JSON.parse(sessionStorage.getItem('listaColecoes'));

    const [viewColecao, setViewColecao] = useState([]);

    //GERACAO LISTA DE PRECOS
    const [tipoListaPrecos, setTipoListaPrecos] = useState([]);
    const [anoListaPrecos, setAnoListaPrecos] = useState(0);
    const [paginaInicialListaPrecos, setPaginaInicialListaPrecos] = useState(0);

    //FIM GERACAO LISTA DE PRECOS

    //DAQUI PRA BAIXO LÓGICA PARA CONSULTAS //
    const [consultaCodigo, setConsultaCodigo] = useState('');
    const [consultaDescricao, setConsultaDescricao] = useState('');
    const [consultaClasse, setConsultaClasse] = useState('');
    const [consultaAdulto, setConsultaAdulto] = useState('');
    const [consultaStatus, setConsultaStatus] = useState('1');
    const [consultaConjunto, setConsultaConjunto] = useState('');
    const [consultaColecao, setConsultaColecao] = useState('');

    let listaParametrosConsulta = {
        codigoProduto: consultaCodigo,
        descricao: consultaDescricao,
        classeProduto: {
            id: consultaClasse
        },
        adulto: consultaAdulto,
        statusProduto: {
            id: consultaStatus
        },
        conjunto: consultaConjunto,
        colecoes: {
            id: consultaColecao
        }

        //ATENÇÃO: ESSE OBJETO DE PARAMETROS DEVE TER SEUS ATRIBUTOS COM OS NOMES EXATAMENTE IGUAIS AOS NOMES DOS ATRIBUTOS RETORNADOS DA API
    };

    let listaFiltrada = pesquisadorComplexo(listaCompleta, listaParametrosConsulta).sort(ordenarPorCodigoProduto);
    //DAQUI PRA CIMA, LÓGICA PARA CONSULTAS //

    const navigate = useNavigate();

    async function loadProdutos() {
        await api.get('/produto', headerAuthorization())
            .then(response => {
                setListaCompleta(response.data)
            })
    }

    useEffect(() => {
        loadProdutos();
    }, [])


    return (
        <div className="page-container">
            <div className='conteudo'>

                {createDefaultHeader()}

                <div className="linha-navegacao">
                    <div>
                        <p>INÍCIO</p>
                        <p> &gt; </p>
                        <p>PRODUTO</p>
                    </div>
                </div>

                <div className='janela-padrao'>
                    <div className='barra-titulo-janela-padrao'>
                        <p>Consultas</p>
                    </div>
                    <div className="conteudo-janela-padrao">
                        <div className="consulta-container">
                            <div className='inputs-consultas'>

                                {inputSearchField("consulta-codigo", "Código:", setConsultaCodigo)}

                                {inputSearchField("consulta-descricao", "Descrição:", setConsultaDescricao)}

                            </div>

                            <div className='botoes-consultas-container'>
                                <label>Buscar por:</label>

                                {buttonSearchField(listaClassesProdutos, setConsultaClasse, "classes", "id", "nomeClasse")}

                            </div>

                            <div className='filtros-consultas'>
                                <label>Filtros:</label>

                                {filtroSearchField("tamanho", "adulto-ou-infantil", setConsultaAdulto, ["Ambos", "Adulto", "Infantil"], ['', true, false])}

                                {filtroSearchField("status", "ativo-ou-inativo", setConsultaStatus, ["Ativo", "Inativo", "Desenvolvimento"], ["1", "2", "3"])}

                                {booleanSearchField("conjunto", "Conjunto", setConsultaConjunto, true, '')}

                                {selectSearchField("colecao", "Coleção: ", "", setConsultaColecao, "id", setViewColecao, viewColecao, listaColecoes, "nomeColecao")}

                            </div>
                        </div>
                    </div>
                </div>

                <div className='espaco-botoes-acoes'>
                    <button
                        onClick={e => navigate('/produto/novo')}>
                        <BiMessageSquareAdd className='icon' />
                        <span>Criar Produto</span>
                    </button>

                    <button
                        onClick={e => {
                            navigate('/produto/alterar/relacao')
                        }}>
                        <BiMessageSquareDots className='icon' />
                        <span>Alterar Relação</span>
                    </button>

                    <button
                        onClick={e => {
                            sessionStorage.setItem(
                                'listaProdutosSelecionados',
                                JSON.stringify(
                                    criarListaItensSelecionados(listaFiltrada, '.listagem-itens tbody .container-checkbox input')
                                )
                            )
                            navigate('/produto/alterar/selecao')
                        }}>
                        <BiMessageSquareCheck className='icon' />
                        <span>Alterar Seleção</span>
                    </button>

                    {/* <button onClick={e => {
                        pdfListaPrecos(criarListaItensSelecionados(listaFiltrada, '.listagem-itens tbody .container-checkbox input'),
                            pesquisadorSimples(listaClassesProdutos, 'id', consultaClasse)[0].nomeClasse,
                            (consultaAdulto == '' ? "Todos os Tamanhos" : consultaAdulto == false ? "Infantil" : "Adulto"),
                            ("valor" + tipoListaPrecos))
                    }}>
                        <BiMessageSquareDetail className='icon' />
                        <span>Lista de Preços</span>
                    </button> */}

                    <button onClick={e => {
                        sessionStorage.setItem(
                            'listaProdutosSelecionados',
                            JSON.stringify(
                                criarListaItensSelecionados(listaFiltrada, '.listagem-itens tbody .container-checkbox input')
                            )
                        )
                    }}>
                        <BiMessageSquareDetail className='icon' />
                        <span>
                            <label class='botao-modal-listaPrecos' for="open-modal-listaPrecos">
                                Lista de Preços
                            </label>
                        </span>
                    </button>

                    <input class="modal-state" id="open-modal-listaPrecos" type="checkbox" />
                    <div class="modal">
                        <label class="modal__bg" for="open-modal-listaPrecos"></label>
                        <div class="modal__inner">
                            <label class="modal__close" for="open-modal-listaPrecos"></label>

                            <label class="modal-titulo">Configurações da Lista de Preços</label>

                            {defaultField("ano-lista-preco", "Ano Lista", "texto-tam-1", anoListaPrecos, setAnoListaPrecos)}

                            {defaultField("pagina-inicial-lista", "Página Inicial", "texto-tam-1", paginaInicialListaPrecos, setPaginaInicialListaPrecos)}

                            {booleanButtonField("tipo-lista-precos", "Tipo de Lista", "Atacado", "Varejo", setTipoListaPrecos, "Atacado", "Varejo")}

                            <button onClick={e => {
                                pdfListaPrecos(JSON.parse(sessionStorage.getItem('listaProdutosSelecionados')),
                                    pesquisadorSimples(listaClassesProdutos, 'id', consultaClasse)[0].nomeClasse,
                                    (consultaAdulto == '' ? "Todos os Tamanhos" : consultaAdulto == false ? "Infantil" : "Adulto"),
                                    ("valor" + tipoListaPrecos), anoListaPrecos, paginaInicialListaPrecos)
                            }}>
                                Gerar Lista</button>
                        </div>
                    </div>

                    <button>
                        <BiMessageSquareError className='icon' />
                        <span>Sem Função</span>
                    </button>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Produtos</p>
                    </div>

                    <div className="conteudo-janela-padrao">
                        <div className='listagem-itens'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <label className='container-checkbox'>
                                                <input type="checkbox"
                                                    className="listagem-itens-checkbox-select_all"
                                                    onChange={e => { selectAllCheckbox(e.target.checked, '.listagem-itens tbody .container-checkbox input') }}
                                                />
                                                <span className='span-checkbox'></span>
                                            </label>
                                        </th>
                                        <th>
                                            Código
                                            {/* <p onClick={listaFiltrada.sort(ordenarPorCodigo)}> &darr; </p> */}
                                        </th>
                                        <th>Descrição</th>
                                        <th>Tamanhos</th>
                                        <th>
                                            {/* <div className='radio-container' id={"radio-container-tipoListaPreco"}>
                                                <label className='container-checkbox'>
                                                    <input
                                                        type="radio"
                                                        name="tipoListaPreco"
                                                        onClick={e => setTipoListaPrecos("Atacado")}
                                                    />
                                                    <span className="span-checkbox"></span>
                                                </label>
                                            </div> */}
                                            Atacado
                                        </th>
                                        <th>
                                            {/* <div className='radio-container' id={"radio-container-tipoListaPreco"}>
                                                <label className='container-checkbox'>
                                                    <input
                                                        type="radio"
                                                        name="tipoListaPreco"
                                                        onClick={e => setTipoListaPrecos("Varejo")}
                                                    />
                                                    <span className="span-checkbox"></span>
                                                </label>
                                            </div> */}
                                            Varejo
                                        </th>
                                        <th>Classe</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaFiltrada.map((a) => (
                                        <tr>
                                            <td>
                                                <label className='container-checkbox'>
                                                    <input
                                                        type="checkbox"
                                                        name={a.codigoProduto}
                                                        value={a.codigoProduto}
                                                        className='checkbox-input-item'
                                                    />
                                                    <span className='span-checkbox'></span>
                                                </label>
                                            </td>
                                            <td>{a.codigoProduto}</td>
                                            <td>{a.descricao}</td>
                                            <td>{a.adulto == true ? "Adulto" : "Infantil"}</td>
                                            <td>{formatadorPreco(a.valorAtacado)}</td>
                                            <td>{formatadorPreco(a.valorVarejo)}</td>
                                            <td>{a.classeProduto.nomeClasse}</td>
                                            <td>
                                                <button type="button"
                                                    onClick={e => navigate("/produto/alterar/" + a.id)}>
                                                    <BiMessageSquareEdit />
                                                </button>
                                                <button type="button">
                                                    <BiMessageSquareX />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}