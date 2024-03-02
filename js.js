const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove()
  }, 500)
}

window.addEventListener("load", () => {
  createBalloons(30)
});

window.addEventListener("click", () => {
  removeBalloons();
});

function desaparecer() {
    var botao = document.getElementById("meubtn");
    botao.style.display = "none";

    var novoLayout = document.getElementById("novoLayout");
    novoLayout.style.display = "block";

}



let dados; // Variável para armazenar os dados do JSON
let indiceAtual = 0; // Índice atual dos dados exibidos

// Função para carregar os dados do JSON
function carregarDados() {
  fetch('dados.json')
    .then(response => response.json())
    .then(data => {
      dados = data;
      exibirInformacao();
      verificarVisibilidadeBotao();
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
}

// Função para exibir a informação atual
function exibirInformacao() {
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = `
    <p>${dados[indiceAtual].texto}</p>
    <img src="${dados[indiceAtual].imagem}" alt="${dados[indiceAtual].texto}"/>
  `;
}

// Função para verificar a visibilidade do botão "Anterior"
function verificarVisibilidadeBotao() {
  const botaoAnterior = document.getElementById("botaoAnterior");
  botaoAnterior.style.display = (indiceAtual === 0) ? "none" : "inline-block";
  botaoProximo.style.display = (indiceAtual === dados.length - 1) ? "none" : "inline-block";
}

// Função para mudar a informação para próxima ou anterior
function mudarInformacao(direcao) {
  indiceAtual += direcao;
  if (indiceAtual < 0) {
    indiceAtual = dados.length - 1;
  } else if (indiceAtual >= dados.length) {
    indiceAtual = 0;
  }
  exibirInformacao();
  verificarVisibilidadeBotao();
}

// Carrega os dados quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarDados);
