//CRUD operations related to the assignment

const express = require('express');
var router = express.Router();
var app = express();
const mongoose= require('mongoose');
const Course = mongoose.model('Course');

router.get('/',(req,res)=>{
    res.render("course/add&edit", {
        viewTitle : "Insert Courses"
    });
});

router.post('/', (req, res) => {
    if (req.body._id === '')
        insertRecord(req, res);
    else
        updateRecord(req, res); // update function
});


// function to add a new record
function insertRecord(req,res){
    var course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.year = req.body.year;

    course.save((err,doc) =>{

        if(!err) {
            res.redirect('course/list');
        }
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/add&edit", {
                    viewTitle: "Insert Courses",
                    course: req.body
                });
            } else
                console.log('Error during code insertion : ' + err);
        }

    });

}



//update function
function updateRecord(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list'); }
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/add&edit", {
                    viewTitle: 'Update Courses',
                    course: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


//get the list

router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving courses :' + err);
        }
    });
});





function handleValidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'courseCode':
                body['courseCodeError'] = err.errors[field].message;
                break;
            case 'courseName':
                body['courseNameError'] = err.errors[field].message;
                break;
            case 'year':
                body['yearError'] = err.errors[field].message;
                break;

        }
    }
}

//get course by specific id
router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("course/add&edit", {
                viewTitle: "Update Courses",
                course: doc
            });
        }
    });
});

//remove course
router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/course/list');
        }
        else { console.log('Error in course delete :' + err); }
    });
});



module.exports = router;
