const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/Course.Controller');

router.post('/',(req,res)=>{
    CourseController.insertCourse(req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        console.log(err);
        res.status(err.status).send(err.message);
    });
});

router.get('/',(req,res)=>{
    CourseController.getCourse().then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    CourseController.getCourseByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.put('/:id',(req,res)=>{
    let id = req.params.id;
    CourseController.updateCourse(id,req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    CourseController.deleteCourse(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

module.exports = router;