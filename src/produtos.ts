import express from 'express'
import { db } from './db';  

const router = express.Router();

// listar
router.get("/", async(_req, res) => {
    const produtos = await db("produtos").select("*")
    res.json(produtos)
})

// busca
router.get("/:id", async(_req, res) => {
    const produto = await db("produtos").where("id", _req.params.id).first()
    res.json(produto);
})

// cria
router.post("/", async(req, res) => {
    const { nome, preco } = req.body
    const [novoProduto] = await db("produtos").insert({nome, preco}).returning("*")
    res.json(novoProduto)
})

// atualiza
router.put("/:id", async(req, res) => {
    const { nome, preco } = req.body
    const [produtoAtualizado] = await db("produtos").where("id", req.params.id).update({nome, preco}).returning("*")
    res.json(produtoAtualizado)
})

// deletar
router.delete("/:id", async(req, res) => {
    await db("produtos").where("id", req.params.id).del();
    res.sendStatus(204);
})


export default router;