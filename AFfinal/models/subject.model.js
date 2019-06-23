const mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
   subjectCode: {
        type:String,
        required : 'This field is required'
    },
    //assignment title
    subjectName: {
        type:String,
        required : 'This field is required'
    },
    Courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    },

});

// Custom validation for Module
/*assignmentSchema.path('courseCode').validate((val) => {
    moduleRegex = /^(([(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return moduleRegex.test(val);
}, 'Invalid courseCode name.');

*/
mongoose.model("Subject",subjectSchema);