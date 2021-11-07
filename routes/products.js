const express = require('express');
const { createProduct, getAllProductsStatic, getAllProducts } = require('../controllers/products');
const router = express.Router();
router.get('/static', getAllProductsStatic);
router.get('/', getAllProducts);
router.post('/', createProduct);
module.exports = router;