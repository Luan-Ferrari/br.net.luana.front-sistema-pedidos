import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import '../../DefaultComponents/janelas.css';
import '../../DefaultComponents/boolean-button.css'
import '../../DefaultComponents/checkbox-container.css'
import './styles.css';

// import { MdCheckBox } from 'react-icons/md'

import { createDefaultHeader } from '../../DefaultComponents/header/header';
import { marcarBooleanButon, marcarCheckboxesByIds } from '../../DefaultComponents/manipuladores/manipuladorArraysEObjetos';

import api from '../../../services/api'
import { booleanButtonField, defaultField, selectField, checkboxListField, checkboxListFieldComPreSelecionados } from '../../DefaultComponents/fields/form-fields/form-fields';
import headerAuthorization from '../../DefaultComponents/authorization/authorization';

export default function AlterarProduto() {

    const { id_alterado } = useParams();

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


    const navigate = useNavigate();

    const obj = new Object();

    async function loadItemASerAlterado() {
        await api.get('/produto/' + id_alterado, headerAuthorization())
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

                setViewStatusProduto(item.statusProduto.id);
                setViewClasseProduto(item.classeProduto.id);

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
            const response = await api.put('/produto/' + id, data, headerAuthorization())
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
                        <p>ALTERAR PRODUTO</p>
                    </div>
                </div>

                <div className="janela-padrao">
                    <div className="barra-titulo-janela-padrao">
                        <p>Alterar Produto</p>
                    </div>

                    <div className="conteudo-janela-padrao">
                        <form onSubmit={alterarProduto}>

                            {defaultField("codigo-produto", "Código do Produto", "texto-tam-1", codigoProduto, setCodigoProduto)}

                            {defaultField("descricao-produto", "Descrição do Produto", "texto-tam-3", descricao, setDescricao)}

                            {booleanButtonField("conjunto", "Conjunto", "Sim", "Não", setConjunto)}
                            {marcarBooleanButon('Sim', 'Não', (conjunto == true ? 'Sim' : 'Não'))}

                            {booleanButtonField("adulto", "Adulto", "Adulto", "Infantil", setAdulto)}
                            {marcarBooleanButon('Adulto', 'Infantil', (adulto == true ? 'Adulto' : 'Infantil'))}

                            {defaultField("valor-atacado", "Valor Atacado", "texto-tam-1", valorAtacado, setValorAtacado)}

                            {defaultField("valor-varejo", "Valor Varejo", "texto-tam-1", valorVarejo, setValorVarejo)}

                            {selectField("classe-produto", "Classe do Produto", "Selecione uma Classe", setClasseProduto,
                                "id", setViewClasseProduto, viewClasseProduto, listaClassesProdutos, "nomeClasse")}

                            {selectField("status-produto", "Status do Produto", "Selecione um Status", setStatusProduto,
                                "id", setViewStatusProduto, viewStatusProduto, listaStatusProduto, "descricao")}

                            {checkboxListField("colecoes", "Coleções", setColecoes, "id", listaColecoes, "nomeColecao")}
                            {marcarCheckboxesByIds(colecoes, '#colecoes input')}

                            {checkboxListField("tamanhos", "Tamanhos", setTamanhosAceitos, "id", listaTamanhos, "descricao")}
                            {marcarCheckboxesByIds(tamanhosAceitos, '#tamanhos input')}

                            <div id="botao-submit">
                                <button type="submit">Alterar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}