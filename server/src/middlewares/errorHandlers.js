const express = require('express');
const app = express();

//not found error handler middleware
const notFoundError = app.use((req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

//General error handler
//eslint-disable-next-line no-unused-vars
const generalError = app.use((error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : '😢',
    });
});

module.exports = {
    notFoundError,
    generalError
};