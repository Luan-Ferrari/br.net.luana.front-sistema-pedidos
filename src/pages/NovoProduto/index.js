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

    async function loadColecoes(){
        await api.get('/colecao', header)
            .then(response => {
                setListaColecoes(response.data)
            }) 

        document.getElementById("opcoesColecoes").appendChild(listaOpcoesColecoes([listaColecoes
          ]));
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
                colecoes : [],
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

    function handleCheckboxes(id) {
        setListaColecoes(listaColecoes.map(listaColecoes => listaColecoes.id === id ? {...listaColecoes, checked: !listaColecoes.checked} : listaColecoes))
      }

    function onSelect(e) {
        setClasseProduto({id : e.target.value});
        setViewClasseProduto(e.target.value);
    }

    function changeCheckbox(e) {
        return !!(e.target.value)
    }

    function addColecaoSelecionada(e) {
        colecoesSelecionadas.append(e.target.value)

    }


    function listaOpcoesColecoes(conteudo) {
        var tabela = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody=document.createElement("tbody");
        var thd=function(i){return (i==0)?"th":"td";};
        for (var i=0;i<conteudo.length;i++) {
          var tr = document.createElement("tr");
          for(var o=0;o<conteudo[i].length;o++){
            var t = document.createElement(thd(i));
            var texto=document.createTextNode(conteudo[i][o]);
            t.appendChild(texto);
            tr.appendChild(t);
          }
          (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
        }
        tabela.appendChild(thead);
        tabela.appendChild(tbody);
        return tabela;
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
                    name="Conjunto" 
                    class="inline checkbox" 
                    id="checkbox1" 
                    value='false' 
                    onClick={e => setConjunto(changeCheckbox(e))}
                    />

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

                    <select value={colecoes} onChange={e => {setColecoes([{id : e.target.value}])}}>
                        <option value="">Selecione uma Colecao</option>
                            {listaColecoes.map((a, b) => (
                                <option value={a.id}>{a.nomeColecao}</option>
                            ))}
                    </select>   

                    <div id="opcoesColecoes"></div> 

                    {/* <div id="tamanhos">
                        Tamanhos
                                <script>
                        {listaColecoes.map((e) => (
                            <input type="checkbox" value="1">Ulala</input>
                        ))}
                        </script>
                    
                    </div>  */}

                



                    
                    {/* <input 
                    placeholder="Coleções"
                    value={colecoes}
                    onChange={e => setColecoes(e.target.value)} 
                    /> */}
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