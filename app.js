const express = require('express');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const productRoute = require('./routes/products');
require('dotenv').config();
require('express-async-errors');

const app = express();
app.use(express.json());

//Page Routes
app.get('/', (req, res) => res.send('Hello From Store Api'))

app.use('/api/v1/products', productRoute);

//Middleware Group
app.use((req, res) => {
    res.send('Page Not Found');
})
app.use(errorHandlerMiddleware)


//Start 
const port = process.env.PORT;
const start = async () => {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening at ${port}`));
}
start();