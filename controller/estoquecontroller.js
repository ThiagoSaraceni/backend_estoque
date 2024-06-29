const mysql = require("../db/db");

//se eu uso await preciso colocar  o async
async function getProducts() {
  //como o retorno nao e instantaneo preciso usar o await
  const results = await mysql.query("select * from produtos");
  return results[0];
}

async function getProductsById(codigo_produto) {
  const results = await mysql.query(
    "select * from produtos where codigo_produto=?;",
    [codigo_produto]
  );
  return results[0];
}

async function getProductsByName(descricao) {
  const results = await mysql.query(
    "select * from produtos where descricao=?;",
    [descricao]
  );
  return results[0];
}

async function insertProducts(estoque) {
  const values = [
    estoque.codigo_produto,
    estoque.descricao,
    estoque.quantity,
    estoque.price,
    estoque.location,
  ];
  await mysql.query(
    "INSERT into  produtos (codigo_produto, descricao, quantity, price, location) values (?, ?, ?, ?, ?);",
    values
  );
}

async function updateProducts(codigo_produto, estoque) {
  const values = [
    estoque.codigo_produto,
    estoque.descricao,
    estoque.quantity,
    estoque.price,
    estoque.location,
    codigo_produto,
  ];
  await mysql.query(
    "UPDATE produtos set codigo_produto=?, descricao=?, quantity=?, price=?, location=? where codigo_produto=?",
    values
  );
}

async function deleteProduct(codigo_produto) {
  const value = [codigo_produto];
  await mysql.query("DELETE FROM produtos where codigo_produto=?", value);
}

module.exports = {
  getProducts,
  getProductsById,
  insertProducts,
  updateProducts,
  deleteProduct,
  getProductsByName,
};
