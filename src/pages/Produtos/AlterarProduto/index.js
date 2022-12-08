import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import '../../DefaultComponents/modal.css'
import './styles.css';

// import { MdCheckBox } from 'react-icons/md'

import { createDefaultHeader } from '../../DefaultComponents/header/header';

import api from '../../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField } from '../../DefaultComponents/form-fields/form-fields';


//ATENCAO ATENCAO ATENCAO ATENCAO

//Testar primeiro o PUT metodo para uma única atualização, porque no back end da API já existe esse método


export default function AlterarProduto() {

    const accessToken = localStorage.getItem('accessToken');

    const header = {
        headers: {
            Authorization: accessToken
        }
    }

    const { id_alterado } = useParams();

    const [itemASerAlterado, setItemASerAlterado] = useState({});

    const [id, setId] = useState(null);
    const [codigoProduto, setCodigoProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [adulto, setAdulto] = useState('');
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

    async function loadItemASerAlterado() {
        await api.get('/produto/' + id_alterado, header)
            .then(response => {
                const item = response.data;
                setId(item.id);
                setCodigoProduto(item.codigoProduto);
                setDescricao(item.descricao);
                setConjunto(item.conjunto);
                setAdulto(item.adulto);
                setValorAtacado(item.valorAtacado);
                setValorVarejo(item.valorVarejo);
                setStatusProduto(item.statusProduto);
                setClasseProduto(item.classeProduto);
                setColecoes(item.colecoes);
                setTamanhosAceitos(item.tamanhosAceitos);

            })
    }

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

    async function alterarProduto(e) {
        e.preventDefault();

        const data = {
            id,
            codigoProduto,
            descricao,
            conjunto,
            valorAtacado,
            valorVarejo,
            statusProduto,
            adulto,
            classeProduto,
            colecoes,
            tamanhosAceitos,
        }

        try {
            const response = await api.put('/produto/' + id, data, header)
            navigate('/produto')
        } catch (err) {
            for (const [erro, mensagem] of Object.entries(err.response.data)) {
                console.log(erro + ': ' + mensagem);
                alert(erro + ': ' + mensagem);
            }
        }
    }

    useEffect(() => {
        loadItemASerAlterado();
        loadStatusProduto();
        loadTamanhos();
        loadClasses();
        loadColecoes();
    }, [])

    return (
        <div className='modal-container'>

            <div className="janela-padrao">
                <div className="barra-titulo-janela-padrao">
                    <p>Alterar Produto</p>
                </div>

                <div className="conteudo-janela-padrao">
                    <div>
                        Mostra na tela o {id_alterado}
                    </div>
                    <form onSubmit={alterarProduto}>
                        {console.log(codigoProduto)}
                        {console.log(itemASerAlterado)}
                        {console.log(itemASerAlterado.codigoProduto)}
                        {defaultField("codigo-produto", "Código do Produto", "texto-tam-1", codigoProduto, setCodigoProduto)}

                        {defaultField("descricao-produto", "Descrição do Produto", "texto-tam-3", descricao, setDescricao)}

                        {booleanButtonField("conjunto", "Conjunto", "Sim", "Não", setConjunto)}

                        {booleanButtonField("adulto", "Adulto", "Adulto", "Infantil", setAdulto)}

                        {defaultField("valor-atacado", "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado)}

                        {defaultField("valor-varejo", "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo)}

                        {selectField("classe-produto", "Classe do Produto", "Selecione uma Classe", setClasseProduto,
                            "id", setViewClasseProduto, viewClasseProduto, listaClasses, "nomeClasse")}

                        {// ATENÇÃO, ATENÇÃO, ATENÇÃO, ATENÇÃO
                        // REFATORAR O MÉTODO QUE VERIFICA OS CHECKBOX NO ARQUIVO MANIPULADOR ARRAY E OBJETOS.
                        // ACREDITO QUE A MELHOR OPCAO SEJA USAR O GETELEMENTSBYNAME E COLOCAR UM NOME ESPECIFICO EM CADA INPUT
                        // FAZENDO A VERIFICAÇÃO DE CHECKED EM CADA INPUT,
                        // TENTAR MANTER COM QUE A ORDENACAO CONTINUE SENDO POR ID, SOMENTE DOS SELECIONADOS, NO JSON CRIADO PARA O POST OU PUT DO PRODUTO
                        }
                        
                        {selectField("status-produto", "Status do Produto", "Selecione um Status", setStatusProduto,
                            "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao")}

                        {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes,
                            colecoes, "nomeColecao")}

                        {checkboxListField("tamanhos", "Tamanhos", setTamanhosAceitos, "id", listaTamanhos,
                            tamanhosAceitos, "descricao")}

                        <div id="botao-submit">
                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}