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
        const logEntry = new LogEntry(req.body);
        const itemCreated  = await logEntry.save();
        res.json(itemCreated);
    }
    catch (error) {
        next(error);
        if(error.name === 'ValidationError') {
            res.status(400);
        }
    }
});

module.exports = router;