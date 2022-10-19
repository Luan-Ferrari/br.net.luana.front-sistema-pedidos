import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import '../DefaultComponents/janelas.css';
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

    const navigate = useNavigate();

    async function loadProdutos() {
        await api.get('/produto', header)
            .then(response => {
                setListaCompleta(response.data)
                setListaFiltrada(response.data)
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
                    <div className='inputs-consultas'>
                        <div>
                            <label htmlFor="consulta-id">Código</label>
                            <input
                                name="consulta-id"
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

                    </div>
                    <div className='filtros-consultas'>

                    </div>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Produtos</p>
                    </div>


                    <div className="conteudo-janela-padrao">
                        <ul>
                            {listaFiltrada.map((a) => (
                                <li>
                                    <strong>Codigo:</strong>
                                    <p>{a.codigoProduto}</p>
                                    <strong>Descrição:</strong>
                                    <p>{a.descricao}</p>
                                    <strong>Preço Atacado:</strong>
                                    <p></p>
                                    <strong>Release Date:</strong>
                                    <p>12/07/2017</p>

                                    <button type="button">
                                        <FiEdit size={20} color="#251fc5" />
                                    </button>
                                    <button type="button">
                                        <FiTrash2 size={20} color="#251fc5" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}