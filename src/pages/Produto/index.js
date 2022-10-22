import React, { useState, useEffect } from 'react';
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

import { pesquisador } from '../DefaultComponents/manipuladores/pesquisador';

import api from '../../services/api';

export default function Produtos() {

    const accessToken = localStorage.getItem('accessToken');

    const header = {
        headers: {
            Authorization: accessToken
        }
    }

    const [listaCompleta, setListaCompleta] = useState([]);

    const [listaFiltrada, setListaFiltrada] = useState([]);

    const [parametrosConsulta, setParametrosConsulta] = useState([]);

    const [classesProdutos, setClassesProdutos] = useState([]);
    const [colecoes, setColecoes] = useState([]);
    const [viewColecao, setViewColecao] = useState([]);

    const navigate = useNavigate();

    async function loadProdutos() {
        await api.get('/produto', header)
            .then(response => {
                setListaCompleta(response.data)
                setListaFiltrada(response.data)
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
                setClassesProdutos(response.data)
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
                                        // className={classe}
                                        // value={value}
                                        onChange={e => setListaFiltrada(pesquisador(listaCompleta, 'codigoProduto', e.target.value))}
                                    //criar uma lista de parametros com objetos do tipo chave : valor, então iterar
                                    //a lista completa, iniciando pelo primeiro parametro selecionado
                                    //não sei se é uma boa opção, estou olhando o método filter(), talvez seja mais viável
                                    />
                                </div>

                                <div>
                                    <label htmlFor="consulta-descricao">Descricao:</label>
                                    <input
                                        name="consulta-descricao"
                                        // className={classe}
                                        // value={value}
                                        onChange={e => setListaFiltrada(pesquisador(listaCompleta, 'codigoProduto', e.target.value))}
                                    //criar uma lista de parametros com objetos do tipo chave : valor, então iterar
                                    //a lista completa, iniciando pelo primeiro parametro selecionado
                                    //não sei se é uma boa opção, estou olhando o método filter(), talvez seja mais viável
                                    />
                                </div>
                            </div>

                            <div className='botoes-consultas'>
                                <label>Buscar por:</label>
                                <div>
                                    {classesProdutos.map((a, b) => (
                                        <div>
                                            <button className="botao-consulta">{a.nomeClasse}
                                                {/* <input
                                                type="checkbox"
                                                // name={a[atributoNome]}
                                                // value={a[atributoIdentificador]}
                                                // onClick={e => {
                                                //     setter(creatObjectsArrayByIds(
                                                //         addOrRemoveItens(e, extractIdsFromObjectsArray(listaSelecionados))))
                                                // }} />
                                                /> */}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='filtros-consultas'>
                                <label>Filtros:</label>
                                <div>
                                    <label className="container-checkbox">Infantil
                                        <input
                                            type="checkbox"
                                            name="infantil"
                                            value="2"
                                        // onClick={e => {
                                        //     setColecoes(creatObjectsArrayByIds(
                                        //         addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                        // }} 
                                        />
                                        <span className="span-checkbox"></span>
                                    </label>
                                </div>
                                <div>
                                    <label className="container-checkbox">Adulto
                                        <input
                                            type="checkbox"
                                            name="adulto"
                                            value="1"
                                        // onClick={e => {
                                        //     setColecoes(creatObjectsArrayByIds(
                                        //         addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                        // }} 
                                        />
                                        <span className="span-checkbox"></span>
                                    </label>
                                </div>
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
                                <div className='select-in-filter'>
                                    <label htmlFor="colecao">Coleção: </label>
                                    <select
                                        name="colecao"
                                        value={viewColecao}
                                        onChange={e => {
                                            // setStatusProduto({ id: e.target.value })
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
                                                    <input type="checkbox"/>
                                                    <span className='span-checkbox'></span>
                                                </label>
                                            </td>
                                            <td>{a.codigoProduto}</td>
                                            <td>{a.descricao}</td>
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