import { validadorCamposDeTexto }  from '../../validadores/validadores';


import { criarListaItensSelecionados, marcarCheckboxesByIds } from '../../manipuladores/manipuladorArraysEObjetos';


export function defaultField(identificador, labelText, classe, value, setter,
    validacoes = { obrigatorio: false, formato: false, minimo: 0, maximo: 999 }
) {
    return (
        <div id={identificador}>
            <label htmlFor={identificador}>{labelText}</label>
            <input
                name={identificador}
                className={classe}
                value={value}
                onChange={e => {
                    setter(e.target.value)
                }} 
                required={validacoes.obrigatorio}
                pattern={validacoes.formato}
                minLength={validacoes.minimo}
                maxLength={validacoes.maximo}             
            />
        </div>
    )
}

export function booleanButtonField(identificador, labelText, textoOpcaoUm, 
    textoOpcaoDois, setter, validacoes = {obrigatorio: false}, 
    valorOpcaoUm = true, valorOpcaoDois = false) {
    return (
        <div className="boolean-button-container" id={identificador}>
            <label>{labelText}</label>
            <div className="boolean-button">
                <input type="radio" id={textoOpcaoUm} name={identificador}
                    onClick={e => setter(valorOpcaoUm)} required={validacoes.obrigatorio} />
                <label className="botao-um" htmlFor={textoOpcaoUm}>{textoOpcaoUm}</label>
            </div>
            <div className="boolean-button">
                <input type="radio" id={textoOpcaoDois} name={identificador}
                    onClick={e => setter(valorOpcaoDois)} required={validacoes.obrigatorio}/>
                <label className="botao-dois" htmlFor={textoOpcaoDois}>{textoOpcaoDois}</label>
            </div>
        </div>
    )
}

//atributo
export function selectField(identificador, labelText, selectDefaultText, setter, atributoIdentificador,
    setterView, viewValue, listaOpcoes, atributoNome, validacoes = {obrigatorio: false}) {
    return (
        <div id={identificador}>
            <label htmlFor={identificador}>{labelText}</label>
            <select
                name={identificador}
                value={viewValue}
                onChange={e => {
                    setter({ [atributoIdentificador]: e.target.value })
                    setterView(e.target.value)
                }}
                required>
                <option value="">{selectDefaultText}</option>
                {listaOpcoes.map((a) => (
                    <option value={a[atributoIdentificador]}>{a[atributoNome]}</option>
                ))}
            </select>
        </div>
    )
    // atributoSetter é o nome do atributo que será usado para preencher o Json, pode ser id, descricao, 
    // codigo, etc. O atributoSetter também é usado no value dentro do map da lista de opções, porque 
    // estamos falando do mesmo atributo no backend

    // atributoItens é o valor que vai aparecer para o usuario no select, é preenchido com o nome do atributo 
    // que vem do backend que contem a informacao que queremos exibir ao usuario
}

export function checkboxListField(identificador, labelText, setter, atributoIdentificador, listaOpcoes, atributoNome) {
    return (
        <div id={identificador}>
            <label htmlFor={identificador}>{labelText}</label>
            <div className="checkbox-opcoes" name={identificador}>
                {listaOpcoes.map((a) => (
                    <div>
                        <label className="container-checkbox">{a[atributoNome]}
                            <input
                                type="checkbox"
                                name={a[atributoNome]}
                                value={a[atributoIdentificador]}
                                onClick={e => {
                                    setter(criarListaItensSelecionados(listaOpcoes, '#' + identificador + ' input'))
                                }} />
                            <span className="span-checkbox"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

