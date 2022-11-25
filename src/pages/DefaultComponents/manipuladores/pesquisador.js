import { type } from "@testing-library/user-event/dist/type";

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

// export function pesquisadorComplexo(listaCompleta, listaParametros) {
//     let listaFiltrada = [];
//     let chaves = Object.keys(listaParametros);
//     let valores = Object.values(listaParametros);

//     let quantidadeLista = listaCompleta.length;
//     let quantidadeChaves = chaves.length;

//     //console.log(chaves);
//     //console.log(valores);

//     for (let i = 0; i < quantidadeLista; i++) {

//         console.log(listaCompleta[i]);

//         let apto = true;
//         let j = 0;

//         while (apto == true && j < quantidadeChaves) {

//             //-------
//             let valorDaPropriedadeEhNulo = (listaCompleta[i][chaves[j]] == null ? true : false)
//             let valorDaPropriedadePossuiId = (listaCompleta[i][chaves[j]].id != undefined ? true : false)
//             let valorDaPropriedadePossuiIdNulo = (listaCompleta[i][chaves[j]].id == null ? true : false)
//             let valorDaPropriedadeEhArray = (Array.isArray(listaCompleta[i][chaves[j]]))
//             let valorDoFiltroPossuiId = (valores[j].id != undefined ? true : false)
//             let valorDoFiltroPossuiIdVazio = (valores[j].id == '' ? true : false)

//             //-------
//             let possuiSubatributoId = false;

//             if (!(listaCompleta[i][chaves[j]] == null) && listaCompleta[i][chaves[j]].id != undefined) {
//                 possuiSubatributoId = true;
//             }

//             if (possuiSubatributoId) {
//                 //console.log(listaCompleta[i][chaves[j]].id)
//                 //console.log(valores[j].id)
//                 if (listaCompleta[i][chaves[j]].id !== null && valores[j].id != '' && valores[j].id != undefined) {
//                     if (!(listaCompleta[i][chaves[j]].id.toString().toLowerCase() == (valores[j].id.toString().toLowerCase()))) {
//                         apto = false;
//                         console.log('nao adicionou pelo id');
//                     } else {
//                         console.log("adicionou pelo id");
//                     }
//                 }
//             } else {
//                 if (listaCompleta[i][chaves[j]] != null && valores[j] != undefined) {
//                     //console.log(listaCompleta[i][chaves[j]])
//                     //console.log(valores[j])
//                     if (!(listaCompleta[i][chaves[j]].toString().toLowerCase().includes(valores[j].toString().toLowerCase()))) {
//                         apto = false;
//                         console.log('nao adicionou');
//                     } else {
//                         console.log("adicionou");
//                     }
//                 }
//             }
            
//             j++;
//         }

//         if (apto) {
//             listaFiltrada.push(listaCompleta[i])
//         }
//     }

//     return listaFiltrada;
// }

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

    return listaFiltrada;
}

