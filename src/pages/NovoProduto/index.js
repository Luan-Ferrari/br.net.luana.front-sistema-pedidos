import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

import { creatObjectsArrayByIds, changeCheckbox, addOrRemoveItens, extractIdsFromObjectsArray } from '../DefaultComponents/manipuladores/manipuladorArraysEObjetos';
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
            alert(data.classeProduto)
        }
    }

    useEffect(() => {
        loadStatusProduto();
        loadTamanhos();
        loadClasses();
        loadColecoes();
    },[])

    return (
        <div className='novo-produto-container'>
            <div className='conteudo'>

                {createDefaultHeader()}
        
                <form onSubmit={criarNovoProduto}>
                    <input  
                    placeholder="Codigo do Produto" 
                    value={codigoProduto}
                    onChange={e => setCodigoProduto(e.target.value)}
                    />

                    <input  
                    placeholder="Descricao do Produto" 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />

                    <input 
                    type="checkbox" 
                    name="conjunto" 
                    className="conjunto_checkbox" 
                    onClick={e => setConjunto(changeCheckbox(e))}
                    />
                    <label htmlFor="conjunto">Conjunto</label>

                    <input 
                    placeholder="Valor Atacado"
                    value={valorAtacado}
                    onChange={e => setValorAtacado(e.target.value)} 
                    />
                    <input 
                    placeholder="Valor Varejo"
                    value={valorVarejo}
                    onChange={e => setValorVarejo(e.target.value)} 
                    />

                    <select value={viewClasseProduto} onChange={e => {setClasseProduto({id : e.target.value})
                                                                        setViewClasseProduto(e.target.value)}}>
                        <option value="">Selecione uma Classe</option>
                        {listaClasses.map((a, b) => (
                            <option value={a.id}>{a.nomeClasse}</option>
                        ))}
                    </select>               

                    <select value={viewStatusProduto} onChange={e => {setStatusProduto({id : e.target.value})
                                                                        setViewStatusProduto(e.target.value)}}>
                        <option value="">Selecione um Status</option>
                        {listaStatusProduto.map((a, b) => (
                            <option value={a.id}>{a.descricao}</option>
                        ))}
                    </select>                   

                    <table>
                        <tbody>
                            {listaColecoes.map((a, b) => (
                                <tr>
                                    <td>
                                        <input 
                                        className="colecao_checkbox"
                                        type="checkbox" 
                                        name={a.nomeColecao} 
                                        value={a.id}
                                        onClick={e => {
                                            setColecoes(creatObjectsArrayByIds (
                                                addOrRemoveItens(e, extractIdsFromObjectsArray(colecoes))))
                                        }}/>
                                        <label htmlFor={a.nomeColecao}>{a.nomeColecao}</label>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            {listaTamanhos.map((a, b) => (
                                <tr>
                                    <td>
                                        <input 
                                        className="tamanho_checkbox"
                                        type="checkbox" 
                                        name={a.descricao} 
                                        value={a.id}
                                        onClick={e => {
                                            setTamanhosAceitos(creatObjectsArrayByIds (
                                                addOrRemoveItens(e, extractIdsFromObjectsArray(tamanhosAceitos))));
                                                console.log(tamanhosAceitos);
                                        }}/>
                                        <label htmlFor={a.descricao}>{a.descricao}</label>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                
                    <button className='button' type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}