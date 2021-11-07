const { Product } = require('../models/products');
const createProduct = async (req, res) => {
    const products = await Product.create();
    res.json(products);
}
const getAllProducts = async (req, res) => {
    console.log(req.query)
    const products = await Product.find(req.query);
    res.status(201).json({ products, count: products.length });
}
const getAllProductsStatic = async (req, res) => {
    console.log(req.query)
    const products = await Product.find({});
    res.status(201).json(products);
}
module.exports = {
    createProduct,
    getAllProductsStatic,
    getAllProducts
}