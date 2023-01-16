import { jsPDF } from "jspdf"
import { formatadorPreco } from "../manipuladores/manipuladorArraysEObjetos"

function tabelaListradaComLinhas(doc, numeroItem, posicaoHorizontalLinhas, espacamento) {

    if (numeroItem % 2 == 0) {
        doc.setFillColor(255, 255, 255);
    } else {
        doc.setFillColor(230, 230, 230);
    }
    doc.rect(9, (posicaoHorizontalLinhas - espacamento), 191, espacamento, "F");

    doc.setLineWidth(0.5);
    doc.line(9, (posicaoHorizontalLinhas - 0.2), 200, (posicaoHorizontalLinhas - 0.2));

}

export function pdfListaPrecos(lista, titulo, tamanho = "Ambos Tamanhos", precos, posicaoHorizontalTexto = 50, espacamento = 7) {

    let doc = new jsPDF()
    doc.setFont("times", "bolditalic")
    doc.setFontSize(26)
    doc.text('Confecções Luana', 105, 20, null, null, "center")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.text((titulo + " - " + tamanho + " - " + (precos == 'valorAtacado' ? 'Atacado' : 'Varejo')).toString().toUpperCase(),
        105, 40, null, null, "center")

    doc.setFont("helvetica", "normal")

    let qtdeItens = lista.length;
    let posicaoHorizontalLinhas = posicaoHorizontalTexto + 2;

    for (let i = 0; i < qtdeItens; i++) {

        tabelaListradaComLinhas(doc, i, posicaoHorizontalLinhas, espacamento);

        doc.text((lista[i].codigoProduto).toString(), 10, posicaoHorizontalTexto)
        doc.text((lista[i].descricao).toString(), 30, posicaoHorizontalTexto)
        doc.text(formatadorPreco(lista[i][precos]), 200, posicaoHorizontalTexto, null, null, 'right')

        posicaoHorizontalTexto += espacamento;
        posicaoHorizontalLinhas += espacamento;
    }
    doc.save('a4.pdf')

}

