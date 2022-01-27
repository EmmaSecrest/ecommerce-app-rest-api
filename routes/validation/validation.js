const { check, validationResult } = require("express-validator");

const validateGetProducts = [
  check("id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validatePostProduct = [
  check("id").not().isEmpty().isInt(),
  check("name").not().isEmpty().isLength({ max: 100 }),
  check("description").not().isEmpty(),
  check("quantity").not().isEmpty().isLength({ max: 10000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validatePutProduct = [
  check("id").not().isEmpty().isInt(),
  check("name").not().isEmpty().isLength({ max: 100 }),
  check("description").not().isEmpty(),
  check("quantity").not().isEmpty().isLength({ max: 10000 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

const validateDeleteProduct = [
  check("id").not().isEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  },
];

module.exports = {
  validateGetProducts,
  validatePostProduct,
  validatePutProduct,
  validateDeleteProduct,
};