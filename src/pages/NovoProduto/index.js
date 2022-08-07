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
    const [statusProduto, setStatusProduto] = useState('');

    const [listaClasses, setListaClasses] = useState([]);
    const [classeProduto, setClasseProduto] = useState('');
    const [viewClasseProduto, setViewClasseProduto] = useState('');

    const [listaColecoes, setListaColecoes] = useState([]);
    const [colecoes, setColecoes] = useState([]);
    const colecoesSelecionadas = [];

    const [tamanhosAceitos, setTamanhosAceitos] = useState('');



    const navigate = useNavigate();

    async function loadClasses(){
        await api.get('/classeProduto', header)
            .then(response => {
                setListaClasses(response.data)
            }) 
    }

    function loadColecoes(){
        api.get('/colecao', header)
            .then(response => {
                setListaColecoes(response.data)
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
        loadClasses();
        loadColecoes();
    },[])

    function onSelect(e) {
        setClasseProduto({id : e.target.value});
        setViewClasseProduto(e.target.value);
    }

    function changeCheckbox(e) {
        return !!(e.target.value)
    }

    function newAddOrRemoveItens(e, array) {
        let arrayClone = Object.assign([], colecoes);

        if (arrayClone.includes(e.target.value)) {
            arrayClone.splice(arrayClone.indexOf(e.target.value), 1)
        }
        if (e.target.checked) {
            arrayClone.push(e.target.value)
        }

        arrayClone.sort( function(a, b) { return a-b } )
        
        console.log(arrayClone);

        return arrayClone;
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
                    className="inline checkbox" 
                    // id="checkbox1" 
                    value='false' 
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
                    <input 
                    placeholder="Status Produto"
                    value={statusProduto}
                    onChange={e => setStatusProduto(e.target.value)} 
                    />     

                    <select value={viewClasseProduto} onChange={e => {onSelect(e)}}>
                        <option value="">Selecione uma Classe</option>
                            {listaClasses.map((a, b) => (
                                <option value={a.id}>{a.nomeClasse}</option>
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
                                            setColecoes(newAddOrRemoveItens(e, colecoes));
                                            console.log(colecoes);
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