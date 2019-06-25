const express = require('express');
const router = express.Router();
const ListController = require('../controllers/List.controller');

//filter by student list
router.get('/:id',(req,res)=>{
    let id = req.params.id;
    ListController.retrieveByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/',(req,res)=>{
    ListController.getAll().then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});
router.post('/',(req,res)=>{
    ListController.Insert(req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        console.log(err);
        res.status(err.status).send(err.message);
    });
});

module.exports = router;

