import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
    BiMessageSquareAdd, BiMessageSquareCheck, BiMessageSquareDots,
    BiMessageSquareDetail, BiMessageSquareEdit, BiMessageSquareX, BiMessageSquareError
} from 'react-icons/bi';
import { IoMdAddCircleOutline } from 'react-icons/io';

import "../DefaultComponents/consultas.css";
import '../DefaultComponents/janelas.css';
import '../DefaultComponents/listagens.css';
import './styles.css';

import { createDefaultHeader } from '../DefaultComponents/header/header';

import { pesquisador, pesquisadorComplexo, pesquisadorFiltrosBotoes, pesquisadorSimples, pesquisadorString, pesquisadorSubAtributo } from '../DefaultComponents/manipuladores/pesquisador';

import api from '../../services/api';

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
    //Talves esses useStates para cada parametro não sejam necessários
    const [consultaCodigo, setConsultaCodigo] = useState('');
    const [consultaDescricao, setConsultaDescricao] = useState('');
    const [consultaClasse, setConsultaClasse] = useState('');
    // const [consultaAdulo, setConsultaAdulto] = useState('');
    // const [consultaStatus, setConsultaStatus] = useState("Ativo");
    // const [consultaConjunto, setConsultaConjunto] = useState('');
    // const [consultaColecao, setConsultaColecao] = useState('');

    //talvez a lista eu precise trocar por um array e não um obj
    let listaParametrosConsulta = {
        codigoProduto: consultaCodigo,
        descricao: consultaDescricao,
        classeProduto : {
            id: consultaClasse
        },
        // adulto: '',
        // status: 'Ativo',
        // conjunto: '',
        // colecao: ''
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

                            <div className='botoes-consultas'>
                                <label>Buscar por:</label>
                                <div>
                                    {classesProdutos.map((a, b) => (
                                        <div>
                                            <button className="botao-consulta"
                                                value={a.id}
                                                onClick={e => setConsultaClasse(e.target.value) }>
                                                {a.nomeClasse}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='filtros-consultas'>
                                <label>Filtros:</label>
                                <div className="radio-container" id="radio-1">
                                    <div>
                                        <label className="container-checkbox">Infantil
                                            <input
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => {
                                                    
                                                }}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Adulto
                                            <input
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => {
                                                    
                                                }}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Ambos
                                            <input
                                                checked
                                                type="radio"
                                                name="adulto-ou-infantil"
                                                onClick={e => {
                                                    
                                                }}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="radio-container" id="radio-2">
                                    <div>
                                        <label className="container-checkbox">Ativo
                                            <input
                                                checked
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => {
                                                    
                                                }}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Inativo
                                            <input
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => {
                                                    
                                                }}
                                            />
                                            <span className="span-checkbox"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="container-checkbox">Desenvolvimento
                                            <input
                                                type="radio"
                                                name="ativo-ou-inativo"
                                                onClick={e => {
                                                    
                                                }}
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
                                                value="true"
                                            // onClick={e => {
                                            //     setColecoes(creatObjectsArrayByIds(
                                            //         addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                            // }} 
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
                                            setViewColecao(e.target.value)
                                        }}
                                    >
                                        <option value=""></option>
                                        {colecoes.map((a, b) => (
                                            <option value={a.id}>{a.nomeColecao}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='espaco-botoes-acoes'>
                    <button>
                        <BiMessageSquareAdd className='icon' />
                        <span>Criar Produto</span>
                    </button>
                    <button>
                        <BiMessageSquareDots className='icon' />
                        <span>Alterar Relação</span>
                    </button>
                    <button>
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
                                        <th> </th>
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
                                                    <input type="checkbox" />
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
                                                <button type="button">
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