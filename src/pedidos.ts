import express from "express";
import { db } from "./db";

const routerPedidos = express.Router();

// Lista todos os pedidos
routerPedidos.get("/", async (_req, res) => {
  const pedidos = await db("pedidos")
    .select("pedidos.*", "clientes.nome as cliente_nome", "clientes.email as cliente_email")
    .leftJoin("clientes", "pedidos.cliente_id", "clientes.id");
  res.json(pedidos);
});

// Busca pedido por id
routerPedidos.get("/:id", async (_req, res) => {
  const pedido = await db("pedidos")
    .where("pedidos.id", _req.params.id)
    .leftJoin("clientes", "pedidos.cliente_id", "clientes.id")
    .first();
  res.json(pedido);
});

// Cria pedido
routerPedidos.post("/", async (req, res) => {
  const { cliente_id, status } = req.body;
  const [novoPedido] = await db("pedidos")
    .insert({ cliente_id, status })
    .returning("*");
  res.json(novoPedido);
});

// Atualiza pedido
routerPedidos.put("/:id", async (req, res) => {
  const { status } = req.body;
  const [pedidoAtualizado] = await db("pedidos")
    .where("id", req.params.id)
    .update({ status, updated_at: new Date() })
    .returning("*");
  res.json(pedidoAtualizado);
});

// Deleta pedido
routerPedidos.delete("/:id", async (req, res) => {
  await db("pedidos").where("id", req.params.id).del();
  res.sendStatus(204);
});

export default routerPedidos;