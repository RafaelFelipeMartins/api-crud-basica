import express from 'express';
import { db } from './db'
// a tabela de clientes
const routerCliente = express.Router()

//lista todos
routerCliente.get('/', async(_req, res) => {
    const clientes = await db("clientes").select("*")
    res.json(clientes)
})

// busca por id
routerCliente.get("/:id", async(_req, res) => {
    const cliente = await db("clientes").where("id", _req.params.id).first()
    res.json(cliente)
})

// cria
routerCliente.post("/", async(req, res) => {
    const { id, nome, email, telefone, cpf, endereco } = req.body
    const [novoCliente] = await db("clientes").insert({ id, nome, email, telefone, cpf, endereco }).returning("*")
    res.json(novoCliente)
})

// atualiza
routerCliente.put("/:id", async(req, res) => {
     const { nome, email, telefone, cpf, endereco } = req.body
    const [clienteAtualizado] = await db("clientes").where("id", req.params.id).update({ nome, email, telefone, cpf, endereco }).returning("*")
    res.json(clienteAtualizado)  
})

// deletar 
routerCliente.delete("/:id", async(req, res) => {
    await db("clientes").where("id", req.params.id).del();
    res.sendStatus(204);
})

export default routerCliente