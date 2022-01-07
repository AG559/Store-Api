const express = require('express');
const { createProduct, getAllProductsStatic, getAllProducts } = require('../controllers/products');
const router = express.Router();
router.get('/static', getAllProductsStatic);
router.get('/', getAllProducts);
module.exports = router;