export class Jogo {

    copiarValorArray(array) {
        let array2 = [];

        for (let i = 0; i < array.length; i++) {
            array2.push([...array[i]]);
        }

        return array2;
    }

    modeloDeTransacao(tabuleiro) {
        const copiaTabuleiro = this.copiarValorArray(tabuleiro)
        let proximasJogadas = [];

        for (let linha = 0; linha < tabuleiro.length; linha++) {
            for (let coluna = 0; coluna < tabuleiro.length; coluna++) {
                //verificar frente
                if (tabuleiro[linha][coluna + 1] == "") {
                    tabuleiro[linha][coluna + 1] = tabuleiro[linha][coluna];
                    tabuleiro[linha][coluna] = "";
                    proximasJogadas.push(tabuleiro);
                    tabuleiro = this.copiarValorArray(copiaTabuleiro);
                }

                //verificar tras
                if (tabuleiro[linha][coluna - 1] == "") {
                    tabuleiro[linha][coluna - 1] = tabuleiro[linha][coluna];
                    tabuleiro[linha][coluna] = "";
                    proximasJogadas.push(tabuleiro);
                    tabuleiro = this.copiarValorArray(copiaTabuleiro);
                }

                //verificar cima
                if (tabuleiro[linha - 1]) {
                    if (tabuleiro[linha - 1][coluna] == "") {
                        tabuleiro[linha - 1][coluna] = tabuleiro[linha][coluna];
                        tabuleiro[linha][coluna] = "";
                        proximasJogadas.push(tabuleiro);
                        tabuleiro = this.copiarValorArray(copiaTabuleiro);
                    }
                }
                //verificar baixo
                if (tabuleiro[linha + 1]) {
                    if (tabuleiro[linha + 1][coluna] == "") {
                        tabuleiro[linha + 1][coluna] = tabuleiro[linha][coluna];
                        tabuleiro[linha][coluna] = "";
                        proximasJogadas.push(tabuleiro);
                        tabuleiro = this.copiarValorArray(copiaTabuleiro);
                    }
                }
            }
        }
        return proximasJogadas;
    }

    testeDeObjectivo(estadoInicial, estadoFinal) {
        for (let i = 0; i < estadoInicial.length; i++) {
            for (let j = 0; j < estadoInicial.length; j++) {
                if (estadoInicial[i][j] != estadoFinal[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }
}

