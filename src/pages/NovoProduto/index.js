import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

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
    const [tamanhosAceitos, setTamanhosAceitos] = useState('');



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
                conjunto,
                valorAtacado,
                valorVarejo,
                statusProduto,
                classeProduto,
                colecoes,
                tamanhosAceitos : [], 
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

    function changeCheckbox(e) {
        if(e.target.checked === true) {
            return true
        } else {
            return false
        }
        
    }

    function addOrRemoveItens(e, array) {
        let arrayClone = Object.assign([], array);

        if (arrayClone.includes(e.target.value)) {
            arrayClone.splice(arrayClone.indexOf(e.target.value), 1)
        }
        if (e.target.checked) {
            arrayClone.push(e.target.value)
        }

        arrayClone.sort( function(a, b) { return a-b } )

        return arrayClone;
    }

    function creatObjectById(idObject) {
        return { id : idObject }
    }

    function extractId(item) {
        return item.id;
    }

    function extractIdsFromObjectsArray(array) {
        return array.map(a => extractId(a))
    }

    function creatObjectsArrayByIds(array) {
        return array.map((a) => creatObjectById(a))
    }
    
    return (
        <div className='novo-produto-container'>
            <div className='conteudo'>
                <section className='form'>
                    <img src={logoImage} alt="Logo Confecções Luana"/>
                    <h1>Adicionar Novo Produto</h1>
                    <p>Entre com as infomações do produto e clique 'Adicionar'</p>
                    <Link className='back-link' to="/books">
                        <FiArrowLeft size={16} color="#251fc5"/>
                    </Link>
                </section>
                <form onSubmit={criarNovoProduto}>
                    <input  
                    placeholder="Codigo do Produto" 
                    value={codigoProduto}
                    onChange={e => setCodigoProduto(e.target.value)}
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

                    <select value={viewStatusProduto} onChange={e => {setStatusProduto({codigo : e.target.value})
                                                                        setViewStatusProduto(e.target.value)}}>
                        <option value="">Selecione um Status</option>
                        {listaStatusProduto.map((a, b) => (
                            <option value={a.codigo}>{a.descricao}</option>
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
                
                    <input  
                    placeholder="Tamanhos Aceitos" 
                    value={tamanhosAceitos}
                    onChange={e => setTamanhosAceitos(e.target.value)} 
                    />
                    <button className='button' type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}