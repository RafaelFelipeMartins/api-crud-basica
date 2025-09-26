import express from "express";
import routerProduto from "./produtos";
import routerCliente from "./clientes";
import routerPedidos from "./pedidos";

const app = express();

app.use(express.json())

app.use("/produtos", routerProduto)
app.use("/clientes", routerCliente)
app.use("/pedidos", routerPedidos)

// Middleware de erro (sempre depois das rotas)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: "Erro interno" });
});

app.listen(process.env.PORT || 3000, () => console.log("API RODANDO em http://localhost:3000"))