const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);
    return res.status(500).json({ errorMessage: "Something wrong in server,Please Try again!" })
}
module.exports = errorHandlerMiddleware;