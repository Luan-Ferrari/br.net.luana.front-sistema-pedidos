export function buildData(date) {
    let diasSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    let diaSemana = date.getDay();
    let dia = dataComDoisDigitos(date.getDate());
    let mes = dataComDoisDigitos(date.getMonth() + 1);
    let ano = dataComDoisDigitos(date.getFullYear());
    let data = diasSemana[diaSemana] + ", " + dia + "/" + mes + "/" + ano;
    return data;
}

export function buildHorario(date) {
    let hora = dataComDoisDigitos(date.getHours());
    let minuto = dataComDoisDigitos(date.getMinutes());
    let segundo = dataComDoisDigitos(date.getSeconds());
    let horario = hora + ":" + minuto + ":" + segundo;

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
    let saudacao = "Olá, " + localStorage.usuario;
    return saudacao;
}