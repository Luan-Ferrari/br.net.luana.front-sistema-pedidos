import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import './styles.css';

import { createDefaultHeader } from '../../DefaultComponents/header/header';
import { atualizadorDePrecos, marcarBooleanButon, marcarCheckboxesByIds } from '../../DefaultComponents/manipuladores/manipuladorArraysEObjetos';

import api from '../../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField } from '../../DefaultComponents/fields/form-fields/form-fields';
import headerAuthorization from '../../DefaultComponents/authorization/authorization';

export default function AlterarProdutosSelecionados() {

    const [id, setId] = useState(null);

    const tiposAltecaoValores = ['Porcentagem', 'Valor Fixo', 'Valor Único']
    const [tipoAlteracao, setTipoAlteracao] = useState(null);
    const [tipoAlteracaoView, setTipoAlteracaoView] = useState(null);
    const [valorArredondar, setValorArredondar] = useState(null);
    const [valorAlteracao, setValorAlteracao] = useState(null);

    const [valorAtacado, setValorAtacado] = useState(null);

    const [valorVarejo, setValorVarejo] = useState(null);

    const listaStatusProduto = JSON.parse(sessionStorage.getItem('listaStatusProduto'));
    const [statusProduto, setStatusProduto] = useState(null);
    const [viewStatusProduto, setViewStatusProduto] = useState('');

    const listaClassesProdutos = JSON.parse(sessionStorage.getItem('listaClassesProdutos'));
    const [classeProduto, setClasseProduto] = useState(null);
    const [viewClasseProduto, setViewClasseProduto] = useState('');

    const listaColecoes = JSON.parse(sessionStorage.getItem('listaColecoes'));
    const [colecoes, setColecoes] = useState(null);

    const produtosParaAlterar = JSON.parse(sessionStorage.getItem('listaProdutosSelecionados'));

    const navigate = useNavigate();

    const obj = new Object();

    async function alterarProdutosSelecionados(e) {
        e.preventDefault();

        const data = []

        for (let produto of produtosParaAlterar) {
            produto.statusProduto = (
                statusProduto != null && statusProduto != 'Selecione' && statusProduto.id != '') ? statusProduto : produto.statusProduto
            produto.classeProduto = (
                classeProduto != null && classeProduto != 'Selecione' && classeProduto.id != '') ? classeProduto : produto.classeProduto
            produto.colecoes = (
                colecoes != null && colecoes.length != 0) ? colecoes : produto.colecoes

            if (tipoAlteracao != 'Selecione' && valorAlteracao != null && valorAlteracao != '') {
                produto.valorAtacado = atualizadorDePrecos(produto.valorAtacado, tipoAlteracao, valorAlteracao, valorArredondar)
                produto.valorVarejo = atualizadorDePrecos(produto.valorVarejo, tipoAlteracao, valorAlteracao, valorArredondar)
            }

            data.push(produto)
        }

        console.log(data);

        try {
            const response = await api.put('/produto/relacao', data, headerAuthorization())
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
                        <p>ALTERAR</p>
                        <p> &gt; </p>
                        <p>POR SELEÇÃO</p>
                    </div>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Alterar Produtos Selecionados</p>
                    </div>

                    <div className="conteudo-janela-padrao">
                        <form onSubmit={alterarProdutosSelecionados}>

                            <div className='container-alteracao-preco'>
                                <div id='tipoAlteracaoDePreco'>
                                    <label htmlFor='tipoAlteracaoDePreco'>Tipo de Alteração de Preço</label>
                                    <select
                                        name='tipoAlteracaoDePreco'
                                        value={tipoAlteracaoView}
                                        onChange={e => {
                                            setTipoAlteracao(e.target.value)
                                            setTipoAlteracaoView(e.target.value)
                                        }}>
                                        <option value="">Selecione</option>
                                        {tiposAltecaoValores.map((a) => (
                                            <option value={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>

                                <div id='alteracao' className='complementoAlteracaoPreco'>
                                    <label htmlFor='alteracao'>Valor a Alterar</label>
                                    <input
                                        name='alteracap'
                                        className="texto-tam-1"
                                        value={valorAlteracao}
                                        onChange={e => setValorAlteracao(e.target.value)}
                                    />
                                </div>

                                <div id='arredondar' className='complementoAlteracaoPreco'>
                                    <label htmlFor='arredondar'>Arredondar Para</label>
                                    <input
                                        name='arredondar'
                                        className="texto-tam-1"
                                        value={valorArredondar}
                                        onChange={e => setValorArredondar(e.target.value)}
                                    />
                                </div>
                            </div>

                            {selectField("classe-produto", "Classe do Produto", "Selecione", setClasseProduto,
                                "id", setViewClasseProduto, viewClasseProduto, listaClassesProdutos, "nomeClasse")}

                            {selectField("status-produto", "Status do Produto", "Selecione", setStatusProduto,
                                "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao")}

                            {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes, "nomeColecao")}

                            <div id="botao-submit">
                                <button type="submit">Alterar Seleção</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}