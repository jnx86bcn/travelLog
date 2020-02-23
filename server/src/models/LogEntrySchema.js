const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredNumber = {type: Number, required: true};

const LogEntrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
        default: 0
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
        default: 0
    },
    visit_Date: {type: Date, required: true}
},{
    timestamps: true
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);