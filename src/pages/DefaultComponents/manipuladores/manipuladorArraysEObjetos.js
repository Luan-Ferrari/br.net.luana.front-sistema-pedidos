export function changeCheckbox(e) {
    if (e.target.checked === true) {
        return true
    } else {
        return false
    }
}

export function selectAllCheckbox(estaSelecionado) {

    let checkboxes = document.querySelectorAll('.listagem-itens tbody .container-checkbox input');
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
    selectAllCheckbox(checkboxSelectAll.checked);
}

export function criarListaItensSelecionados (lista) {
    let checkboxes = document.querySelectorAll('.listagem-itens tbody .container-checkbox input');
    let quantidadeCheckboxes = checkboxes.length;

    let listaSelecionados = []

    for(let i = 0; i < quantidadeCheckboxes; i++) {
        if(checkboxes[i].checked) {
            listaSelecionados.push(lista[i])
        }
    }

    console.log(listaSelecionados);
    
    return listaSelecionados;
}

export function addOrRemoveItens(e, array) {
    let arrayClone = Object.assign([], array);

    if (arrayClone.includes(e.target.value)) {
        arrayClone.splice(arrayClone.indexOf(e.target.value), 1)
    }
    if (e.target.checked) {
        arrayClone.push(e.target.value)
    }

    arrayClone.sort(function (a, b) { return a - b })

    return arrayClone;
}

export function creatObjectById(idObject) {
    return { id: idObject }
}

export function extractId(item) {
    return item.id;
}

export function extractIdsFromObjectsArray(array) {
    return array.map(a => extractId(a))
}

export function creatObjectsArrayByIds(array) {
    return array.map((a) => creatObjectById(a))
}