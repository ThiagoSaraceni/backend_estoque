const express = require("express");
const router = express.Router();
const estoque = require("../../controller/estoquecontroller");
router.use(express.json());

router.get("/produtos", async (req, res) => {
  const results = await estoque.getProducts();
  res.json(results);
});

router.get("/produtos/:codigo_produto", async (req, res) => {
  const codigo_produto = parseInt(req.params.codigo_produto);
  const results = await estoque.getProductsById(codigo_produto);
  res.json(results);
});

router.get("/descricao/:descricao", async (req, res) => {
  const descricao = req.params.descricao;
  const results = await estoque.getProductsByName(descricao);
  res.json(results);
});

router.get("/", (req, res, next) => {
  res.json({
    messge: "its alive!",
  });
});

router.post("/produtos", async (req, res) => {
  const products = req.body;
  try {
    await estoque.insertProducts(products);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send("Erro: Entrada duplicada. O código do produto já existe.");
  }
});

router.put("/produtos/:codigo_produto", async (req, res) => {
  const codigo_produto = parseInt(req.params.codigo_produto);
  const products = req.body;
  await estoque.updateProducts(codigo_produto, products);
  res.sendStatus(200);
});

router.delete("/produtos/:codigo_produto", async (req, res) => {
  const codigo_produto = parseInt(req.params.codigo_produto);
  await estoque.deleteProduct(codigo_produto);
  res.sendStatus(204);
});

module.exports = router;
