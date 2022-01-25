const userAccount = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const { pool } = require("../config");

const express = require("express");
const router = express();

router.use("/users", userAccount);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

router.get("/", (req, res) => {
  pool.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(201).json(result.rows);
  });
});

// checking the connection

module.exports = router;
