export function buildData(date) {
    var diasSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    var diaSemana = date.getDay();
    var dia = dataComDoisDigitos(date.getDate());
    var mes = dataComDoisDigitos(date.getMonth() + 1);
    var ano = dataComDoisDigitos(date.getFullYear());
    var data = diasSemana[diaSemana] + ", " + dia + "/" + mes + "/" + ano;
    return data;
}

export function buildHorario(date) {
    var hora = dataComDoisDigitos(date.getHours());
    var minuto = dataComDoisDigitos(date.getMinutes());
    var segundo = dataComDoisDigitos(date.getSeconds());
    var horario = hora + ":" + minuto + ":" + segundo;

    return horario;
}

function dataComDoisDigitos(valor) {
    if(valor < 10) {
        return "0" + valor;
    } else {
        return valor;
    }
}

export function buildSaudacao() {
    var saudacao = "Olá, " + localStorage.usuario;
    return saudacao;
}