import { jsPDF } from "jspdf"
import { formatadorPreco } from "../manipuladores/manipuladorArraysEObjetos"

function tabelaListradaComLinhas(doc, numeroItem, posicaoAtualTexto, espacamentoEntreLinhasPadrao, linhasAOcupar, espacoEntreTextoELinhaImpressa) {

    if (numeroItem % 2 == 0) {
        doc.setFillColor(255, 255, 255);
    } else {
        doc.setFillColor(230, 230, 230);
    }

    let posicaoLinhaImpressa = posicaoAtualTexto + espacoEntreTextoELinhaImpressa + ((linhasAOcupar - 1) * espacamentoEntreLinhasPadrao);
    let alturaRetangulo = linhasAOcupar * espacamentoEntreLinhasPadrao;
    let inicioRetangulo = posicaoLinhaImpressa - alturaRetangulo;

    doc.rect(9, inicioRetangulo, 191, alturaRetangulo, "F");

    doc.setLineWidth(0.5);
    doc.line(9, (posicaoLinhaImpressa - 0.2), 200, (posicaoLinhaImpressa - 0.2));

}

function montarNomeLista (titulo, tamanho, precos, ano) {
    return ((titulo == '' ? "Diversos" : titulo) + " - " + tamanho + " - " + (precos == 'valorAtacado' ? 'Atacado' : 'Varejo') + ((ano == 0 || ano == '') ? '' : ' - ' + ano)).toString().toUpperCase()
}

function montarCabecalhoENumerarPaginaListaPrecos(doc, nomeLista, pagina = 0) {

    doc.setFont("times", "bolditalic")
    doc.setFontSize(26)
    doc.text('Confecções Luana', 105, 20, null, null, "center")

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.text(nomeLista, 105, 40, null, null, "center")

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

    let qtdeItensPorPagina = 32;

    let linhaAtual = 0;

    let numeroPagina = paginaInicial;

    let nomeLista = montarNomeLista(titulo, tamanho, precos, ano);


    montarCabecalhoENumerarPaginaListaPrecos(doc, nomeLista, numeroPagina);

    for (let i = 0; i < qtdeItens; i++) {

        let comprimentoDescricao = lista[i].descricao.length;
        
        let linhasAOcupar = Math.ceil(comprimentoDescricao / 60)
   
        let posicaoAtualTexto = posicaoHorizontalTexto + (linhaAtual * espacamento);

        tabelaListradaComLinhas(doc, i, posicaoAtualTexto, espacamento, linhasAOcupar, 2);
        
        doc.text((lista[i].codigoProduto).toString(), 10, posicaoAtualTexto)
        doc.text(formatadorPreco(lista[i][precos]), 200, posicaoAtualTexto, null, null, 'right')
        
        if (linhasAOcupar == 1 ) {

            doc.text((lista[i].descricao).toString(), 30, posicaoAtualTexto)

        } else {

            let j = 1;
            let textoAtual = lista[i].descricao;

            while(j <= linhasAOcupar) {

                doc.text(textoAtual.slice(0, 60), 30, posicaoAtualTexto)

                textoAtual = textoAtual.substring(60);

                (j == linhasAOcupar) ? linhaAtual = linhaAtual : linhaAtual++;
                posicaoAtualTexto = posicaoHorizontalTexto + (linhaAtual * espacamento);

                j++
            }
        }

        linhaAtual++;

        if (linhaAtual > qtdeItensPorPagina) {
            if (numeroPagina != 0) {
                numeroPagina++;
            }
            linhaAtual = 0;

            doc.addPage("a4", "portrait")
            montarCabecalhoENumerarPaginaListaPrecos(doc, nomeLista, numeroPagina);
        }
    }
    doc.save(nomeLista + '.pdf')

}

