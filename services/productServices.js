const { pool } = require("../config");

const fetchProducts = async () => {
  const res = await pool.query("SELECT * FROM product;");
  return res.rows;
};

const fetchProductById = async (id) => {
  const res = await pool.query("SELECT * FROM product WHERE id = $1;", [id]);
  return res.rows;
};

const createProduct = async ({ id, name, description, quantity }) => {
  const text = `INSERT INTO product(id, name, description, quantity)
                VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [id, name, description, quantity];
  const res = await pool.query(text, values);
  return res.rows;
};

const modifyProduct = async ({ id, name, description, quantity }) => {
  const text = `UPDATE product SET name=$2, description=$3, quantity=$4
    WHERE id = $1 RETURNING *`;
  const values = [id, name, description, quantity];

  const res = await pool.query(text, values);
  return res.rows;
};

const removeProduct = async (id) => {
  const res = await pool.query("DELETE FROM product WHERE id = $1;", [id]);
  return res.rows;
};

module.exports = {
  fetchProducts,
  fetchProductById,
  createProduct,
  modifyProduct,
  removeProduct,
};
