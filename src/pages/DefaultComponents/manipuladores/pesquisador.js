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

export function pesquisadorComplexo(listaCompleta, listaParametros) {
    let listaFiltrada = [];
    let chaves = Object.keys(listaParametros);
    let valores = Object.values(listaParametros);

    let quantidadeLista = listaCompleta.length;
    let quantidadeChaves = chaves.length;

    //console.log(chaves);
    //console.log(valores);

    for (let i = 0; i < quantidadeLista; i++) {

        //console.log(listaCompleta[i]);

        let apto = true;
        let j = 0;

        while (apto == true && j < quantidadeChaves) {

            let possuiSubatributoId = false;

            if (listaCompleta[i][chaves[j]].id !== undefined) {
                possuiSubatributoId = true;
            }

            if (possuiSubatributoId) {
                //console.log(listaCompleta[i][chaves[j]].id)
                //console.log(valores[j].id)
                if (listaCompleta[i][chaves[j]].id != null && valores[j].id != '' && valores[j].id != undefined) {
                    if (!(listaCompleta[i][chaves[j]].id.toString().toLowerCase() == (valores[j].id.toString().toLowerCase()))) {
                        apto = false;
                        //console.log('nao adicionou pelo id');
                    } else {
                        //console.log("adicionou pelo id");
                    }
                }
            } else {
                if (listaCompleta[i][chaves[j]] != null && valores[j] != undefined) {
                    //console.log(listaCompleta[i][chaves[j]])
                    //console.log(valores[j])
                    if (!(listaCompleta[i][chaves[j]].toString().toLowerCase().includes(valores[j].toString().toLowerCase()))) {
                        apto = false;
                        //console.log('nao adicionou');
                    } else {
                        //console.log("adicionou");
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

//*****ATENÇÃO ATENÇÃO ATENÇÃO
//FAZER O MÉTODO DE FILTRAGEM CRIAR DUAS LISTAS, SENDO UMA LISTAFILTRADA, E UMA LISTADESCARTES.
//ESSE METODO DEVE ANALIZAR A LISTAFILTRADA E TAMBÉM A LISTA DE DESCARTES, MAS CADA
//FONTE DE PARAMETROS PARA O FILTRO VAI SE COMPORTAR DE FORMAS DIFERENTES,
//POR EXEMPLO, O FILTRO POR BOTOES, SE FOR O PRIMEIRO CLIQUE VAI BUSCAR NA LISTA DE DESCARTES E JOGAR NA FILTRADA, SE FOR O SEGUNDO CLIQUE FAZ AO CONTRÁRIO
//O FILTRO POR CÓDIGO SOMENTE BUSCA NA FILTRADA, POREM DEVE TRABALHAR COM OUTRA LISTA FILTRADA 'FIXA" CRIADA PELOS BOTOES CASO TENHAM SIDO CLICADOS,
//ISSO PORQUE ELE NÃO PODE ALTERAR A LISTAFILTRADA DIRETAMENTE, PORQUE SE NÃO QUANDO APARGAR UMA PARTE DO CODIGO PESQUISADO NÃO VAI MAIS SER POSSÍVEL ENCONTRÁ-LO
//ACREDITO QUE QUEM DEVE DITAR SEJAM OS BOTOES, CRIANDO UMA "LISTA FILTRADA MESTRE" E NESSA LISTA SERÃO PESQUISADOS CODIGOS OU DESCRIÇÕES, OU ENTÃO FILTRADOS POR
//ADULTO / INFANTIL / CONJUNTO / COLEÇÃO.
//SE ALGUMA PESQUISA POR CÓDIGO / DESCRIÇÃO FOR FEITA SEM USAR OS BOTOES PRIMEIROS, ENTÃO IRÁ PESQUISAR NA LISTA COMPLETA.
//SE ALGUM FILTRO ADULTO / INFANTIL / CONJUNTO / COLECAO FOR ACIONADO SEM USAR OS BOTÕES, ENTÃO IRÁ PESQUISAR NA LISTA COMPLETA.
//A HIERARQUIA SERÁ -> BOTOES >>> FILTROS >>> INPUTS, ISSO PARA PODER CRIAR UMA LÓGICA PARA A LISTA DE PREÇOS AUTOMATIZADA.
