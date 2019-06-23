//CRUD operations related to the assignment

const express = require('express');
var router = express.Router();
var app = express();
const mongoose= require('mongoose');
const Subject = mongoose.model('Subject');

router.get('/',(req,res)=>{
    res.render("subject/add&edit", {
        viewTitle : "Insert Subjects"
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
    var subject = new Subject();
    subject.subjectCode = req.body.subjectCode;
    subject.subjectName = req.body.subjectName;
    subject.save((err,doc) =>{

        if(!err) {
            res.redirect('subject/list');
        }
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("subject/add&edit", {
                    viewTitle: "Insert Subjects",
                    subject: req.body
                });
            } else
                console.log('Error during code insertion : ' + err);
        }

    });

}



//update function
function updateRecord(req, res) {
    Subject.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('subject/list'); }
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("subject/add&edit", {
                    viewTitle: 'Update Subjects',
                    subject: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


//get the list

router.get('/list', (req, res) => {
    Subject.find((err, docs) => {
        if (!err) {
            res.render("subject/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving subjects :' + err);
        }
    });
});





function handleValidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'subjectCode':
                body['subjectCodeError'] = err.errors[field].message;
                break;
            case 'subjectName':
                body['subjectNameError'] = err.errors[field].message;
                break;

        }
    }
}

//get course by specific id
router.get('/:id', (req, res) => {
    Subject.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("subject/add&edit", {
                viewTitle: "Update subjects",
                subject: doc
            });
        }
    });
});

//remove course
router.get('/delete/:id', (req, res) => {
    Subject.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/subject/list');
        }
        else { console.log('Error in subject delete :' + err); }
    });
});



module.exports = router;
