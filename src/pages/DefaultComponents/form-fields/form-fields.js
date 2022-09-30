import { useMatch } from "react-router-dom"

export function defaultField(identificador, texto, classe, value, setter) {
    return ( 
        <div id={identificador}>
            <label htmlFor={identificador}>{texto}</label>
            <input
            name={identificador}
            className={classe}  
            value={value}
            onChange={e => setter(e.target.value)}
            />
        </div>
    )
}

export function booleanButtonField(identificador, texto, textoOpcaoUm, textoOpcaoDois, setter) {
    return (
        <div className="boolean-button-container" id={identificador}>
            <label>{texto}</label>
            <div className="boolean-button">
                <input type="radio" id="opcao-um" name={identificador} 
                onClick={e => setter(true)}/>
                <label className="botao-um" htmlFor='opcao-um'>{textoOpcaoUm}</label>
            </div>
            <div className="boolean-button">
                <input type="radio" id="opcao-dois" name={identificador} 
                onClick={e => setter(false)}/>
                <label className="botao-dois" htmlFor='opcao-dois'>{textoOpcaoDois}</label>
            </div>
        </div>  
    )
}