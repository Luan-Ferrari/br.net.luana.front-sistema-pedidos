import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import './styles.css';

import { createDefaultHeader } from '../../DefaultComponents/header/header';

import api from '../../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField } from '../../DefaultComponents/form-fields/form-fields';

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
            adulto,
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
                   
                            {defaultField("codigo-produto", "Código do Produto", "texto-tam-1", codigoProduto, setCodigoProduto)}

                            {defaultField("descricao-produto", "Descrição do Produto", "texto-tam-3", descricao, setDescricao)}

                            {booleanButtonField("conjunto", "Conjunto", "Sim", "Não", setConjunto)}

                            {booleanButtonField("adulto", "Adulto", "Adulto", "Infantil", setAdulto)}

                            {defaultField("valor-atacado", "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado)}

                            {defaultField("valor-varejo", "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo)}

                            {selectField("classe-produto", "Classe do Produto", "Selecione uma Classe", setClasseProduto, 
                                "id", setViewClasseProduto, viewClasseProduto, listaClasses, "nomeClasse")}

                            {selectField("status-produto", "Status do Produto", "Selecione um Status", setStatusProduto, 
                                "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao")}

                            {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes, "nomeColecao")}

                            {checkboxListField("tamanhos", "Tamanhos", setTamanhosAceitos, "id", listaTamanhos, "descricao")}

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