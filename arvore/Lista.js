
class No {
    constructor(tabuleiro) {
        this.tabuleiro = tabuleiro;
        this.proximo = null;
    }
}

export class Lista {
    constructor() {
        this.raiz = null;
    }

    adicionarFim(tabuleiro) {
        let no = new No(tabuleiro);

        if (this.raiz == null) {
            this.raiz = no;
        } else {
            let copia = this.raiz;
            while (copia.proximo) {
                copia = copia.proximo;
            }
            copia.proximo = no;
        }
    }

    removerInicio() {

        let copia = this.raiz;
        this.raiz = copia.proximo;
        copia.proximo = null;
    }

    removerFim() {
        let copia = this.raiz;
        let copia2 = copia;
        if (copia) {
            if (this.tamanho() == 1) {
                this.removerInicio();
            } else {
                while (copia.proximo) {
                    copia2 = copia;
                    copia = copia.proximo;
                }
                copia2.proximo = null;
            }

        }
    }

    topo() {
        let copia = this.raiz;

        if (copia) {
            while (copia.proximo) {
                copia = copia.proximo;
            }

            return copia.tabuleiro;
        }
    }

    inicio() {
        let copia = this.raiz;

        if (copia) {
            return copia.tabuleiro;
        }
    }

    meio(indice) {

        let copia = this.raiz;

        if (copia) {

            if (indice == 0) {
                return this.inicio();
            } else if (indice == this.tamanho()) {
                return this.topo();
            } else {
                for (let i = 0; i < indice; i++) {
                    copia = copia.proximo;
                }

                return copia.tabuleiro;
            }
        }
    }

    imprimir() {
        let copia = this.raiz;
        while (copia) {
            console.log(copia.tabuleiro);
            copia = copia.proximo;
        }
    }

    tamanho() {
        let copia = this.raiz;
        let tam = 0;
        while (copia) {
            tam++;
            copia = copia.proximo;
        }

        return tam;
    }
}

