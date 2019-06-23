const express = require('express');
const router = express.Router();
const MarksController = require('../controllers/Marks.controller');
const fileUpload = require('express-fileupload');
const pdf = require('html-pdf');
const pdfTemplate = require('../pdfFormat');

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

//mark sheets upload
router.post('/upload',(req,res)=>{
	MarksController.upload(req.files.file).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});
   
// find student assignment answers files
router.get('/answerFiles',(req,res)=>{
    let moduleID = req.params.moduleID;
	let assignmentNo = req.params.assignmentNo;
    MarksController.findForViewMarks(moduleID,assignmentNo).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});
//create PDF
router.post('/create-pdf', (req, res) => {
	//get the form body data and create sample rezultati pdf file. It is save the server
  pdf.create(pdfTemplate(req.body), {}).toFile('rezultati.pdf', (err) => {
    if(err) {
        return console.log('error');
    }
		res.send(Promise.resolve())
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

