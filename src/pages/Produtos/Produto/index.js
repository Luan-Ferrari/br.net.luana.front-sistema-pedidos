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

import { createDefaultHeader } from '../../DefaultComponents/header/header';

import { pesquisadorComplexo } from '../../DefaultComponents/manipuladores/pesquisador';

import api from '../../../services/api';
import { criarListaItensSelecionados, selectAllCheckbox } from '../../DefaultComponents/manipuladores/manipuladorArraysEObjetos';
import AlterarProduto from '../AlterarProduto';

export default function Produtos() {

    const accessToken = localStorage.getItem('accessToken');

    const header = {
        headers: {
            Authorization: accessToken
        }
    }

    const [listaCompleta, setListaCompleta] = useState([]);

    const [classesProdutos, setClassesProdutos] = useState([]);
    const [colecoes, setColecoes] = useState([]);
    const [viewColecao, setViewColecao] = useState([]);

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

    let listaFiltrada = pesquisadorComplexo(listaCompleta, listaParametrosConsulta);
    //DAQUI PRA CIMA, LÓGICA PARA CONSULTAS //

    const navigate = useNavigate();

    async function loadProdutos() {
        await api.get('/produto', header)
            .then(response => {
                setListaCompleta(response.data)
            })
    }

    async function loadClassesProdutos() {
        await api.get('/classeProduto', header)
            .then(response => {
                setClassesProdutos(response.data)
            })
    }

    async function loadColecoes() {
        await api.get('/colecao', header)
            .then(response => {
                setColecoes(response.data)
            })
    }


    useEffect(() => {
        loadProdutos();
        loadClassesProdutos();
        loadColecoes();
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
                                <div>
                                    <label htmlFor="consulta-codigo">Código:</label>
                                    <input
                                        name="consulta-codigo"
                                        value={consultaCodigo}
                                        onChange={e => setConsultaCodigo(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="consulta-descricao">Descricao:</label>
                                    <input
                                        name="consulta-descricao"
                                        onChange={e => setConsultaDescricao(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='botoes-consultas-container'>
                                <label>Buscar por:</label>
                                <div>
                                    {classesProdutos.map((a) => (
                                        <div className='botoes-consultas-seletor'>
                                            <input
                                                type="radio"
                                                name='botoes-consultas-itens'
                                                id={'radio-classes' + a.id}
                                                className='botoes-consultas-itens-radio'
                                                value={a.id}
                                                onClick={e => setConsultaClasse(e.target.value)}>
                                            </input>
                                            <label
                                                htmlFor={'radio-classes' + a.id}
                                                className='botoes-consultas-itens-label'>
                                                {a.nomeClasse}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='filtros-consultas'>
                                <label>Filtros:</label>
                                <div className="radio-container" id="radio-container-tamanho">
                                    <div>
                                        <label className="container-checkbox">Ambos
                                            <input
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => setConsultaAdulto('')}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Adulto
                                            <input
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => setConsultaAdulto(true)}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Infantil
                                            <input
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => setConsultaAdulto(false)}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="radio-container" id="radio-container-status">
                                    {
                                        //Ativo = id:1
                                        //Inativo = id:2
                                        //Desenvolvimento = id:3
                                    }
                                    <div>
                                        <label className="container-checkbox">Ativo
                                            <input
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => setConsultaStatus('1')}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Inativo
                                            <input
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => setConsultaStatus('2')}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Desenvolvimento
                                            <input
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => setConsultaStatus('3')}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="radio-container">
                                    <div>
                                        <label className="container-checkbox">Conjunto
                                            <input
                                                type="checkbox"
                                                name="conjunto"
                                                onClick={e => setConsultaConjunto(e.target.checked ? true : '')}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className='select-in-filter'>
                                    <label htmlFor="colecao">Coleção: </label>
                                    <select
                                        name="colecao"
                                        value={viewColecao}
                                        onChange={e => {
                                            console.log(e.target.value)
                                            setConsultaColecao(e.target.value)
                                            setViewColecao(e.target.value)
                                        }}
                                    >
                                        <option value=""></option>
                                        {colecoes.map((a) => (
                                            <option value={a.id}>{a.nomeColecao}</option>
                                        ))}
                                    </select>
                                </div>

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
                    <button>
                        <BiMessageSquareDots className='icon' />
                        <span>Alterar Relação</span>
                    </button>
                    <button
                        onClick={e => criarListaItensSelecionados(listaFiltrada, '.listagem-itens tbody .container-checkbox input')}>
                        <BiMessageSquareCheck className='icon' />
                        <span>Alterar Seleção</span>
                    </button>
                    <button>
                        <BiMessageSquareDetail className='icon' />
                        <span>Relatório</span>
                    </button>
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
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Tamanhos</th>
                                        <th>Atacado</th>
                                        <th>Varejo</th>
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
                                            <td>{a.valorAtacado}</td>
                                            <td>{a.valorVarejo}</td>
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