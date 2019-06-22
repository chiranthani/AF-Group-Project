const express = require('express');
const router = express.Router();
const MarksController = require('../controllers/Marks.controller');

router.get('/',(req,res)=>{
    MarksController.getAll().then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

//sort the max assignmentNo value
router.get('/assignmentNo/',(req,res)=>{
    MarksController.findAssignmentNo().then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

// find student marks list
router.get('/viewMarks/:moduleID/:assignmentNo',(req,res)=>{
    let moduleID = req.params.moduleID;
	let assignmentNo = req.params.assignmentNo;
    MarksController.findForViewMarks(moduleID,assignmentNo).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

// insert marks array of object
router.post('/',(req,res)=>{
    MarksController.addData(req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

// update marks array of object
router.put('/update/',(req,res)=>{
    MarksController.update(req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    MarksController.retrieveByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});
module.exports = router;

