const mongoose = require('mongoose');

var timetblSchema = new mongoose.Schema({

    date: {
        type:String,
        required : 'This field is required'
    },
    from: {
        type: String,
        required : 'Date invalid'
    },
    to: {
        type: String,
        required : 'Date invalid'
    },
    subjectName: {
        type: String,
        required : 'Date invalid'
    },
    //subject code
    Subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Subject'
    }


});



// Date and Time validation for the TimeTable
/*timetblSchema.path('courseCode').validate((val) => {
    meRegex = /^(([(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return moduleRegex.test(val);
}, 'Invalid courseCode name.');
*/

module.exports  = mongoose.model("TimeTbl",timetblSchema);
