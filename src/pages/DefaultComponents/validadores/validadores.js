
// function retornaStatusInput(identificadorInput, booleanValido) {

//     return (
//         {
//             identificador: identificadorInput,
//             valido: booleanValido
//         }
//     )

// }

function inputComErro(element, identificador) {
    element.style.border = 'solid #dc1826'
    element.style.borderWidth = ' 3px 1px 3px 1px'
    element.prop("disabled", true)

    //return retornaStatusInput(identificador, false);
}

function inputOk(element, identificador) {
    element.style.border = 'solid 1px #DCDCE6'
    element.prop("disabled", false)

    //return retornaStatusInput(identificador, true);
}

function validaObrigatorio(obrigatorio, value) {
    if (obrigatorio) {
        if (value == '' || value == null || value.length == 0) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

function validaTamanho(minimo, maximo, value) {
    if (value.length < minimo || value.length > maximo) {
        return false
    } else {
        return true
    }
}

function validaFormato(formato, value) {
    if (formato != false) {
        let regex = new RegExp(formato);
        if (regex.test(value)) {
            return true;
        } else {
            return false;
        }
    } else {
        return true
    }
}


export function validadorCamposDeTexto(identificador, value, validacoes) {

    console.log("entrou no validador");

    let element = document.getElementById(identificador);

    console.log("identificador: " + identificador)
    console.log("value : " + value)
    console.log("element: ");
    console.log(element)

    if (element != null) {

        let input = element.querySelector("input");

        //aqui começam as validacoes do value, começa pelo validaObrigatorio e abaixo é feita
        //uma verificacao se o value continua valido, para só então ser feita a próxima validação,
        //caso o value seja falso, as validaçõe seguintes nem serão feitas
        let valido = validaObrigatorio(validacoes.obrigatorio, value);
        valido ? valido = validaTamanho(validacoes.minimo, validacoes.maximo, value) : valido = false
        valido ? valido = validaFormato(validacoes.formato, value) : valido = false

        if (valido) {
            return inputOk(input, identificador);
        } else {
            return inputComErro(input, identificador);
        }
    }

}

