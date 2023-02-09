const express = require("express");
const { getProduct, createProduct, updateProduct, deleteProduct} = require("../controller/productController")
const router = express.Router();

router.route('/').get(getProduct).post(createProduct);

router.route('/:email/:colour/:size').patch(updateProduct).delete(deleteProduct);

module.exports = router;