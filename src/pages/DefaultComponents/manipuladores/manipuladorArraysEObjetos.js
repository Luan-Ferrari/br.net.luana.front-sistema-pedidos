
export function selectAllCheckbox(estaSelecionado, seletor) {

    let checkboxes = document.querySelectorAll(seletor);
    let quantidadeCheckboxes = checkboxes.length;

    if (estaSelecionado) {
        for (let i = 0; i < quantidadeCheckboxes; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (let i = 0; i < quantidadeCheckboxes; i++) {
            checkboxes[i].checked = false;
        }
    }
}

export function limparCheckboxesSelecionados() {
    let checkboxSelectAll = document.getElementsByClassName('listagem-itens-checkbox-select_all');
    for (let i = 0; i < checkboxSelectAll.length; i++) {
        checkboxSelectAll[i].checked = false;
    }
    selectAllCheckbox(checkboxSelectAll.checked, '.listagem-itens tbody .container-checkbox input');
}

export function criarListaItensSelecionados(lista, seletor) {
    let checkboxes = document.querySelectorAll(seletor);
    let quantidadeCheckboxes = checkboxes.length;

    let listaSelecionados = []

    for (let i = 0; i < quantidadeCheckboxes; i++) {
        if (checkboxes[i].checked) {
            listaSelecionados.push(lista[i])
        }
    }

    return listaSelecionados;
}

export function marcarCheckboxesByIds(listaSelecionados, seletor) {

    let checkboxes = document.querySelectorAll(seletor);
    let quantidadeSelecionados = listaSelecionados.length;
    let quantidadeCheckboxes = checkboxes.length;

    for (let i = 0; i < quantidadeSelecionados; i++) {
        for (let j = 0; j < quantidadeCheckboxes; j++) {
            if (listaSelecionados[i].id == checkboxes[j].value) {
                checkboxes[j].checked = true;
            }
        }
    }
}

export function marcarBooleanButon(textoOpcaoUm, textoOpcaoDois, opcaoMarcada) {
    let inputUm = document.getElementById(textoOpcaoUm);
    let inputDois = document.getElementById(textoOpcaoDois);

    if (opcaoMarcada == textoOpcaoUm && inputUm != null) {
        inputUm.checked = true;
    } else if (opcaoMarcada == textoOpcaoDois && inputDois != null) {
        inputDois.checked = true;
    }
}

export function atualizadorDePrecos(valorOriginal, tipoCorrecao, valorCorrecao, valorArredondamento) {

    let valorAtualizado = valorOriginal;

    if (tipoCorrecao == 'Valor Único') {
        valorAtualizado = valorCorrecao;
    } else if (tipoCorrecao == 'Valor Fixo') {
        valorAtualizado += parseFloat(valorCorrecao);
    } else if (tipoCorrecao == 'Porcentagem') {
        valorAtualizado += (valorOriginal * (valorCorrecao / 100));
    }

    if (valorArredondamento != null) {
        return igualarCasasDecimais(valorAtualizado, valorArredondamento);
    } else {
        return valorAtualizado;
    }
}

export function igualarCasasDecimais(valor, valorArredondamento) {

    let valorInteiro = Math.trunc(valor);
    valor = valor.toLocaleString('en-IN', { maximumFractionDigits: 2 });

    valorArredondamento = valorArredondamento / 100;

    let diferenca = Math.abs(valor - (valorInteiro + valorArredondamento))
        .toLocaleString('en-IN', { maximumFractionDigits: 2 });

    console.log("diferenca de " + valor + " e " + (valorInteiro + valorArredondamento) + " é " + diferenca)

    if (diferenca == 0) {
        return valor;
    } else if (diferenca <= 0.5) {
        return valorInteiro + valorArredondamento;
    } else if (diferenca > 0.5 && valorArredondamento >= diferenca) {
        return (valorInteiro - 1) + valorArredondamento;
    } else if (diferenca > 0.5 && valorArredondamento < diferenca) {
        return (valorInteiro + 1) + valorArredondamento;
    }
}

export function formatadorPreco(valor) {
    return (valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
}

export function ordenarPorCodigoProduto(objA, objB) {
    return objA.codigoProduto - objB.codigoProduto;
}







//DAQUI PARA BAIXO MANIPULADORES DA PRIMEIRA VERSÃO DO SISTEMA, GUARDEI O CÓDIGO PORQUE TALVEZ POSSAM VIR A SER ÚTEIS NO FUTURO
// export function changeCheckbox(e) {
//     if (e.target.checked === true) {
//         return true
//     } else {
//         return false
//     }
// }

// export function addOrRemoveValues(e, array) {
//     let arrayClone = Object.assign([], array);

//     if (arrayClone.includes(e.target.value)) {
//         arrayClone.splice(arrayClone.indexOf(e.target.value), 1)
//     }
//     if (e.target.checked) {
//         arrayClone.push(e.target.value)
//     }

//     arrayClone.sort(function (a, b) { return a - b })

//     return arrayClone;
// }

export function addOrRemoveObjects(item, array, propComparacao) {
    let arrayClone = Object.assign([], array);
    let tamanhoArray = array.length;
    let jaPossui = false;
    let possicaoItem = 0;

    for (let i = 0; i < tamanhoArray; i++) {
        if (array[i][propComparacao] == item[propComparacao]) {
            possicaoItem = i;
            jaPossui = true;
        }
    }

    if (jaPossui) {
        arrayClone.splice(possicaoItem, 1);
    } else {
        arrayClone.push(item)
    }

    return arrayClone;
}

// export function creatObjectById(idObject) {
//     return { id: idObject }
// }

// export function extractId(item) {
//     return item.id;
// }

// export function extractIdsFromObjectsArray(array) {
//     return array.map(a => extractId(a))
// }

// export function creatObjectsArrayByIds(array) {
//     return array.map((a) => creatObjectById(a))
// }
