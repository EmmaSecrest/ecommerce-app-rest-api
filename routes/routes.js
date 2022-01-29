const userAccount = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const authRouter = require("./auth");
const { pool } = require("../config");
const { loginRouter } = require('./login')

const express = require("express");
// const res = require("express/lib/response");
const router = express();

router.use("/users", userAccount);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/auth", authRouter);
router.use('/login' ,loginRouter)

router.get("/", (req, res) => {
  res.send('Home Page')
});

// checking the connection

module.exports = router;
