import { jsPDF } from "jspdf"
import { formatadorPreco } from "../manipuladores/manipuladorArraysEObjetos"

function tabelaListradaComLinhas(doc, numeroItem, posicaoHorizontalLinhas, espacamento, linhasAOcupar = 1) {

    if (numeroItem % 2 == 0) {
        doc.setFillColor(255, 255, 255);
    } else {
        doc.setFillColor(230, 230, 230);
    }
    doc.rect(9, (posicaoHorizontalLinhas - espacamento), 191, (espacamento * linhasAOcupar), "F");

    doc.setLineWidth(0.5);
    doc.line(9, (posicaoHorizontalLinhas - 0.2), 200, (posicaoHorizontalLinhas - 0.2));

}

function montarCabecalhoENumerarPaginaListaPrecos(doc, titulo, tamanho, precos, ano, pagina = 0) {

    doc.setFont("times", "bolditalic")
    doc.setFontSize(26)
    doc.text('Confecções Luana', 105, 20, null, null, "center")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.text((titulo + " - " + tamanho + " - " + (precos == 'valorAtacado' ? 'Atacado' : 'Varejo') + ((ano == 0 || ano == '') ? '' : ' - ' + ano)).toString().toUpperCase(),
        105, 40, null, null, "center")

    if (pagina != 0) {
        doc.setFont("times", "italic")
        doc.setFontSize(11)
        doc.text(("pág. " + pagina).toString(), 200, 281, null, null, "right")
    }
    //a posicao 281 na vertical veio do calculo da posicaoInicialTexto (50) somada ao produto da
    //quantidade de itens por pagina(33) e o espacamento (7)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(13)
    //esse doc.setFont aqui de cima serve para que as linhas seguintes da página tenham essa fonte

}


export function pdfListaPrecos(lista, titulo, tamanho = "Ambos Tamanhos", precos, ano = 0, paginaInicial = 0, posicaoHorizontalTexto = 50, espacamento = 7) {

    let doc = new jsPDF()

    let qtdeItens = lista.length;
    let posicaoHorizontalLinhas = posicaoHorizontalTexto + 2;

    let qtdeItensPorPagina = 33;

    let itemAtual = 1;

    let numeroPagina = paginaInicial;

    let linhasAOcupar = 1;

    montarCabecalhoENumerarPaginaListaPrecos(doc, titulo, tamanho, precos, ano, numeroPagina);

    for (let i = 0; i < qtdeItens; i++) {

        let comprimentoDescricao = lista[i].descricao.length;
        
        if (comprimentoDescricao < 60) {
            linhasAOcupar = 1
        } else {
            linhasAOcupar = Math.ceil(comprimentoDescricao / 60)
        }

        let posicaoAtualTexto = posicaoHorizontalTexto + ((itemAtual - 1) * espacamento);
        let posicaoAtualLinhas = posicaoHorizontalLinhas + ((itemAtual - 1) * espacamento * linhasAOcupar);
 continuar daqui logica para ver se a descricao esta muito comprida 
 e também ver que quando gerei lista de 1 ou de 2 produtos ele gera uma pagina extra desncessaria
        tabelaListradaComLinhas(doc, i, posicaoAtualLinhas, espacamento, linhasAOcupar);

        doc.text((lista[i].codigoProduto).toString(), 10, posicaoAtualTexto)
        doc.text((lista[i].descricao).toString(), 30, posicaoAtualTexto)
        doc.text(formatadorPreco(lista[i][precos]), 200, posicaoAtualTexto, null, null, 'right')

        itemAtual++;

        if (itemAtual > qtdeItensPorPagina || itemAtual > qtdeItens) {
            if (numeroPagina != 0) {
                numeroPagina++;
            }
            itemAtual = 1;
            qtdeItensPorPagina = 33;

            doc.addPage("a4", "portrait")
            montarCabecalhoENumerarPaginaListaPrecos(doc, titulo, tamanho, precos, ano, numeroPagina);
        }
    }
    doc.save((titulo + " - " + tamanho + " - " + (precos == 'valorAtacado' ? 'Atacado' : 'Varejo') + ((ano == 0 || ano == '') ? '' : ' - ' + ano) + '.pdf').toString())

}

