const { Product } = require('../models/products');
const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, field, numericFilters } = req.query;
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (company) {
        queryObject.company = company;
    }

    if (numericFilters) {
        const operatorsMap = {
            '>': '$gt',
            '<': '$lt',
            '=': '$eq',
            '>=': '$gte',
            '<=': '$lte'
        }
        const regEx = /\b(>|<|=|>=|<=)\b/g
        const options = ['price', 'rating'];
        const filters = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`);
        filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };

            }
        })
    }

    console.log(queryObject)
    let result = Product.find(queryObject);
    if (field) {
        fieldList = field.split(',').join(' ');
        result = result.select(fieldList);
    }
    //sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt')
    }
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result;

    res.status(201).json({ count: products.length, products });
}
const getAllProductsStatic = async (req, res) => {
    const result = Product.find();
    const products = await result.sort('-name -price').limit(10).skip(1);
    res.status(201).json({ count: products.length, products });
}
module.exports = {
    getAllProductsStatic,
    getAllProducts
}