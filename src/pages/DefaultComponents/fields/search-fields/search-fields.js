export function inputSearchField(name, labelText, setter) {
    return (
        <div>
            <label htmlFor={name}>{labelText}</label>
            <input
                name={name}
                onChange={e => setter(e.target.value)}
            />
        </div>
    )
}

export function buttonSearchField(lista, setter, nome, atributoIdentificador, atributoNome,) {
    return (
        <div>
            {lista.map((a) => (
                <div className='botoes-consultas-seletor'>
                    <input
                        type="radio"
                        name='botoes-consultas-itens'
                        id={'radio-' + nome + a[atributoIdentificador]}
                        className='botoes-consultas-itens-radio'
                        value={a[atributoIdentificador]}
                        onClick={e => setter(e.target.value)}>
                    </input>
                    <label
                        htmlFor={'radio-' + nome + a[atributoIdentificador]}
                        className='botoes-consultas-itens-label'>
                        {a[atributoNome]}
                    </label>
                </div>
            ))}
        </div>
    )
}

export function filtroSearchField(nome, name, setter, listLabels, listValues) {

    return (

        <div className="radio-container" id={"radio-container-" + nome}>
            {listLabels.map((label, indice) => (
                <div>
                    <label className="container-checkbox">{label}
                        <input
                            type="radio"
                            name={name}
                            onClick={e => setter(listValues[indice])}
                        />
                        <span className="span-checkbox"></span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export function booleanSearchField(name, labelText, setter, valorVerdadeiro, valorFalso) {
    return (
        <div className="radio-container">
            <div>
                <label className="container-checkbox">{labelText}
                    <input
                        type="checkbox"
                        name={name}
                        onClick={e => setter(e.target.checked ? valorVerdadeiro : valorFalso)}
                    />
                    <span className="span-checkbox"></span>
                </label>
            </div>
        </div>
    )
}

export function selectSearchField(name, labelText, selectDefaultText, setter, atributoIdentificador,
    setterView, viewValue, listaOpcoes, atributoNome) {
    return (
        <div className='select-in-filter'>
            <label htmlFor={name}>{labelText} </label>
            <select
                name={name}
                value={viewValue}
                onChange={e => {
                    setter(e.target.value)
                    setterView(e.target.value)
                }}
            >
                <option value={selectDefaultText}></option>
                {listaOpcoes.map((a) => (
                    <option value={a[atributoIdentificador]}>{a[atributoNome]}</option>
                ))}
            </select>
        </div>
    )
}