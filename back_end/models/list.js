const mongoose = require('mongoose');

const list = new mongoose.Schema({
    studentID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('list',list);