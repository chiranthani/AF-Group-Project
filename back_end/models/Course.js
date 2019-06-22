const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    Subjects:{
        type:[mongoose.Schema.Types.ObjectId]

    }
});


module.exports = mongoose.model('Course',courseSchema);;