//Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

//const n1 = prompt("Digite o primeiro número: ");
//console.log(n1);

//------------------------------------------------//

//Calculo de Desconto

//let preco = parseFloat(prompt("Qual o preço do produto? "));
//let desconto = parseFloat(prompt("Qual o valor do desconto? "));

//function calcularDesconto(preco, desconto) {
//const resultado = preco - (preco * desconto) / 100;
//console.log("O valor com desconto é: ", resultado);
//}
//calcularDesconto(preco, desconto);

//----------------------------------------------//

//Verificar Aprovação

let media = parseFloat(prompt("Digite a sua media: "));
let faltas = parseFloat(prompt("Digite sua porcentagem de faltas: "));

function verificarAprovacao(media, faltas) {
  if (media >= 7 && faltas < 25) {
    console.log("Aprovado");
  } else {
    console.log("Reprovado");
  }
}
verificarAprovacao(media, faltas);
