export function pesquisador(lista, atributo, parametro) {
    var listaAuxiliar = [];
    for (var i = 0; i < lista.length; i++) {
        if (lista[i][atributo] != null) {
            if (lista[i][atributo].toString().includes(parametro)) {
                listaAuxiliar.push(lista[i]);
            }
        }
    }
    return listaAuxiliar;
}