const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandlers = require('./middlewares/errorHandlers.js');
const mongoose = require('mongoose');
const logs = require('./api/logs.js');

require('dotenv').config();

const port = process.env.PORT || 3000;

//db conn
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//middlewares
const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

//routers
app.get('/',(req,res)=>{
    res.json({
        message: 'Hi'
    });
});
app.use('/api/logs',logs); 

//handler errors
app.use(errorHandlers.notFoundError);
app.use(errorHandlers.generalError);

app.listen(port,()=>{
    console.log(`Listening at http:localhost:${port}`);
});