const express = require('express');
const router = express.Router();
const ListController = require('../controllers/List.controller');

<<<<<<< HEAD:back_end/routes/List.Routes.js
router.get('/hello', (req, res) => {
    res.send("welcome");
});
=======
>>>>>>> a7115365e78e49581d9ac2e393a1967b78726fb5:back_end/routes/List.Routes.js

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
router.get('/:id',(req,res)=>{
    let id = req.params.id;
    ListController.retrieveByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});
module.exports = router;

