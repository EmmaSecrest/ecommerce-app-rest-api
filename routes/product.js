const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const {
  validateGetProducts,
  validatePostProduct,
  validatePutProduct,
  validateDeleteProduct,
} = require("./validation/validation");
const { products } = require("../controllers");
const productRouter = new Router();

productRouter
  .get("/", products.getAllProducts)
  .get("/:id", validateGetProducts, products.getProductById)
  .post(
    "/",
    validatePostProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.postProduct
  )
  .put(
    "/:id",
    validatePutProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.putProduct
  )
  .delete(
    "/:id",
    validateDeleteProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.deleteProduct
  );

module.exports = productRouter;
