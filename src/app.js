import express from "express";
import routes from "./routes/index.js";

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

const app = express();
routes(app);

export default app;