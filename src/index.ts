import express from "express";
import router from "./produtos";

const app = express();

app.use(express.json())
app.use("/produtos", router)

app.listen(3000, () => console.log("API RODANDO em http://localhost:3000"))