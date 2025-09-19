import express from "express";
import routerProduto from "./produtos";
import routerCliente from "./clientes";

const app = express();

app.use(express.json())
app.use("/produtos", routerProduto)
app.use("/clientes", routerCliente)

app.listen(3000, () => console.log("API RODANDO em http://localhost:3000"))