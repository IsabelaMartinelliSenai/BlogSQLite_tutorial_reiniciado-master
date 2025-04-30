const bodyParser = require("body-parser"); // importa o body-parser
const express = require("express"); //importa lib express
const sqlite3 = require("sqlite3"); //importa lib sqlite3
const session = require("express-session"); // inporta o express-session

const PORT = 3000; //porta TCP do servidor HTTP da aplicação

//Variáveis usadas no EJS (padrão)
let config = { title: "", footer: "" };

const app = express(); //instância p/ uso do express

//Cria conexão com o banco de dados
const db = new sqlite3.Database("user.db"); //instância p/ uso do sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  //esse mátodo permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password TEXT ,
    email TEXT , tel TEXT , cpf TEXT , rg TEXT)`
  );
});

// Configuração para uso de sessão (cookies) com Express
app.use(
  session({
    secret: "qualquersenha",
    resave: true,
    saveUninitialized: true,
  })
);

//__dirname é a variavel interna do node que guarda o caminho absoluto do projeto, no SO
//console.log(__dirname);

//aqui será acrescentado uma rota "/static", para a pasta __dirname + "/static"
//o app.use é usado para acrescentar rotas novas para o Express gerenciar
//e pode usar Middleware p/ isso, que nese caso é o express.static, que gerencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"));

//middleware para processar as requisições do Body Parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o moter de visualização
app.set("view engine", "ejs");

const home =
  "<a href='/sobre'>Sobre</a> <br> <a href='/login'>Login</a> <br> <a href='/cadastro'>Cadastro</a>";
const sobre = "pages/sobre";
//const login = 'Você está na página "Login" <br> <a href="/">Home</a>';
//const cadastro = 'Você está na página "Cadastro" <br> <a href="/">Home</a>';

/*Método expres.get necessita de dois parâmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res)*/

app.get("/", (req, res) => {
  console.log("GET /index");
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/
  //res.send(home);

  config = { title: "Blog da turma I2HNA - SESI Nova Odessa", footer: "" };
  res.render("pages/index", config);
  // res.redirect("/cadastro"); //Redireciona para a ROTA cadastro
});

app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/sobre
  // res.send(sobre);
  res.render(sobre, config);
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/login
  res.render("pages/login", config);
});

app.post("/login", (req, res) => {
  console.log("POST /login");
  const { username, password } = req.body;

  //Consultar o usuário no banco de dados
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) throw err;

    //Se usuário válido -> registra a sessão e redireciona para o dashboard
    if (row) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect("/dashboard");
    } //Se não, envia mensagem de erro (Usuário inválido)
    else {
      res.send("Usuário invávido.");
    }
  });
});

app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  //rota raiz do servidor, acesse o browser com o endereço http://localhost:3000/login
  res.render("pages/dashboard", config);
});

//app.post("/login", (req, res) => {
//res.send("Login ainda não implementado.");
//});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    //res.send("Lista de usuários");
    res.render("partials/userTable", config);
  });
});

//GET Cadastro
app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  res.render("pages/cadastro", config);
});

//POST do cadastro
app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");
  //Linha p/ depurar se está vindo dados no req.body
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(JSON.stringify(req.body));

  const { username, password, email, tel, cpf, rg } = req.body;
  //Colocar aqui as validações e inclusão no banco de dados do cadastro do usuário
  //1- Validar dados do usuário
  //2- Saber se ele ja existe no banco
  const query =
    "SELECT * FROM users WHERE email=? OR cpf=? OR rg=? OR username=?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;

    if (row) {
      //A variável 'row' irá retornar dados do banco de dados,
      //executado através do SQL, variável query
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      //3- Se usuário não existe no banco cadastrar
      const insertQuery =
        "INSERT INTO users (username, password, email, tel, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(insertQuery, [username, password, email, tel, cpf, rg], (err) => {
        //Inserir a lógica do INSERT
        if (err) throw err;
        res.send("Usuário cadastrado com sucesso");
      });
    }
  });
  // res.send(
  //   `Bem-vindo usuário: ${req.body.username}, seu E-mail é ${req.body.email}`
  // );
});

//app.listen() deve ser o último comando da aplicação
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
