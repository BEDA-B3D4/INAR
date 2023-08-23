import { Arvore } from "./index.js"

const interfaceTabuleiro = document.querySelectorAll("#root div");
const graph = document.querySelector("#graph");

let tabuleiro = [];

const estadoInicial = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", ""]
]
//carregar ao iniciar
window.onload = () => {
    gerarValoresTabuleiro();
}

//pegar estado inicial e colocar na interface
const gerarValoresTabuleiro = () => {

    //converter array bidimensional em dimensional
    for (let i = 0; i < estadoInicial.length; i++) {
        for (let j = 0; j < estadoInicial[i].length; j++) {
            tabuleiro.push(estadoInicial[i][j])
        }
    }

    //passar valores do array para a interface
    for (let i = 0; i < tabuleiro.length; i++) {
        interfaceTabuleiro[i].removeAttribute("onclick");
        interfaceTabuleiro[i].addEventListener("click", () => {
            jogar(i)
        })
        interfaceTabuleiro[i].innerText = tabuleiro[i];
    }
}


//atualizar tabuleiro
const atualizarTabuleiro = (tabuleiroAtualizado) => {
    //passar valores do array para a interface
    for (let i = 0; i < tabuleiroAtualizado.length; i++) {
        interfaceTabuleiro[i].removeAttribute("onclick");
        interfaceTabuleiro[i].innerText = tabuleiroAtualizado[i];
    }
}

//trocar posicoes de valores
const trocar = (posicao, index) => {
    tabuleiro[posicao + index] = tabuleiro[posicao];
    tabuleiro[posicao] = "";
    atualizarTabuleiro(tabuleiro);
    let novoEstado = unidimensionalParaBidimensional(tabuleiro);
    desenharGrafico(novoEstado);
}


const desenharGrafico = (tabuleiroAtual) => {
    let arr = new Arvore(tabuleiroAtual);
    arr.raiz.tabuleiro = tabuleiroAtual;
    arr.estadoInicial = tabuleiroAtual;
    let caminhos = arr.buscaPorProfundidade(arr.raiz);

    graph.innerHTML = "";

    let novaDiv, filhosNovaDiv;
    //adicionar = para ter as 4 solucoes, a ultima solucao eh igual a penultima
    for (let c = 0; c < caminhos.tamanho(); c++) {
        novaDiv = document.createElement("div");
        graph.appendChild(novaDiv);
        for (let w = caminhos.meio(c).caminhos.tamanho() - 1; w >= 0; w--) {
            filhosNovaDiv = document.createElement("div");
            filhosNovaDiv.classList.add("element");

            for (let i = 0; i < caminhos.meio(c).caminhos.meio(w).tabuleiro.length; i++) {
                for (let j = 0; j < caminhos.meio(c).caminhos.meio(w).tabuleiro[i].length; j++) {
                    let path = caminhos.meio(c).caminhos.meio(w).tabuleiro[i][j];
                    if (j == 0) {
                        filhosNovaDiv.innerHTML += "[";

                    }
                    if (path == "") {
                        filhosNovaDiv.innerHTML += "&nbsp;&nbsp;&nbsp;";
                    } else {
                        filhosNovaDiv.innerHTML += path + "&nbsp;";
                    }
                    if (j == 2) {
                        filhosNovaDiv.innerHTML += "]<br>";
                    }

                }
            }

            novaDiv.appendChild(filhosNovaDiv)
            novaDiv.innerHTML += "<span style='font-size:40px;color:red'>&darr;</span>"
        }

        //solution
        filhosNovaDiv = document.createElement("div");
        filhosNovaDiv.classList.add("element2");

        for (let i = 0; i < caminhos.meio(c).tabuleiro.length; i++) {
            for (let j = 0; j < caminhos.meio(c).tabuleiro[i].length; j++) {
                let path = caminhos.meio(c).tabuleiro[i][j];
                if (j == 0) {
                    filhosNovaDiv.innerHTML += "[";

                }
                if (path == "") {
                    filhosNovaDiv.innerHTML += "&nbsp;&nbsp;&nbsp;";
                } else {
                    filhosNovaDiv.innerHTML += path + "&nbsp;";
                }
                if (j == 2) {
                    filhosNovaDiv.innerHTML += "]<br>";
                }

            }
        }


        //filhosNovaDiv.innerHTML = caminhos.meio(c).tabuleiro;
        novaDiv.appendChild(filhosNovaDiv)
    }

}


const unidimensionalParaBidimensional = (tabuleiroUnidimensional) => {
    let bidimensional = [];
    let array = [];
    for (let i = 0; i < tabuleiroUnidimensional.length; i++) {
        array.push(tabuleiroUnidimensional[i]);

        if (array.length == 3) {
            bidimensional.push(array);
            array = [];
        }
    }

    return bidimensional;
}

//jogar   quando clicado
const jogar = (posicao) => {

    if (tabuleiro[posicao + 1] == "") {
        trocar(posicao, 1);
    } else if (tabuleiro[posicao - 1] == "") {
        trocar(posicao, -1);
    } else if (tabuleiro[posicao + 3] == "") {
        trocar(posicao, 3);
    } else if (tabuleiro[posicao - 3] == "") {
        trocar(posicao, -3);
    }
}