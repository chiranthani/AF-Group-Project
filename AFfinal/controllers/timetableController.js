//CRUD operations related to the assignment

const express = require('express');
var router = express.Router();
var app = express();
const mongoose= require('mongoose');
const TimeTbl = mongoose.model('TimeTbl');


router.get('/',(req,res)=>{
    res.render("timetbl/add&edit", {
        viewTitle : "Insert the Final Time table"
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
    var timetbl = new TimeTbl();
    timetbl.date = req.body.date;
    timetbl.from = req.body.from;
    timetbl.to = req.body.to;
    timetbl.subjectName = req.body.subjectName;

    timetbl.save((err,doc) =>{

        if(!err) {
            res.redirect('timetbl/list');
        }
        else {
            if (err.name === 'ValidationError') {

                handleValidationError(err, req.body);
                res.render("timetbl/add&edit", {
                    viewTitle: "Insert the Final Time Table",
                    timetbl: req.body
                });
            } else
                console.log('Error during code insertion : ' + err);
        }

    });

}



//update function
function updateRecord(req, res) {
    TimeTbl.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('timetbl/list'); }
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("timetbl/add&edit", {
                    viewTitle: 'Update time table',
                    timetbl: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


//get the list

router.get('/list', (req, res) => {
    TimeTbl.find((err, docs) => {
        if (!err) {
            res.render("timetbl/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving time table :' + err);
        }
    });
});





function handleValidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'date':
                body['dateError'] = err.errors[field].message;
                break;
            case 'to':
                body['toError'] = err.errors[field].message;
                break;
                case 'from':
                body['fromError'] = err.errors[field].message;
                break;
            case 'subjectName':
                body['subjectNameError'] = err.errors[field].message;
                break;

        }
    }
}

//get time tbl by specific id
router.get('/:id', (req, res) => {
    TimeTbl.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("timetbl/add&edit", {
                viewTitle: "Update time table",
                timetbl: doc
            });
        }
    });
});

//remove assignment
router.get('/delete/:id', (req, res) => {
    TimeTbl.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/timetbl/list');
        }
        else { console.log('Error in assignment delete :' + err); }
    });
});

/*function checkDOB() {
    var dateString = document.getElementById('date').value;
    var myDate = new Date(dateString);
    var today = new Date();
    if ( myDate < today ) {
        $('#date').after('<p>You cannot enter a date in the past!.</p>');
        return false;
    }
    return true;
}
function checkDOB() {
    var GivenDate = date;
    var CurrentDate = new Date();
    GivenDate = new Date(GivenDate);

    if (GivenDate > CurrentDate) {
        console.log('Given date is greater than the current date.');
    } else {
        console.log('Given date is not greater than the current date.');
    }

}*/
module.exports = router;
