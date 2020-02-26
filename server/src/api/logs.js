const {Router} = require('express');
const LogEntry = require('../models/LogEntrySchema');

const router = new Router();

router.get('/',async (req,res,next)=>{
    try {
        const entries = await LogEntry.find();
        res.json(entries);  
    } catch (error) {
        next(error);
    }
});

router.post('/',async (req,res,next)=>{
    try {
        if(req.get('X-API-KEY')!==process.env.API_KEY){
            res.status(401);
            throw new Error('UnAuthorized');
        }
        const logEntry = new LogEntry(req.body);
        const itemCreated  = await logEntry.save();
        res.json(itemCreated);
    }
    catch (error) {
        if(error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;