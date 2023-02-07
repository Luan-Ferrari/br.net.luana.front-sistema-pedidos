import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import './styles.css';

import { createDefaultHeader } from '../../DefaultComponents/header/header';

import api from '../../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField } from '../../DefaultComponents/fields/form-fields/form-fields';

import headerAuthorization from '../../DefaultComponents/authorization/authorization';


export default function NovoProduto() {


    const [id, setId] = useState(null);
    const [codigoProduto, setCodigoProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [conjunto, setConjunto] = useState('');
    const [adulto, setAdulto] = useState('');
    const [valorAtacado, setValorAtacado] = useState('');
    const [valorVarejo, setValorVarejo] = useState('');

    const listaStatusProduto = JSON.parse(sessionStorage.getItem('listaStatusProduto'));
    const [statusProduto, setStatusProduto] = useState('');
    const [viewStatusProduto, setViewStatusProduto] = useState('');

    const listaClassesProdutos = JSON.parse(sessionStorage.getItem('listaClassesProdutos'));
    const [classeProduto, setClasseProduto] = useState('');
    const [viewClasseProduto, setViewClasseProduto] = useState('');

    const listaColecoes = JSON.parse(sessionStorage.getItem('listaColecoes'));
    const [colecoes, setColecoes] = useState([]);

    const listaTamanhos = JSON.parse(sessionStorage.getItem('listaTamanhos'))
    const [tamanhosAceitos, setTamanhosAceitos] = useState([]);

    const [formularioValido, setFormularioValido] = useState(false);

    const [listaCamposValidados, setListaCamposValidados] = useState([]);

    const [forcarReRenderizacao, setForcarReRenderizacao] = useState(0);

    const navigate = useNavigate();

    const obj = new Object(); //usado ali no trtamento de erro

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
            const response = await api.post('/produto', data, headerAuthorization())
            navigate('/produto')
        } catch (err) {
            for (const [erro, mensagem] of Object.entries(err.response.data)) {
                console.log(erro + ': ' + mensagem);
                alert(erro + ': ' + mensagem);
            }
        }
    }

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
                        <form id='form-novo-produto' onSubmit={ criarNovoProduto }>
                   
                            {defaultField("codigo-produto", "Código do Produto", "texto-tam-1", codigoProduto, setCodigoProduto, {obrigatorio : true})}
                            
                            {defaultField("descricao-produto", "Descrição do Produto", "texto-tam-3", descricao, setDescricao, {obrigatorio: true})}

                            {booleanButtonField("conjunto", "Conjunto", "Sim", "Não", setConjunto, {obrigatorio: true})}

                            {booleanButtonField("adulto", "Adulto", "Adulto", "Infantil", setAdulto, {obrigatorio: true})}

                            {defaultField("valor-atacado", "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado, {obrigatorio : true, formato : "^[0-9]+[.][0-9]{2}$"})}
                          
                            {defaultField("valor-varejo", "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo, {obrigatorio : true, formato : "^[0-9]+[.][0-9]{2}$"})}

                            {selectField("status-produto", "Status do Produto", "Selecione um Status", setStatusProduto, 
                                "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao", {obrigatorio : true})}

                            {selectField("classe-produto", "Classe do Produto", "Selecione uma Classe", setClasseProduto, 
                                "id", setViewClasseProduto, viewClasseProduto, listaClassesProdutos, "nomeClasse", {obrigatorio : true})}

                            {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes, "nomeColecao")}

                            {checkboxListField("tamanhos", "Tamanhos", setTamanhosAceitos, "id", listaTamanhos, "descricao")}

                            <div id="botao-submit">
                                <button type="submit">Adicionar</button>
                            </div>
                        </form>
                    </div>
                    {(forcarReRenderizacao == 0) ? setForcarReRenderizacao(1) : ''}
                </div>
            </div>
        </div>
    )
}