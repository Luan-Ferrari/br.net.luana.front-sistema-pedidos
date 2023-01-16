import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import '../../DefaultComponents/listagens.css'
import './styles.css';

import { createDefaultHeader } from '../../DefaultComponents/header/header';
import { formatadorPreco, addOrRemoveObjects } from '../../DefaultComponents/manipuladores/manipuladorArraysEObjetos';

import api from '../../../services/api'
import { defaultField } from '../../DefaultComponents/fields/form-fields/form-fields';
import headerAuthorization from '../../DefaultComponents/authorization/authorization';

export default function AlterarProdutosRelacionados() {

    const [id, setId] = useState(null);

    const [codigo, setCodigo] = useState("");
    const [valorVarejo, setValorVarejo] = useState("");
    const [valorAtacado, setValorAtacado] = useState("");

    const [relacao, setRelacao] = useState([]);


    let item = {
        id: id,
        codigoProduto: codigo,
        valorAtacado: valorAtacado,
        valorVarejo: valorVarejo
    }

    const navigate = useNavigate();

    const obj = new Object();

    async function alterarProdutosRelacionados(e) {
        e.preventDefault();

        const data = relacao

        console.log(data);

        try {
            const response = await api.put('/produto/lista/relacao', data, headerAuthorization())
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
                        <p>POR RELAÇÃO</p>
                    </div>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Alterar Produtos Relacionados</p>
                    </div>

                    <div className="conteudo-janela-padrao">


                        <div className='container-alteracao-preco-por-relacao' id='container-alteracao-preco-por-relacao'>

                            <div id="incluir-objeto-relacao">

                                {defaultField('codigo-relacao', "Código", "texto-tam-1", codigo, setCodigo)}

                                {defaultField('valor-atacado-relacao', "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado)}

                                {defaultField('valor-varejo-relacao', "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo)}

                                <div>
                                    <button onClick={e => {
                                        if (codigo != "" && (valorAtacado != "" || valorVarejo != "")) {
                                            setRelacao(addOrRemoveObjects(item, relacao, 'codigoProduto'));
                                            setCodigo('');
                                            setValorAtacado('');
                                            setValorVarejo('');
                                        }
                                    }}> Adicionar / <br></br>Excluir </button>
                                </div>
                            </div>
                        </div>


                        <form id='form-alterar-relacao' onSubmit={alterarProdutosRelacionados}>
                            <div className='listagem-itens'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Atacado</th>
                                            <th>Varejo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relacao.map((a) => (
                                            <tr>
                                                <td>{a.codigoProduto}</td>
                                                <td>{formatadorPreco(a.valorAtacado)}</td>
                                                <td>{formatadorPreco(a.valorVarejo)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div id="botao-submit">
                                <button type="submit">Alterar Relação</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}