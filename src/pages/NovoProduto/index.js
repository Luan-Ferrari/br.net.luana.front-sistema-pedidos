import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../DefaultComponents/janelas.css';
import '../DefaultComponents/sim-ou-nao-button.css'
import '../DefaultComponents/tabelas.css'
import './styles.css';

// import { MdCheckBox } from 'react-icons/md'

import { creatObjectsArrayByIds, addOrRemoveItens, extractIdsFromObjectsArray } from '../DefaultComponents/manipuladores/manipuladorArraysEObjetos';
import { createDefaultHeader } from '../DefaultComponents/header/header';

import api from '../../services/api'

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

    async function loadClasses(){
        await api.get('/classeProduto', header)
            .then(response => {
                setListaClasses(response.data)
            }) 
    }

    async function loadColecoes(){
        await api.get('/colecao', header)
            .then(response => {
                setListaColecoes(response.data)
            }) 
    }

    async function loadStatusProduto(){
        await api.get('/enums/statusProduto', header)
            .then(response => {
                setListaStatusProduto(response.data)
            }) 
    }

    async function loadTamanhos(){
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
            const response = await api.post('/produto', data , header) 
            navigate('/books')
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
    },[])

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
                            <div id="codigo-produto">
                                <label htmlFor='codigo-produto'>Código do Produto</label>
                                <input
                                name="codigo-produto"
                                className="texto-tam-1"  
                                value={codigoProduto}
                                onChange={e => setCodigoProduto(e.target.value)}
                                />
                            </div>
                            
                            <div id="descricao-produto">
                                <label htmlFor='descricao-produto'>Descrição do Produto</label>
                                <input
                                name="descricao-produto"
                                className="texto-tam-3"  
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className="sim-ou-nao-container" id="conjunto">
                                <label>Conjunto</label>
                                <div className="sim-ou-nao">
                                    <input type="radio" id="radio-sim" name="conjunto" 
                                    onClick={e => setConjunto(true)}/>
                                    <label className="botao-sim" htmlFor='radio-sim'>Sim</label>
                                </div>
                                <div className="sim-ou-nao">
                                    <input type="radio" id="radio-nao" name="conjunto" 
                                    onClick={e => setConjunto(false)}/>
                                    <label id="botao-nao" className="botao-nao" htmlFor='radio-nao'>Não</label>
                                </div>
                            </div>                            

                            <div id="valor-atacado">
                                <label htmlFor="valor-atacado">Valor Atacado</label>
                                <input
                                name="valor-atacado"
                                className="texto-tam-1" 
                                value={valorAtacado}
                                onChange={e => setValorAtacado(e.target.value)} 
                                />
                            </div>

                            <div id="valor-varejo">
                                <label htmlFor="valor-varejo">Valor Varejo</label>
                                <input
                                name="valor-varejo"
                                className="texto-tam-1" 
                                value={valorVarejo}
                                onChange={e => setValorVarejo(e.target.value)} 
                                />
                            </div>

                            <div id="classe-produto">
                                <label htmlFor="classe-produto">Classe do Produto</label>
                                <select 
                                name="classe-produto"
                                value={viewClasseProduto} 
                                onChange={e => {setClasseProduto({id : e.target.value})
                                                setViewClasseProduto(e.target.value)}}
                                className="select-tam-2">
                                    <option value="">Selecione uma Classe</option>
                                    {listaClasses.map((a, b) => (
                                        <option value={a.id}>{a.nomeClasse}</option>
                                    ))}
                                </select>
                            </div>               

                            <div id="status-produto">
                                <label htmlFor="status-produto">Status do Produto</label>
                                <select 
                                name="status-produto"
                                value={viewStatusProduto} 
                                onChange={e => {setStatusProduto({id : e.target.value})
                                                setViewStatusProduto(e.target.value)}}
                                className="select-tam-2">
                                    <option value="">Selecione um Status</option>
                                    {listaStatusProduto.map((a, b) => (
                                        <option value={a.id}>{a.descricao}</option>
                                    ))}
                                </select>   
                            </div>                

                            <div id="colecoes">
                                <label htmlFor="colecoes">Coleções</label>
                                <div id="tabela-colecoes" className="tabela-opcoes" name="colecoes">
                                    {listaColecoes.map((a, b) => (
                                        <div>
                                            <label className="container-checkbox">{a.nomeColecao}
                                                <input 
                                                className="colecao_checkbox"
                                                type="checkbox" 
                                                name={a.nomeColecao} 
                                                value={a.id}
                                                onClick={e => {
                                                    setColecoes(creatObjectsArrayByIds (
                                                    addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                                }}/>
                                                <span className="span-checkbox"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div id="tamanhos">
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
                                                    setTamanhosAceitos(creatObjectsArrayByIds (
                                                    addOrRemoveItens(e, extractIdsFromObjectsArray(tamanhosAceitos))));
                                                }}/>
                                                <span className="span-checkbox"></span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="botao-submit">
                                <button className='button' type="submit">Adicionar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}