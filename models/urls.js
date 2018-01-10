const mongoose = require('mongoose');
// var code = rand(24,24);
var url = mongoose.Schema({
    original:String,
    code:String,
    created_at:Date
});
module.exports = mongoose.model('URLs',url);
