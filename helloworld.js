const express = require("express");
//importa a classe da biblioteca "express"

const PORT = 3000; //porta TCP do servidor HTTP da aplicação

const app = express();
//cria uma instância da classe da biblioteca "express"

/*Método expres.get necessita de dois parâmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res)
*/
app.get("/", (req, res) => {
  res.send("Olá SESI");
});

//app.listen() deve ser o último comando da aplicação
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
