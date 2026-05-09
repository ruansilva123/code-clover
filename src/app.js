import express from "express";
import conectaBancoDeDados from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaBancoDeDados();

const users = [
    {
  id: 1,
  nome: "gabriel"
    },
    {
  id: 2,
  nome: "maria"
    }
]
conexao.on("error", (erro) => {
  console.error("Erro de conexão com o banco de dados: " , erro);
}); 

conexao.once("open", () => {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");  
});

const app = express();
routes(app);







app.get("/user", (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
})

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("livro removido com sucesso");
});

export default app;
