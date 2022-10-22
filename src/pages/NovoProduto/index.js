import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../DefaultComponents/janelas.css';
import '../DefaultComponents/boolean-button.css'
import '../DefaultComponents/checkbox-container.css'
import './styles.css';

// import { MdCheckBox } from 'react-icons/md'

import { createDefaultHeader } from '../DefaultComponents/header/header';

import api from '../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField } from '../DefaultComponents/form-fields/form-fields';

export default function NovoProduto() {

    const accessToken = localStorage.getItem('accessToken');

    const header = {
        headers: {
            Authorization: accessToken
        }
    }

    const [id, setId] = useState(null);
    const [codigoProduto, setCodigoProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [valorAtacado, setValorAtacado] = useState('');
    const [valorVarejo, setValorVarejo] = useState('');

    const [listaStatusProduto, setListaStatusProduto] = useState([]);
    const [statusProduto, setStatusProduto] = useState('');
    const [viewStatusProduto, setViewStatusProduto] = useState('');

    const [listaClasses, setListaClasses] = useState([]);
    const [classeProduto, setClasseProduto] = useState('');
    const [viewClasseProduto, setViewClasseProduto] = useState('');

    const [listaColecoes, setListaColecoes] = useState([]);
    const [colecoes, setColecoes] = useState([]);

    const [listaTamanhos, setListaTamanhos] = useState([]);
    const [tamanhosAceitos, setTamanhosAceitos] = useState([]);

    const navigate = useNavigate();

    const obj = new Object();

    async function loadClasses() {
        await api.get('/classeProduto', header)
            .then(response => {
                setListaClasses(response.data)
            })
    }

    async function loadColecoes() {
        await api.get('/colecao', header)
            .then(response => {
                setListaColecoes(response.data)
            })
    }

    async function loadStatusProduto() {
        await api.get('/enums/statusProduto', header)
            .then(response => {
                setListaStatusProduto(response.data)
            })
    }

    async function loadTamanhos() {
        await api.get('/enums/tamanho', header)
            .then(response => {
                setListaTamanhos(response.data)
            })
    }

    async function criarNovoProduto(e) {
        e.preventDefault();

        const data = {
            codigoProduto,
            descricao,
            conjunto,
            valorAtacado,
            valorVarejo,
            statusProduto,
            classeProduto,
            colecoes,
            tamanhosAceitos,
        }

        try {
            const response = await api.post('/produto', data, header)
            navigate('/produto')
        } catch (err) {
            for (const [erro, mensagem] of Object.entries(err.response.data)) {
                console.log(erro + ': ' + mensagem);
                alert(erro + ': ' + mensagem);
            }
        }
    }

    useEffect(() => {
        loadStatusProduto();
        loadTamanhos();
        loadClasses();
        loadColecoes();
    }, [])

    return (
        <div className='page-container'>
            <div className='conteudo'>

                {createDefaultHeader()}

                <div className="linha-navegacao">
                    <div>
                        <p>INÍCIO</p>
                        <p> &gt; </p>
                        <p>PRODUTO</p>
                        <p> &gt; </p>
                        <p>NOVO PRODUTO</p>
                    </div>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Novo Produto</p>
                    </div>

                    <div className="conteudo-janela-padrao">
                        <form onSubmit={criarNovoProduto}>
                            {/* <div id="codigo-produto">
                                <label htmlFor='codigo-produto'>Código do Produto</label>
                                <input
                                name="codigo-produto"
                                className="texto-tam-1"  
                                value={codigoProduto}
                                onChange={e => setCodigoProduto(e.target.value)}
                                />
                            </div> */}
                            {defaultField("codigo-produto", "Código do Produto", "texto-tam-1", codigoProduto, setCodigoProduto)}

                            {/* <div id="descricao-produto">
                                <label htmlFor='descricao-produto'>Descrição do Produto</label>
                                <input
                                name="descricao-produto"
                                className="texto-tam-3"  
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                />
                            </div> */}
                            {defaultField("descricao-produto", "Descrição do Produto", "texto-tam-3", descricao, setDescricao)}

                            {/* <div className="boolean-button-container" id="conjunto">
                                <label>Conjunto</label>
                                <div className="boolean-button">
                                    <input type="radio" id="opcao-um" name="conjunto" 
                                    onClick={e => setConjunto(true)}/>
                                    <label className="botao-um" htmlFor='opcao-um'>Sim</label>
                                </div>
                                <div className="boolean-button">
                                    <input type="radio" id="opcao-dois" name="conjunto" 
                                    onClick={e => setConjunto(false)}/>
                                    <label className="botao-dois" htmlFor='opcao-dois'>Não</label>
                                </div>
                            </div>    */}
                            {booleanButtonField("conjunto", "Conjunto", "Sim", "Não", setConjunto)}

                            {/* <div id="valor-atacado">
                                <label htmlFor="valor-atacado">Valor Atacado</label>
                                <input
                                name="valor-atacado"
                                className="texto-tam-1" 
                                value={valorAtacado}
                                onChange={e => setValorAtacado(e.target.value)} 
                                />
                            </div> */}
                            {defaultField("valor-atacado", "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado)}

                            {/* <div id="valor-varejo">
                                <label htmlFor="valor-varejo">Valor Varejo</label>
                                <input
                                name="valor-varejo"
                                className="texto-tam-1" 
                                value={valorVarejo}
                                onChange={e => setValorVarejo(e.target.value)} 
                                />
                            </div> */}
                            {defaultField("valor-varejo", "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo)}

                            {/* <div id="classe-produto">
                                <label htmlFor="classe-produto">Classe do Produto</label>
                                <select
                                    name="classe-produto"
                                    value={viewClasseProduto}
                                    onChange={e => {
                                        setClasseProduto({ id: e.target.value })
                                        setViewClasseProduto(e.target.value)
                                    }}>
                                    <option value="">Selecione uma Classe</option>
                                    {listaClasses.map((a, b) => (
                                        <option value={a.id}>{a.nomeClasse}</option>
                                    ))}
                                </select>
                            </div> */}
                            {selectField("classe-produto", "Classe do Produto", "Selecione uma Classe", setClasseProduto, 
                                "id", setViewClasseProduto, viewClasseProduto, listaClasses, "nomeClasse")}

                            {/* <div id="status-produto">
                                <label htmlFor="status-produto">Status do Produto</label>
                                <select
                                    name="status-produto"
                                    value={viewStatusProduto}
                                    onChange={e => {
                                        setStatusProduto({ id: e.target.value })
                                        setViewStatusProduto(e.target.value)
                                    }}>
                                    <option value="">Selecione um Status</option>
                                    {listaStatusProduto.map((a, b) => (
                                        <option value={a.id}>{a.descricao}</option>
                                    ))}
                                </select>
                            </div> */}
                            {selectField("status-produto", "Status do Produto", "Selecione um Status", setStatusProduto, 
                                "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao")}

                            {/* <div id="colecoes">
                                <label htmlFor="colecoes">Coleções</label>
                                <div className="tabela-opcoes" name="colecoes">
                                    {listaColecoes.map((a, b) => (
                                        <div>
                                            <label className="container-checkbox">{a.nomeColecao}
                                                <input
                                                    type="checkbox"
                                                    name={a.nomeColecao}
                                                    value={a.id}
                                                    onClick={e => {
                                                        setColecoes(creatObjectsArrayByIds(
                                                            addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                                    }} />
                                                <span className="span-checkbox"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes, 
                                colecoes, "nomeColecao")}

                            {/* <div id="tamanhos">
                                <label htmlFor="tamanhos">Tamanhos</label>
                                <div id="tabela-tamanhos" className="tabela-opcoes" name="tamanhos">
                                    {listaTamanhos.map((a, b) => (
                                        <div>
                                            <label className="container-checkbox">{a.descricao}
                                                <input
                                                    className="tamanho_checkbox"
                                                    type="checkbox"
                                                    name={a.descricao}
                                                    value={a.id}
                                                    onClick={e => {
                                                        setTamanhosAceitos(creatObjectsArrayByIds(
                                                            addOrRemoveItens(e, extractIdsFromObjectsArray(tamanhosAceitos))));
                                                    }} />
                                                <span className="span-checkbox"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            {checkboxListField("tamanhos", "Tamanhos", setTamanhosAceitos, "id", listaTamanhos, 
                                tamanhosAceitos, "descricao")}

                            <div id="botao-submit">
                                <button type="submit">Adicionar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}