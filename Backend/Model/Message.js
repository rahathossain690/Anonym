const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');

// body, date

var schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now() 
    }
});

schema.plugin(mongoosePaginate);
 
module.exports = mongoose.model('Message',  schema);