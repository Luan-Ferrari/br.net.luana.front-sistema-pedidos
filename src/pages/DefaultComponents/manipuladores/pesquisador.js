import { limparCheckboxesSelecionados, selectAllCheckbox } from "./manipuladorArraysEObjetos";


export function pesquisadorSimples(lista, atributo, parametro) {

    let listaAuxiliar = [];

    for (let i = 0; i < lista.length; i++) {
        if (lista[i][atributo] != null) {
            if (lista[i][atributo].toString().toLowerCase().includes(parametro.toString().toLowerCase())) {
                listaAuxiliar.push(lista[i]);
            }
        }
    }

    return listaAuxiliar;
}

export function pesquisadorSubAtributo(lista, atributo, subAtributo, parametro) {

    let listaAuxiliar = [];

    for (let i = 0; i < lista.length; i++) {
        if (lista[i][atributo][subAtributo] != null) {
            if (lista[i][atributo][subAtributo].toString().includes(parametro)) {
                listaAuxiliar.push(lista[i]);
            }
        }
    }

    return listaAuxiliar;
}


export function pesquisadorComplexo(listaCompleta, listaParametros) {

    let listaFiltrada = [];
    let chaves = Object.keys(listaParametros);
    let valores = Object.values(listaParametros);

    let quantidadeLista = listaCompleta.length;
    let quantidadeChaves = chaves.length;

    for (let i = 0; i < quantidadeLista; i++) {

        let apto = true;
        let j = 0;

        while (apto == true && j < quantidadeChaves) {

            //-------
            let valorDaPropriedadeEhNulo = (listaCompleta[i][chaves[j]] == null ? true : false)
            let valorDaPropriedadePossuiId = (valorDaPropriedadeEhNulo ? false : (listaCompleta[i][chaves[j]].id != undefined ? true : false))
            let valorDaPropriedadePossuiIdNulo = (valorDaPropriedadeEhNulo ? false : (listaCompleta[i][chaves[j]].id == null ? true : false))
            let valorDaPropriedadeEhArray = (valorDaPropriedadeEhNulo ? false : (Array.isArray(listaCompleta[i][chaves[j]])))
            let valorDoFiltroEhDefinido = (valores[j] != undefined ? true : false)
            let valorDoFiltroPossuiId = (valores[j].id != undefined ? true : false)
            let valorDoFiltroPossuiIdVazio = (valores[j].id == '' ? true : false)
            //-------

            if (!valorDaPropriedadeEhNulo && (valorDaPropriedadePossuiId || valorDaPropriedadeEhArray)) {

                if (valorDaPropriedadeEhArray && !valorDoFiltroPossuiIdVazio) {

                    apto = false;

                    let quantidadeItens = listaCompleta[i][chaves[j]].length;
                    let k = 0;

                    while (apto == false && k < quantidadeItens) {
                        if(listaCompleta[i][chaves[j]][k].id.toString().toLowerCase() == (valores[j].id.toString().toLowerCase())) {
                            apto = true;
                        }
                        k++;
                    }

                } else if (!valorDaPropriedadePossuiIdNulo && !valorDoFiltroPossuiIdVazio && valorDoFiltroPossuiId) {

                    if (!(listaCompleta[i][chaves[j]].id.toString().toLowerCase() == (valores[j].id.toString().toLowerCase()))) {
                        apto = false;
                    } 
                }

            } else {

                if (!valorDaPropriedadeEhNulo && valorDoFiltroEhDefinido) {
         
                    if (!(listaCompleta[i][chaves[j]].toString().toLowerCase().includes(valores[j].toString().toLowerCase()))) {
                        apto = false;
                    } 
                }
            }
            
            j++;
        }

        if (apto) {
            listaFiltrada.push(listaCompleta[i])
        }
    }

    limparCheckboxesSelecionados();

    return listaFiltrada;
}

