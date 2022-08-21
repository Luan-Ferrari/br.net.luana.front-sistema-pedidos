export function changeCheckbox(e) {
    if(e.target.checked === true) {
        return true
    } else {
        return false
    }
    
}

export function addOrRemoveItens(e, array) {
    let arrayClone = Object.assign([], array);

    if (arrayClone.includes(e.target.value)) {
        arrayClone.splice(arrayClone.indexOf(e.target.value), 1)
    }
    if (e.target.checked) {
        arrayClone.push(e.target.value)
    }

    arrayClone.sort( function(a, b) { return a-b } )

    return arrayClone;
}

export function creatObjectById(idObject) {
    return { id : idObject }
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