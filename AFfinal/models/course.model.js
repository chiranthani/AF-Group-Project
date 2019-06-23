const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
   courseCode: {
        type:String,
        required : 'This field is required'
    },
    //assignment title
    courseName: {
        type:String,
        required : 'This field is required'
    },
    year: {
        type: String,
        required : 'Year invalid'
    },

    Subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Subject'
    },

});



// Custom validation for Module
/*assignmentSchema.path('courseCode').validate((val) => {
    moduleRegex = /^(([(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return moduleRegex.test(val);
}, 'Invalid courseCode name.');

*/
mongoose.model("Course",courseSchema);