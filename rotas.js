const express = require("express");
//importa a classe da biblioteca "express"

const PORT = 3000; //porta TCP do servidor HTTP da aplicação

const app = express();
//cria uma instância da classe da biblioteca "express"

const index = "<a href='/sobre'>Sobre</a> <a href='/info'>Info</a>";

const sobre = 'Você está na página "Sobre" <br> <a href="/">Voltar</a>';

const info = 'Você está na página "Info" <br> <a href="/">Voltar</a>';
/*Método expres.get necessita de dois parâmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res)
*/
app.get("/", (req, res) => {
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/
  res.send(index);
});

app.get("/sobre", (req, res) => {
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/sobre
  res.send(sobre);
});

app.get("/info", (req, res) => {
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/info
  res.send(info);
});

//app.listen() deve ser o último comando da aplicação
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
