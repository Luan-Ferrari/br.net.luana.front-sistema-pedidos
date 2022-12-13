
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

export function criarListaItensSelecionados (lista, seletor) {
    let checkboxes = document.querySelectorAll(seletor);
    let quantidadeCheckboxes = checkboxes.length;

    let listaSelecionados = []

    for(let i = 0; i < quantidadeCheckboxes; i++) {
        if(checkboxes[i].checked) {
            listaSelecionados.push(lista[i])
        }
    }
    
    return listaSelecionados;
}

export function marcarCheckboxesByIds (listaSelecionados, seletor) {

    let checkboxes = document.querySelectorAll(seletor);
    let quantidadeSelecionados = listaSelecionados.length;
    let quantidadeCheckboxes = checkboxes.length;

    for(let i = 0; i < quantidadeSelecionados; i++) {
        for (let j = 0; j < quantidadeCheckboxes; j++) {
            if (listaSelecionados[i].id == checkboxes[j].value) {
                checkboxes[j].checked = true;
            } 
        }
    }
}

export function marcarBooleanButon ( textoOpcaoUm, textoOpcaoDois, opcaoMarcada) {
    let inputUm = document.getElementById(textoOpcaoUm);
    console.log(inputUm);
    let inputDois = document.getElementById(textoOpcaoDois);
    console.log(inputDois);

    if ( opcaoMarcada == textoOpcaoUm && inputUm != null) {
        inputUm.checked = true;
    } else if ( opcaoMarcada == textoOpcaoDois && inputDois != null) {
        inputDois.checked = true;
    }
}






//DAQUI PARA BAIXO MANIPULADORES DA PRIMEIRA VERSÃO DO SISTEMA, GUARDEI O CÓDIGO PORQUE TALVEZ POSSAM VIR A SER ÚTEIS NO FUTURO
// export function changeCheckbox(e) {
//     if (e.target.checked === true) {
//         return true
//     } else {
//         return false
//     }
// }

// export function addOrRemoveItens(e, array) {
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
