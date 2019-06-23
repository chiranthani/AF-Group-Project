const mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({

    //assignment title
    subjectName: {
        type:String,
        required : 'This field is required'
    },

    title: {
        type: String,
        required : 'This field is required'
    },

    desc: {
        type: String,
        required : 'This field is required'
    },


    due_date: {
        type: String,
        required : 'Date invalid'
    },
    Subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    },

});

// Sets the created_at parameter equal to the current time
assignmentSchema.pre('save', function(next){
     var  now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});
// Custom validation for Module
/*assignmentSchema.path('courseCode').validate((val) => {
    courseCodeRegex = /^(([(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return moduleRegex.test(val);
}, 'Invalid courseCode name.');
*/

module.exports  = mongoose.model("Assignment",assignmentSchema);