import { Jogo } from "./jogo.js";
import { Lista } from "./Lista.js";

class No {
  constructor(tabuleiro) {
    this.tabuleiro = tabuleiro;
    this.filhos = new Lista();
    this.caminhos = new Lista();
    this.pai = null;
  }
}

class Arvore {
  constructor() {

    this.estadoInicial = [
      ["4", "3", ""],
      ["2", "1", "6"],
      ["7", "5", "8"]
    ];

    this.estadoFinal = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", ""]
    ];

    this.raiz = new No(this.estadoInicial);

    this.pilha = new Lista();

    this.pilha.adicionarFim(this.raiz);

    this.objectivos = new Lista();
  }


  buscaPorProfundidade(arvore, profundidade = 0) {

    if (arvore && profundidade < 4000) {

      let jogo = new Jogo();

      let copia = jogo.copiarValorArray(arvore.tabuleiro);

      //terminou
      if (jogo.testeDeObjectivo(arvore.tabuleiro, this.estadoFinal)) {
        this.objectivos.adicionarFim(arvore);
      }


      let transicao = jogo.modeloDeTransacao(arvore.tabuleiro);
      if (transicao.length > 0) {
        let novoNo;
        for (let i = transicao.length - 1; i >= 0; i--) {
          novoNo = new No(transicao[i]);
          arvore.tabuleiro = copia;
          novoNo.pai = arvore;
          novoNo.caminhos.adicionarFim(novoNo.pai)
          for (let j = 0; j < novoNo.pai.caminhos.tamanho(); j++) {
            novoNo.caminhos.adicionarFim(novoNo.pai.caminhos.meio(j));
          }


          if (arvore.pai) {
            if (jogo.testeDeObjectivo(novoNo.tabuleiro, arvore.pai.tabuleiro) == false) {
              arvore.filhos.adicionarFim(novoNo);
            }

          } else {
            arvore.filhos.adicionarFim(novoNo);
          }

        }
      }

      this.pilha.removerInicio();

      for (let i = 0; i < arvore.filhos.tamanho(); i++) {
        if (arvore.pai) {
          if (jogo.testeDeObjectivo(arvore.pai.tabuleiro, arvore.filhos.meio(i).tabuleiro) == false) {
            this.pilha.adicionarFim(arvore.filhos.meio(i));
          }
        } else {
          this.pilha.adicionarFim(arvore.filhos.meio(i));

        }
      }

      profundidade++;
      this.buscaPorProfundidade(this.pilha.inicio(), profundidade);
    } else {
      //imprimir todos os caminhos ate a solucao
      for (let i = 0; i < this.objectivos.tamanho(); i++) {
        for (let j = this.objectivos.meio(i).caminhos.tamanho() - 1; j >= 0; j--) {
          console.log(this.objectivos.meio(i).caminhos.meio(j).tabuleiro)
        }
        console.log(this.objectivos.meio(i).tabuleiro)
        //imprimir o numero de caminhos passados ate chegar a solucao
        console.log(this.objectivos.meio(i).caminhos.tamanho());

      }

      //melhot solucao

      if (this.objectivos.tamanho() > 0) {
        //console.log(this.melhorSolucao(this.objectivos).raiz.tabuleiro.caminhos.tamanho());
        console.log(this.melhorSolucao(this.objectivos).raiz.tabuleiro);
      }

    }


  }

  melhorSolucao(objectivos) {
    let melhor = objectivos;
    for (let i = 0; i < this.objectivos.tamanho(); i++) {
      if (this.objectivos.meio(i).caminhos.tamanho() < melhor.meio(0).caminhos.tamanho()) {
        melhor = this.objectivos.meio(i);
      }
    }

    return melhor;
  }

}

const arvore = new Arvore();

arvore.buscaPorProfundidade(arvore.raiz);