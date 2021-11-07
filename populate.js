const connectDb = require('./db/connect');
const { Product } = require('./models/products');
require('dotenv').config();
const jsonProducts = require('./products.json');
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!!')
        process.exit(0)
    } catch (error) {
        console.log(error.message)
        process.exit(0)
    }
}
start();