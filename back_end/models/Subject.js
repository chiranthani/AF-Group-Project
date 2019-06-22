const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectCode:{
        type:String,
        required:true
    },
    subjectName:{
        type:String,
        required:true
    },
    Courses:{
        type:[mongoose.Schema.Types.ObjectId]
    },

});


module.exports = mongoose.model('Subject',subjectSchema);
;