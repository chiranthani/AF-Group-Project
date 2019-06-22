var express = require('express');
var router = express.Router();
var SubjectController = require('../controllers/Subject.Controller');

router.post('/',(req,res)=>{
    SubjectController.insertSubject(req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/',(req,res)=>{
    SubjectController.getSubject().then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    SubjectController.getSubjectByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.put('/:id',(req,res)=>{
    let id = req.params.id;
    SubjectController.updateSubject(id,req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    SubjectController.deleteSubject(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

module.exports = router;