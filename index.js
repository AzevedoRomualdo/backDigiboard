const restify = require("restify");

const errs = require("restify-errors");

const server = restify.createServer({
  name: "myapp",
  version: "1.0.0",
});

var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_digiboard",
  },
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// server.get("/echo/:name", function (req, res, next) {
//   res.send(req.params);
//   return next();
// });

server.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // res.header("Access-Control-Allow-Origin : http://localhost:4200");
  // res.header("Access-Control-Allow-Credentials : true");
  // res.header("Access-Control-Allow-Methods : GET, POST, PUT, DEL, OPTIONS");
  // res.header("Access-Control-Allow-Headers : Origin, Content-Type, Accept");
  //header := w.Header()
  res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS"),
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    ),
    next();
});

// Use this after the variable declaration

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});

//CONSULTAR TUDO
server.get("/", (req, res, next) => {
  knex("tab_colaborador").then((dados) => {
    res.send(dados);
  }, next);
});

//INSERIR
server.post("/create", (req, res, next) => {
  knex("tab_colaborador")
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next);
});

// CONSULTAR DETERMINADO VALOR
server.get("/show/:id", (req, res, next) => {
  const { id } = req.params;

  knex("tab_colaborador")
    .where("Id_Colaborador", id)
    .first()
    .then((dados) => {
      if (!dados)
        return res.send(new errs.BadRequestError("Nenhum dado encontrado"));
      res.send(dados);
    }, next);
});

// ATUALIZAR
server.put("/update/:id", (req, res, next) => {
  const { id } = req.params;

  knex("tab_colaborador")
    .where("Id_Colaborador", id)
    .update(req.body)
    .then((dados) => {
      if (!dados)
        return res.send(new errs.BadRequestError("Nenhum dado encontrado"));
      res.send("dados atualizados");
    }, next);
});

// DELETE
server.del("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  knex("tab_colaborador")
    .where("Id_Colaborador", id)
    .delete(req.body)
    .then((dados) => {
      if (!dados)
        return res.send(new errs.BadRequestError("Nenhum dado encontrado"));
      res.send("dados excluídos");
    }, next);
});
